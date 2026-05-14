import {
  CalendarIcon,
  IndianRupeeIcon,
  Loader2,
  Plus,
  ReceiptTextIcon,
  UserIcon,
  X,
} from "lucide-react";
import React, { useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";

const GeneratePayslipsForm = ({ employees = [], onSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const inputClass =
    "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-300 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100";

  const labelClass = "mb-2 block text-sm font-semibold text-slate-700";

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:from-indigo-700 hover:to-indigo-600 active:scale-[0.98]"
      >
        <Plus className="h-4 w-4" />
        Generate Payslip
      </button>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      await api.post("/payslips", data);
      toast.success("Payslip generated successfully");
      setIsOpen(false);
      onSuccess();
    } catch (err) {
      toast.error(err.response?.data?.error || err?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <div className="max-h-[90dvh] w-full max-w-2xl overflow-y-auto rounded-[30px] border border-white/70 bg-white/95 shadow-2xl shadow-slate-900/30 backdrop-blur-xl">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-start justify-between border-b border-slate-100 bg-white/95 px-5 py-5 backdrop-blur-xl sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <ReceiptTextIcon className="h-6 w-6" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Generate Monthly Payslip
              </h3>
              <p className="text-sm text-slate-500">
                Create payroll record for selected employee
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-2xl text-slate-400 transition-all duration-300 hover:bg-slate-100 hover:text-slate-700"
            type="button"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-6">
          {/* Employee */}
          <div>
            <label className={labelClass}>Employee</label>

            <div className="relative">
              <UserIcon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <select
                name="employeeId"
                required
                className={`${inputClass} pl-10`}
                defaultValue=""
              >
                <option value="" disabled>
                  Select employee
                </option>

                {employees.map((e) => (
                  <option value={e.id || e._id} key={e.id || e._id}>
                    {e.firstName} {e.lastName} ({e.position})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Month and Year */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Month</label>

              <div className="relative">
                <CalendarIcon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <select
                  name="month"
                  className={`${inputClass} pl-10`}
                  defaultValue={new Date().getMonth() + 1}
                >
                  {[
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                    "July",
                    "August",
                    "September",
                    "October",
                    "November",
                    "December",
                  ].map((month, index) => (
                    <option value={index + 1} key={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className={labelClass}>Year</label>

              <input
                type="number"
                name="year"
                defaultValue={new Date().getFullYear()}
                className={inputClass}
                min="2000"
              />
            </div>
          </div>

          {/* Basic Salary */}
          <div>
            <label className={labelClass}>Basic Salary</label>

            <div className="relative">
              <IndianRupeeIcon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                type="number"
                name="basicSalary"
                required
                min="0"
                step="0.01"
                placeholder="50000"
                className={`${inputClass} pl-10`}
              />
            </div>
          </div>

          {/* Allowances and Deductions */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Allowances</label>

              <input
                type="number"
                name="allowances"
                defaultValue="0"
                min="0"
                step="0.01"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Deductions</label>

              <input
                type="number"
                name="deductions"
                defaultValue="0"
                min="0"
                step="0.01"
                className={inputClass}
              />
            </div>
          </div>

          {/* Payroll Note */}
          <div className="rounded-2xl border border-indigo-100 bg-indigo-50 px-4 py-3">
            <p className="text-sm leading-6 text-indigo-700">
              Net salary will be calculated from basic salary, allowances, and
              deductions.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
            <button
              onClick={() => setIsOpen(false)}
              type="button"
              className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-all duration-300 hover:border-slate-300 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              type="submit"
              className="flex items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:from-indigo-700 hover:to-indigo-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Generate Payslip
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GeneratePayslipsForm;
