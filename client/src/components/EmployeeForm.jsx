import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DEPARTMENTS } from "../assets/assets";
import {
  BriefcaseIcon,
  DollarSignIcon,
  Loader2Icon,
  MailIcon,
  ShieldCheckIcon,
  UserIcon,
} from "lucide-react";
import api from "../api/axios";
import toast from "react-hot-toast";

const EmployeeForm = ({ initialData, onSuccess, onCancel }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const isEditMode = !!initialData;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formData = new FormData(e.currentTarget);

    if (isEditMode) {
      const pwd = formData.get("password");

      if (!pwd) formData.delete("password");
    }

    try {
      const url = isEditMode ? `/employees/${initialData._id}` : "/employees";

      const method = isEditMode ? "put" : "post";

      await api[method](url, formData);

      toast.success(
        isEditMode
          ? "Employee updated successfully"
          : "Employee created successfully",
      );

      onSuccess ? onSuccess() : navigate("/employees");
    } catch (err) {
      toast.error(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100";

  const labelClass = "mb-2 block text-sm font-semibold text-slate-700";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 animate-in fade-in duration-500"
    >
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2">
            <UserIcon className="h-4 w-4 text-indigo-600" />

            <span className="text-xs font-semibold uppercase tracking-wide text-indigo-700">
              Employee Management
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            {isEditMode ? "Update Employee" : "Create Employee"}
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Manage employee information and organization details.
          </p>
        </div>
      </div>

      {/* Personal Information */}
      <section className="overflow-hidden rounded-[30px] border border-white/70 bg-white/85 shadow-xl shadow-slate-200/50 backdrop-blur-xl">
        <div className="border-b border-slate-100 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <UserIcon className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Personal Information
              </h2>

              <p className="text-sm text-slate-500">
                Employee personal details
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">
          <div>
            <label className={labelClass}>First Name</label>

            <input
              name="firstName"
              required
              defaultValue={initialData?.firstName}
              className={inputClass}
              placeholder="John"
            />
          </div>

          <div>
            <label className={labelClass}>Last Name</label>

            <input
              name="lastName"
              required
              defaultValue={initialData?.lastName}
              className={inputClass}
              placeholder="Doe"
            />
          </div>

          <div>
            <label className={labelClass}>Phone Number</label>

            <input
              name="phone"
              required
              defaultValue={initialData?.phone}
              className={inputClass}
              placeholder="+1 234 567 890"
            />
          </div>

          <div>
            <label className={labelClass}>Join Date</label>

            <input
              type="date"
              name="joinDate"
              required
              className={inputClass}
              defaultValue={
                initialData?.joinDate
                  ? new Date(initialData.joinDate).toISOString().split("T")[0]
                  : ""
              }
            />
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>Bio</label>

            <textarea
              name="bio"
              rows={4}
              defaultValue={initialData?.bio}
              className={`${inputClass} resize-none`}
              placeholder="Brief employee description..."
            />
          </div>
        </div>
      </section>

      {/* Employment Details */}
      <section className="overflow-hidden rounded-[30px] border border-white/70 bg-white/85 shadow-xl shadow-slate-200/50 backdrop-blur-xl">
        <div className="border-b border-slate-100 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
              <BriefcaseIcon className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Employment Details
              </h2>

              <p className="text-sm text-slate-500">
                Department and salary information
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">
          <div>
            <label className={labelClass}>Department</label>

            <select
              name="department"
              defaultValue={initialData?.department || ""}
              className={inputClass}
            >
              <option value="">Select Department</option>

              {DEPARTMENTS.map((deptName) => (
                <option key={deptName} value={deptName}>
                  {deptName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Position</label>

            <input
              name="position"
              required
              defaultValue={initialData?.position}
              className={inputClass}
              placeholder="Software Engineer"
            />
          </div>

          <div>
            <label className={labelClass}>Basic Salary</label>

            <div className="relative">
              <DollarSignIcon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                type="number"
                name="basicSalary"
                required
                min="0"
                step="0.01"
                defaultValue={initialData?.basicSalary || 0}
                className={`${inputClass} pl-10`}
              />
            </div>
          </div>

          <div>
            <label className={labelClass}>Allowances</label>

            <input
              type="number"
              name="allowances"
              required
              min="0"
              step="0.01"
              defaultValue={initialData?.allowances || 0}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Deductions</label>

            <input
              type="number"
              name="deductions"
              required
              min="0"
              step="0.01"
              defaultValue={initialData?.deductions || 0}
              className={inputClass}
            />
          </div>

          {isEditMode && (
            <div>
              <label className={labelClass}>Status</label>

              <select
                name="employmentStatus"
                required
                defaultValue={initialData?.employmentStatus}
                className={inputClass}
              >
                <option value="ACTIVE">Active</option>
                <option value="INACTIVE">Inactive</option>
              </select>
            </div>
          )}
        </div>
      </section>

      {/* Account Setup */}
      <section className="overflow-hidden rounded-[30px] border border-white/70 bg-white/85 shadow-xl shadow-slate-200/50 backdrop-blur-xl">
        <div className="border-b border-slate-100 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <ShieldCheckIcon className="h-5 w-5" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Account Setup
              </h2>

              <p className="text-sm text-slate-500">
                Employee access credentials
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 p-6 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className={labelClass}>Work Email</label>

            <div className="relative">
              <MailIcon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                type="email"
                name="email"
                required
                defaultValue={initialData?.email}
                className={`${inputClass} pl-10`}
                placeholder="employee@company.com"
              />
            </div>
          </div>

          {!isEditMode ? (
            <div>
              <label className={labelClass}>Temporary Password</label>

              <input
                type="password"
                name="password"
                required
                className={inputClass}
                placeholder="Enter password"
              />
            </div>
          ) : (
            <div>
              <label className={labelClass}>Change Password (Optional)</label>

              <input
                type="password"
                name="password"
                className={inputClass}
                placeholder="Leave blank to keep current"
              />
            </div>
          )}

          <div>
            <label className={labelClass}>System Role</label>

            <select
              name="role"
              defaultValue={initialData?.user?.role || "EMPLOYEE"}
              className={inputClass}
            >
              <option value="EMPLOYEE">Employee</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
        </div>
      </section>

      {/* Buttons */}
      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() => (onCancel ? onCancel() : navigate(-1))}
          className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-all duration-300 hover:border-slate-300 hover:bg-slate-50"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="flex items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:from-indigo-700 hover:to-indigo-600 active:scale-[0.98] disabled:opacity-60"
        >
          {loading && <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />}

          {isEditMode ? "Update Employee" : "Create Employee"}
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
