import {
  Building2Icon,
  CalendarIcon,
  FileTextIcon,
  TrendingUpIcon,
  UserIcon,
} from "lucide-react";
import React from "react";

const AdminDashboard = ({ data }) => {
  const stats = [
    {
      icon: UserIcon,
      value: data?.totalEmployees || 0,
      label: "Total Employees",
      description: "Active workforce",
      color: "from-blue-500 to-indigo-500",
      bg: "bg-blue-50",
      text: "text-blue-600",
    },
    {
      icon: Building2Icon,
      value: data?.totalDepartments || 0,
      label: "Departments",
      description: "Organization units",
      color: "from-violet-500 to-purple-500",
      bg: "bg-violet-50",
      text: "text-violet-600",
    },
    {
      icon: CalendarIcon,
      value: data?.todayAttendance || 0,
      label: "Today's Attendance",
      description: "Checked in today",
      color: "from-emerald-500 to-green-500",
      bg: "bg-emerald-50",
      text: "text-emerald-600",
    },
    {
      icon: FileTextIcon,
      value: data?.pendingLeaves || 0,
      label: "Pending Leaves",
      description: "Awaiting approval",
      color: "from-amber-500 to-orange-500",
      bg: "bg-amber-50",
      text: "text-amber-600",
    },
  ];

  return (
    <div className="animate-in fade-in duration-500">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2">
            <TrendingUpIcon className="h-4 w-4 text-indigo-600" />

            <span className="text-xs font-semibold uppercase tracking-wide text-indigo-700">
              Admin Overview
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Dashboard
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
            Welcome back, Admin — here’s what’s happening across your
            organization today.
          </p>
        </div>

        {/* Status Card */}
        <div className="rounded-3xl border border-white/70 bg-white/80 px-5 py-4 shadow-lg shadow-slate-200/60 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />

            <div>
              <p className="text-sm font-semibold text-slate-800">
                System Status
              </p>

              <p className="text-xs text-slate-500">
                All services operational
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;

          return (
            <div
              key={s.label}
              className="group relative overflow-hidden rounded-[28px] border border-white/70 bg-white/80 p-6 shadow-xl shadow-slate-200/50 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
            >
              {/* Glow */}
              <div
                className={`absolute right-[-30px] top-[-30px] h-28 w-28 rounded-full bg-gradient-to-br ${s.color} opacity-10 blur-2xl`}
              />

              {/* Top */}
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-500">
                    {s.label}
                  </p>

                  <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
                    {s.value}
                  </h2>
                </div>

                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl ${s.bg} ${s.text} transition-all duration-300 group-hover:scale-110`}
                >
                  <Icon className="h-7 w-7" />
                </div>
              </div>

              {/* Bottom */}
              <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                <p className="text-sm text-slate-500">{s.description}</p>

                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                  Live
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Extra Analytics Section */}
      <div className="mt-8 grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="xl:col-span-2 rounded-[30px] border border-white/70 bg-white/80 p-6 shadow-xl shadow-slate-200/50 backdrop-blur-xl">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Workforce Summary
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Employee engagement and attendance overview
              </p>
            </div>

            <button className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-indigo-300 hover:text-indigo-600">
              View Report
            </button>
          </div>

          <div className="flex h-[240px] items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-slate-50">
            <p className="text-sm text-slate-400">
              Analytics Chart Section
            </p>
          </div>
        </div>

        <div className="rounded-[30px] border border-white/70 bg-white/80 p-6 shadow-xl shadow-slate-200/50 backdrop-blur-xl">
          <div className="mb-5">
            <h2 className="text-lg font-bold text-slate-900">
              Recent Activity
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Latest organization updates
            </p>
          </div>

          <div className="space-y-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4"
              >
                <div className="mt-1 h-2.5 w-2.5 rounded-full bg-indigo-500" />

                <div>
                  <p className="text-sm font-medium text-slate-800">
                    Employee attendance updated
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    2 minutes ago
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;