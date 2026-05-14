import { CalendarDays, FileText, Loader2, Send, X } from "lucide-react";
import React, { useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";

const ApplyLeaveModal = ({ open, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      await api.post("/leave", data);

      toast.success("Leave request submitted successfully");
      onSuccess?.();
      onClose();
    } catch (err) {
      toast.error(
        err.response?.data?.error || err.message || "Failed to submit leave",
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100";

  const labelClass =
    "mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="max-h-[90dvh] w-full max-w-xl overflow-y-auto rounded-[30px] border border-white/70 bg-white/95 shadow-2xl shadow-slate-900/30 backdrop-blur-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-start justify-between border-b border-slate-100 bg-white/95 px-5 py-5 backdrop-blur-xl sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
              <FileText className="h-6 w-6" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Apply for Leave
              </h2>
              <p className="text-sm text-slate-500">
                Submit your leave request for approval
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-2xl text-slate-400 transition-all duration-300 hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 p-5 sm:p-6">
          {/* Leave Type */}
          <div>
            <label className={labelClass}>
              <FileText className="h-4 w-4 text-indigo-500" />
              Leave Type
            </label>

            <select name="type" required className={inputClass}>
              <option value="SICK">Sick Leave</option>
              <option value="CASUAL">Casual Leave</option>
              <option value="ANNUAL">Annual Leave</option>
            </select>
          </div>

          {/* Duration */}
          <div>
            <label className={labelClass}>
              <CalendarDays className="h-4 w-4 text-indigo-500" />
              Duration
            </label>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <span className="mb-1.5 block text-xs font-semibold text-slate-400">
                  From
                </span>

                <input
                  type="date"
                  name="startDate"
                  required
                  min={minDate}
                  className={inputClass}
                />
              </div>

              <div>
                <span className="mb-1.5 block text-xs font-semibold text-slate-400">
                  To
                </span>

                <input
                  type="date"
                  name="endDate"
                  required
                  min={minDate}
                  className={inputClass}
                />
              </div>
            </div>
          </div>

          {/* Reason */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Reason
            </label>

            <textarea
              name="reason"
              required
              rows={4}
              className={`${inputClass} resize-none`}
              placeholder="Briefly describe why you need this leave"
            />
          </div>

          {/* Note */}
          <div className="rounded-2xl border border-indigo-100 bg-indigo-50 px-4 py-3">
            <p className="text-sm leading-6 text-indigo-700">
              Leave applications can only be submitted for future dates.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-all duration-300 hover:border-slate-300 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:from-indigo-700 hover:to-indigo-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}

              {loading ? "Submitting..." : "Submit Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyLeaveModal;
