import React, { useCallback, useEffect, useState } from "react";
import Loading from "../components/Loading";
import {
  AlertTriangleIcon,
  CalendarDaysIcon,
  PalmtreeIcon,
  PlusIcon,
  RefreshCcwIcon,
  ThermometerIcon,
  UmbrellaIcon,
} from "lucide-react";
import LeaveHistory from "../components/leave/LeaveHistory";
import ApplyLeaveModal from "../components/leave/ApplyLeaveModal";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import toast from "react-hot-toast";

const Leave = () => {
  const { user } = useAuth();

  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const isAdmin = user?.role === "ADMIN";

  const fetchLeaves = useCallback(async () => {
    try {
      setLoading(true);

      const res = await api.get("/leave");

      setLeaves(res.data.data || []);
      setIsDeleted(!!res.data.employee?.isDeleted);
    } catch (error) {
      toast.error(error?.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeaves();
  }, [fetchLeaves]);

  if (loading) return <Loading />;

  const approvedLeaves = leaves.filter((l) => l.status === "APPROVED");
  const pendingLeaves = leaves.filter((l) => l.status === "PENDING").length;

  const leaveStats = [
    {
      label: "Sick Leave",
      value: approvedLeaves.filter((l) => l.type === "SICK").length,
      icon: ThermometerIcon,
      bg: "bg-rose-50",
      text: "text-rose-600",
      desc: "Approved sick leaves",
    },
    {
      label: "Casual Leave",
      value: approvedLeaves.filter((l) => l.type === "CASUAL").length,
      icon: UmbrellaIcon,
      bg: "bg-indigo-50",
      text: "text-indigo-600",
      desc: "Approved casual leaves",
    },
    {
      label: "Annual Leave",
      value: approvedLeaves.filter((l) => l.type === "ANNUAL").length,
      icon: PalmtreeIcon,
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      desc: "Approved annual leaves",
    },
  ];

  return (
    <div className="animate-in fade-in duration-500">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2">
            <CalendarDaysIcon className="h-4 w-4 text-indigo-600" />

            <span className="text-xs font-semibold uppercase tracking-wide text-indigo-700">
              Leave Management
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Leave Management
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
            {isAdmin
              ? "Review, approve, and manage employee leave applications."
              : "Track your leave balance, history, and application status."}
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <button
            onClick={fetchLeaves}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600"
          >
            <RefreshCcwIcon className="h-4 w-4" />
            Refresh
          </button>

          {!isAdmin && !isDeleted && (
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:from-indigo-700 hover:to-indigo-600 active:scale-[0.98]"
            >
              <PlusIcon className="h-4 w-4" />
              Apply for Leave
            </button>
          )}
        </div>
      </div>

      {/* Deleted Warning */}
      {!isAdmin && isDeleted && (
        <div className="mb-8 rounded-[28px] border border-rose-200 bg-rose-50/90 p-6 shadow-lg shadow-rose-100/50">
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
              <AlertTriangleIcon className="h-7 w-7" />
            </div>

            <div>
              <h2 className="text-lg font-bold text-rose-700">
                Leave access disabled
              </h2>

              <p className="mt-1 text-sm leading-6 text-rose-600">
                You can no longer apply for leave because your employee record
                has been marked as deleted.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Employee Leave Stats */}
      {!isAdmin && (
        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {leaveStats.map((s) => {
            const Icon = s.icon;

            return (
              <div
                key={s.label}
                className="group relative overflow-hidden rounded-[28px] border border-white/70 bg-white/85 p-6 shadow-xl shadow-slate-200/50 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="mb-5 flex items-start justify-between">
                  <div
                    className={`flex h-13 w-13 items-center justify-center rounded-2xl ${s.bg} ${s.text}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                    Taken
                  </span>
                </div>

                <p className="text-sm font-semibold text-slate-500">
                  {s.label}
                </p>

                <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                  {s.value}
                </h2>

                <p className="mt-2 text-sm text-slate-500">{s.desc}</p>
              </div>
            );
          })}

          <div className="group relative overflow-hidden rounded-[28px] border border-white/70 bg-white/85 p-6 shadow-xl shadow-slate-200/50 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
            <div className="mb-5 flex items-start justify-between">
              <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                <CalendarDaysIcon className="h-6 w-6" />
              </div>

              <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-600">
                Pending
              </span>
            </div>

            <p className="text-sm font-semibold text-slate-500">
              Pending Requests
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              {pendingLeaves}
            </h2>

            <p className="mt-2 text-sm text-slate-500">Awaiting approval</p>
          </div>
        </div>
      )}

      {/* Leave History */}
      <LeaveHistory leaves={leaves} isAdmin={isAdmin} onUpdate={fetchLeaves} />

      <ApplyLeaveModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={fetchLeaves}
      />
    </div>
  );
};

export default Leave;
