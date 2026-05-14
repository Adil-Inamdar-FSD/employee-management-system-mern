import express from "express";
import cors from "cors";
import "dotenv/config";
import multer from "multer";

import connectDB from "./config/db.js";

import authRouter from "./routes/authRoutes.js";
import employeesRouter from "./routes/employeeRoutes.js";
import profileRouter from "./routes/profileRoutes.js";
import attendanceRouter from "./routes/attendanceRoutes.js";
import leaveRouter from "./routes/leaveRoutes.js";
import payslipRouter from "./routes/payslipsRoutes.js";
import dashboardRouter from "./routes/dashboardRoutes.js";

import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";

const app = express();

const PORT = process.env.PORT || 4000;

/* =========================
   ALLOWED ORIGINS
========================= */
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://ems-frontend-8tz1.onrender.com",
  process.env.CLIENT_URL,
].filter(Boolean);

/* =========================
   CORS
========================= */
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      // like mobile apps or postman
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },

    credentials: true,

    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

/* =========================
   HANDLE PREFLIGHT
========================= */
app.options("/*splat", cors());

/* =========================
   MIDDLEWARE
========================= */
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(multer().none());

/* =========================
   ROOT ROUTE
========================= */
app.get("/", (req, res) => {
  res.send("Server is running");
});

/* =========================
   API ROUTES
========================= */
app.use("/api/auth", authRouter);

app.use("/api/employees", employeesRouter);

app.use("/api/profile", profileRouter);

app.use("/api/attendance", attendanceRouter);

app.use("/api/leave", leaveRouter);

app.use("/api/payslips", payslipRouter);

app.use("/api/dashboard", dashboardRouter);

app.use(
  "/api/inngest",
  serve({
    client: inngest,
    functions,
  }),
);

/* =========================
   404 ROUTE
========================= */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

/* =========================
   GLOBAL ERROR HANDLER
========================= */
app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);

  res.status(err.status || 500).json({
    success: false,
    error: err.message || "Internal server error",
  });
});

/* =========================
   CONNECT DATABASE
========================= */
await connectDB();

/* =========================
   START SERVER
========================= */
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
