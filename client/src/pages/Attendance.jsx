import React, { useCallback, useEffect, useState } from "react";
import Loading from "../components/Loading";
import CheckInButton from "../components/attendance/CheckInButton";
import AttendanceStats from "../components/attendance/AttendanceStats";
import AttendanceHistory from "../components/attendance/AttendanceHistory";
import api from "../api/axios";
import { toast } from "react-hot-toast";
import {
  AlertTriangleIcon,
  CalendarCheckIcon,
  RefreshCcwIcon,
} from "lucide-react";

const Attendance = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleted, setIsDeleted] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const res = await api.get("/attendance");
      const json = res.data;

      setHistory(json.data || []);
      setIsDeleted(!!json.employee?.isDeleted);
    } catch (error) {
      toast.error(error?.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) return <Loading />;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayRecord = history.find(
    (r) => new Date(r.date).toDateString() === today.toDateString(),
  );

  return (
    <div className="animate-in fade-in duration-500">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2">
            <CalendarCheckIcon className="h-4 w-4 text-indigo-600" />

            <span className="text-xs font-semibold uppercase tracking-wide text-indigo-700">
              Attendance Tracking
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Attendance
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
            Track work hours, daily check-ins, and attendance performance.
          </p>
        </div>

        <button
          onClick={fetchData}
          className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600"
        >
          <RefreshCcwIcon className="h-4 w-4" />
          Refresh
        </button>
      </div>

      {/* Deleted Warning / Check In */}
      {isDeleted ? (
        <div className="mb-8 rounded-[28px] border border-rose-200 bg-rose-50/90 p-6 shadow-lg shadow-rose-100/50">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
              <AlertTriangleIcon className="h-7 w-7" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-rose-700">
                Attendance access disabled
              </h2>

              <p className="mt-1 text-sm leading-6 text-rose-600">
                You can no longer clock in or out because your employee record
                has been marked as deleted.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-8">
          <CheckInButton todayRecord={todayRecord} onAction={fetchData} />
        </div>
      )}

      {/* Stats */}
      <div className="mb-8">
        <AttendanceStats history={history} />
      </div>

      {/* History */}
      <AttendanceHistory history={history} />
    </div>
  );
};

export default Attendance;
