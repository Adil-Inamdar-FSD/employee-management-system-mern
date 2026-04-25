import Employee from "../models/Employee.js";

// get profile
// get /api/profile
export const getProfile = async (req, res) => {
  try {
    const session = req.session;
    const employee = await Employee.findOne({ userId: session.userId });

    if (!employee) {
      // Authenticated user is not an employee - return admin profile
      return res.json({
        firstName: "ADMIN",
        lastName: "",
        email: session.email,
      });
    }
    return res.json(employee);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch profile" });
  }
};

// update profile
// put /api/profile
export const updateProfile = async (req, res) => {
  try {
    const session = req.session;
    const employee = await Employee.findOne({ userId: session.userId });
    if (!employee) return res.status(500).json({ error: "Employee not found" });
    if (employee.isDeleted) {
      return res.status(403).json({
        error: "Your account is deactivated. You cannot update your profile.",
      });
    }
    await employee.findByIdAndUpdate(employee._id, { bio: req.body.bio });
    return res.json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: "Failed to update profile" });
  }
};
