import React from "react";
import { getDayTypeDisplay, getWorkingHoursDisplay } from "../../assets/assets";
import { format } from "date-fns";
import { CalendarClockIcon } from "lucide-react";

const AttendanceHistory = ({ history = [] }) => {
  const getStatusClass = (status) => {
    if (status === "PRESENT") {
      return "border-emerald-200 bg-emerald-50 text-emerald-700";
    }

    if (status === "LATE") {
      return "border-amber-200 bg-amber-50 text-amber-700";
    }

    return "border-rose-200 bg-rose-50 text-rose-700";
  };

  return (
    <div className="overflow-hidden rounded-[28px] border border-white/70 bg-white/85 shadow-xl shadow-slate-200/50 backdrop-blur-xl">
      <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <CalendarClockIcon className="h-5 w-5" />
          </div>

          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Recent Activity
            </h3>
            <p className="text-sm text-slate-500">
              Your latest attendance records
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse">
          <thead>
            <tr className="bg-slate-50 text-left">
              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                Date
              </th>
              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                Check In
              </th>
              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                Check Out
              </th>
              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                Working Hours
              </th>
              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                Day Type
              </th>
              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                Status
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {history.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-5 py-14 text-center">
                  <div className="mx-auto flex max-w-sm flex-col items-center">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                      <CalendarClockIcon className="h-7 w-7" />
                    </div>

                    <h3 className="text-base font-bold text-slate-800">
                      No records found
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Attendance records will appear here after check-in.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              history.map((record) => {
                const dayType = getDayTypeDisplay(record);

                return (
                  <tr
                    key={record._id || record.id}
                    className="transition-colors duration-200 hover:bg-indigo-50/40"
                  >
                    <td className="px-5 py-4">
                      <p className="font-semibold text-slate-900">
                        {format(new Date(record.date), "MMM dd, yyyy")}
                      </p>
                      <p className="mt-1 text-xs text-slate-400">
                        {format(new Date(record.date), "EEEE")}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-sm font-medium text-slate-600">
                      {record.checkIn
                        ? format(new Date(record.checkIn), "hh:mm a")
                        : "-"}
                    </td>

                    <td className="px-5 py-4 text-sm font-medium text-slate-600">
                      {record.checkOut
                        ? format(new Date(record.checkOut), "hh:mm a")
                        : "-"}
                    </td>

                    <td className="px-5 py-4 text-sm font-bold text-slate-700">
                      {getWorkingHoursDisplay(record)}
                    </td>

                    <td className="px-5 py-4">
                      {dayType.label !== "-" ? (
                        <span className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-700">
                          {dayType.label}
                        </span>
                      ) : (
                        <span className="text-sm text-slate-400">-</span>
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide ${getStatusClass(
                          record.status,
                        )}`}
                      >
                        {record.status}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceHistory;
