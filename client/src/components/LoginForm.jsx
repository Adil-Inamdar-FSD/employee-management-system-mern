import React, { useState } from "react";
import LoginLeftSide from "./LoginLeftSide";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeftIcon,
  EyeClosedIcon,
  EyeIcon,
  Loader2Icon,
  LockKeyhole,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const LoginForm = ({ role, title, subtitle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(email, password, role);
      navigate("/dashboard");
    } catch (error) {
      const message =
        error.response?.data?.error || error.message || "Login failed";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-dvh w-full overflow-hidden bg-[#f5f7fb] lg:grid lg:grid-cols-2">
      {/* LEFT SIDE */}
      <div className="min-h-[360px] lg:min-h-dvh">
        <LoginLeftSide />
      </div>

      {/* RIGHT SIDE */}
      <main className="relative flex min-h-[calc(100dvh-360px)] w-full items-center justify-center overflow-y-auto px-4 py-8 sm:px-6 lg:min-h-dvh lg:px-12 xl:px-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#dbeafe,transparent_35%),radial-gradient(circle_at_bottom_left,#e0e7ff,transparent_30%)]" />

        <section className="relative z-10 w-full max-w-[520px]">
          <Link
            to="/login"
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-500 shadow-sm transition-all duration-300 hover:border-indigo-300 hover:text-indigo-600"
          >
            <ArrowLeftIcon size={16} />
            Back to portals
          </Link>

          <div className="rounded-[30px] border border-white/80 bg-white/95 p-5 shadow-2xl shadow-slate-200/80 backdrop-blur-xl sm:p-8 lg:p-10">
            <div className="mb-8 text-center lg:text-left">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200 lg:mx-0">
                <LockKeyhole className="h-7 w-7" />
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                {title}
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
                {subtitle}
              </p>
            </div>

            {error && (
              <div className="mb-6 flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
                <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-rose-500" />
                <span>{error}</span>
              </div>
            )}

            <form className="space-y-5" onSubmit={handlesubmit}>
              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Email Address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="john@example.com"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 pr-12 text-sm text-slate-800 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
                    placeholder="Enter your password"
                  />

                  <button
                    type="button"
                    className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl text-slate-400 transition-all duration-300 hover:bg-slate-100 hover:text-slate-700"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeClosedIcon size={18} />
                    ) : (
                      <EyeIcon size={18} />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:from-indigo-700 hover:to-indigo-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading && (
                  <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign in
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LoginForm;
