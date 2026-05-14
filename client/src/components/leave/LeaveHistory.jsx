import { Check, ClockIcon, Loader2, X } from "lucide-react";
import React, { useState } from "react";
import { format } from "date-fns";
import api from "../../api/axios";
import toast from "react-hot-toast";

const LeaveHistory = ({ leaves = [], isAdmin, onUpdate }) => {
  const [processing, setProcessing] = useState(null);

  const handleStatusUpdate = async (id, status) => {
    setProcessing(id);

    try {
      await api.patch(`/leave/${id}`, { status });
      toast.success(`Leave ${status.toLowerCase()} successfully`);
      onUpdate();
    } catch (error) {
      toast.error(error?.response?.data?.error || error?.message);
    } finally {
      setProcessing(null);
    }
  };

  const getStatusClass = (status) => {
    if (status === "APPROVED") {
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    }

    if (status === "REJECTED") {
      return "bg-rose-50 text-rose-700 border-rose-200";
    }

    return "bg-amber-50 text-amber-700 border-amber-200";
  };

  return (
    <div className="overflow-hidden rounded-[28px] border border-white/70 bg-white/85 shadow-xl shadow-slate-200/50 backdrop-blur-xl">
      <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <ClockIcon className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900">Leave History</h2>
            <p className="text-sm text-slate-500">
              Track leave requests and approval status
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] border-collapse">
          <thead>
            <tr className="bg-slate-50 text-left">
              {isAdmin && (
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                  Employee
                </th>
              )}
              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                Type
              </th>
              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                Date
              </th>
              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                Reason
              </th>
              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                Status
              </th>
              {isAdmin && (
                <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-wide text-slate-500">
                  Actions
                </th>
              )}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {leaves.length === 0 ? (
              <tr>
                <td
                  colSpan={isAdmin ? 6 : 5}
                  className="px-5 py-14 text-center"
                >
                  <div className="mx-auto flex max-w-sm flex-col items-center">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                      <ClockIcon className="h-7 w-7" />
                    </div>

                    <h3 className="text-base font-bold text-slate-800">
                      No leave applications found
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Leave requests will appear here once submitted.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              leaves.map((leave) => {
                const id = leave._id || leave.id;
                const isProcessing = processing === id;

                return (
                  <tr
                    key={id}
                    className="transition-colors duration-200 hover:bg-indigo-50/40"
                  >
                    {isAdmin && (
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 text-sm font-bold text-indigo-600">
                            {leave.employee?.firstName?.[0] || "E"}
                          </div>

                          <div>
                            <p className="font-semibold text-slate-900">
                              {leave.employee?.firstName}{" "}
                              {leave.employee?.lastName}
                            </p>

                            <p className="text-xs text-slate-500">Employee</p>
                          </div>
                        </div>
                      </td>
                    )}

                    <td className="px-5 py-4">
                      <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-bold text-slate-600">
                        {leave.type}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-sm font-medium text-slate-600">
                      {format(new Date(leave.startDate), "MMM dd")} -{" "}
                      {format(new Date(leave.endDate), "MMM dd, yyyy")}
                    </td>

                    <td
                      className="max-w-xs truncate px-5 py-4 text-sm text-slate-500"
                      title={leave.reason}
                    >
                      {leave.reason}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide ${getStatusClass(
                          leave.status,
                        )}`}
                      >
                        {leave.status}
                      </span>
                    </td>

                    {isAdmin && (
                      <td className="px-5 py-4">
                        {leave.status === "PENDING" ? (
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => handleStatusUpdate(id, "APPROVED")}
                              disabled={!!processing}
                              className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition-all duration-300 hover:bg-emerald-100 disabled:cursor-not-allowed disabled:opacity-60"
                              title="Approve leave"
                            >
                              {isProcessing ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Check className="h-4 w-4" />
                              )}
                            </button>

                            <button
                              onClick={() => handleStatusUpdate(id, "REJECTED")}
                              disabled={!!processing}
                              className="flex h-9 w-9 items-center justify-center rounded-xl bg-rose-50 text-rose-600 transition-all duration-300 hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-60"
                              title="Reject leave"
                            >
                              {isProcessing ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <X className="h-4 w-4" />
                              )}
                            </button>
                          </div>
                        ) : (
                          <p className="text-center text-xs font-medium text-slate-400">
                            Completed
                          </p>
                        )}
                      </td>
                    )}
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

export default LeaveHistory;
