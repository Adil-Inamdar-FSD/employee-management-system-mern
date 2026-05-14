import {
  ArrowRightIcon,
  BriefcaseIcon,
  CalendarIcon,
  DollarSignIcon,
  FileTextIcon,
  SparklesIcon,
} from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const EmployeeDashboard = ({ data }) => {
  const emp = data?.employee;

  const cards = [
    {
      icon: CalendarIcon,
      value: data?.currentMonthAttendance || 0,
      title: "Days Present",
      subtitle: "Attendance this month",
      bg: "bg-indigo-50",
      text: "text-indigo-600",
    },
    {
      icon: FileTextIcon,
      value: data?.pendingLeaves || 0,
      title: "Pending Leaves",
      subtitle: "Awaiting approval",
      bg: "bg-amber-50",
      text: "text-amber-600",
    },
    {
      icon: DollarSignIcon,
      value: data?.latestPayslip
        ? `₹${data.latestPayslip.netSalary?.toLocaleString()}`
        : "N/A",
      title: "Latest Payslip",
      subtitle: "Most recent payout",
      bg: "bg-emerald-50",
      text: "text-emerald-600",
    },
  ];

  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero Header */}
      <div className="relative mb-8 overflow-hidden rounded-[32px] bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#020617] p-6 shadow-2xl shadow-slate-300/40 sm:p-8 lg:p-10">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute -left-20 top-0 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />

          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />

          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:60px_60px]" />
        </div>

        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          {/* Left */}
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl">
              <SparklesIcon className="h-4 w-4 text-indigo-300" />

              <span className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                Employee Workspace
              </span>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Welcome back,
              <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                {" "}
                {emp?.firstName || "Employee"}
              </span>
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-slate-300">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
                <BriefcaseIcon className="h-4 w-4 text-indigo-300" />
                {emp?.position || "Employee"}
              </div>

              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
                {emp?.department || "No Department"}
              </div>
            </div>

            <p className="mt-6 max-w-xl text-sm leading-7 text-slate-400 sm:text-base">
              Stay productive and manage your attendance, leaves, and payroll
              information from your employee dashboard.
            </p>
          </div>

          {/* Right Summary */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:w-[420px]">
            {cards.map((card, index) => {
              const Icon = card.icon;

              return (
                <div
                  key={index}
                  className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl"
                >
                  <div
                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${card.bg} ${card.text}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    {card.title}
                  </p>

                  <h2 className="mt-2 text-2xl font-bold text-white">
                    {card.value}
                  </h2>

                  <p className="mt-1 text-xs text-slate-400">{card.subtitle}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Quick Actions</h2>

            <p className="mt-1 text-sm text-slate-500">
              Access important employee operations quickly
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* Attendance Card */}
          <Link
            to="/attendance"
            className="group relative overflow-hidden rounded-[30px] border border-white/70 bg-white/85 p-6 shadow-xl shadow-slate-200/50 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >
            <div className="absolute right-[-20px] top-[-20px] h-32 w-32 rounded-full bg-indigo-500/10 blur-2xl" />

            <div className="relative z-10">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600 transition-all duration-300 group-hover:scale-110">
                <CalendarIcon className="h-7 w-7" />
              </div>

              <h3 className="text-xl font-bold text-slate-900">
                Mark Attendance
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Check in, monitor attendance history, and track your work hours.
              </p>

              <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600">
                Open Attendance
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          {/* Leave Card */}
          <Link
            to="/leave"
            className="group relative overflow-hidden rounded-[30px] border border-white/70 bg-white/85 p-6 shadow-xl shadow-slate-200/50 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >
            <div className="absolute right-[-20px] top-[-20px] h-32 w-32 rounded-full bg-violet-500/10 blur-2xl" />

            <div className="relative z-10">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 transition-all duration-300 group-hover:scale-110">
                <FileTextIcon className="h-7 w-7" />
              </div>

              <h3 className="text-xl font-bold text-slate-900">
                Apply for Leave
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Submit leave requests and manage your leave history and status.
              </p>

              <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-violet-600">
                Open Leave Portal
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
