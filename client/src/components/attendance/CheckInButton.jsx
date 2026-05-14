import {
  CheckCircle2Icon,
  ClockIcon,
  Loader2Icon,
  LogInIcon,
  LogOutIcon,
} from "lucide-react";
import React, { useState } from "react";
import api from "../../api/axios";
import toast from "react-hot-toast";

const CheckInButton = ({ todayRecord, onAction }) => {
  const [loading, setLoading] = useState(false);

  const handleAttendance = async () => {
    setLoading(true);

    try {
      await api.post("/attendance");
      toast.success(
        todayRecord?.checkIn
          ? "Clocked out successfully"
          : "Clocked in successfully",
      );
      onAction?.();
    } catch (error) {
      toast.error(error?.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  if (todayRecord?.checkOut) {
    return (
      <div className="relative overflow-hidden rounded-[30px] border border-emerald-200 bg-emerald-50/90 p-6 shadow-xl shadow-emerald-100/60 backdrop-blur-xl sm:p-8">
        <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-emerald-300/30 blur-2xl" />

        <div className="relative z-10 flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-600">
            <CheckCircle2Icon className="h-8 w-8" />
          </div>

          <div>
            <h3 className="text-xl font-bold text-emerald-800">
              Work Day Completed
            </h3>

            <p className="mt-1 text-sm leading-6 text-emerald-700">
              Great job! Your attendance for today has been completed.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const isCheckedIn = !!todayRecord?.checkIn;

  return (
    <div className="relative overflow-hidden rounded-[32px] border border-white/70 bg-white/85 p-6 shadow-xl shadow-slate-200/50 backdrop-blur-xl sm:p-8">
      <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <div
            className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl ${
              isCheckedIn
                ? "bg-slate-100 text-slate-700"
                : "bg-indigo-50 text-indigo-600"
            }`}
          >
            {isCheckedIn ? (
              <LogOutIcon className="h-8 w-8" />
            ) : (
              <LogInIcon className="h-8 w-8" />
            )}
          </div>

          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-500">
              <ClockIcon className="h-3.5 w-3.5" />
              Today&apos;s Attendance
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              {isCheckedIn
                ? "You are currently checked in"
                : "Ready to start your work day?"}
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              {isCheckedIn
                ? "Click clock out when your shift is completed."
                : "Click clock in to begin tracking your attendance for today."}
            </p>
          </div>
        </div>

        <button
          onClick={handleAttendance}
          disabled={loading}
          className={`inline-flex w-full items-center justify-center gap-3 rounded-2xl px-6 py-4 text-sm font-bold text-white shadow-lg transition-all duration-300 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 lg:w-auto ${
            isCheckedIn
              ? "bg-gradient-to-r from-slate-800 to-slate-950 shadow-slate-400/30 hover:from-slate-900 hover:to-black"
              : "bg-gradient-to-r from-indigo-600 to-indigo-500 shadow-indigo-500/30 hover:from-indigo-700 hover:to-indigo-600"
          }`}
        >
          {loading ? (
            <Loader2Icon className="h-5 w-5 animate-spin" />
          ) : isCheckedIn ? (
            <LogOutIcon className="h-5 w-5" />
          ) : (
            <LogInIcon className="h-5 w-5" />
          )}

          {loading ? "Processing..." : isCheckedIn ? "Clock Out" : "Clock In"}
        </button>
      </div>
    </div>
  );
};

export default CheckInButton;
