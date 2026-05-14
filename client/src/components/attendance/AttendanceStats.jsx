import { AlertCircleIcon, CalendarIcon, ClockIcon } from "lucide-react";
import React from "react";

const AttendanceStats = ({ history = [] }) => {
  const totalPresent = history.filter(
    (h) => h.status === "PRESENT" || h.status === "LATE",
  ).length;

  const totalLate = history.filter((h) => h.status === "LATE").length;

  const stats = [
    {
      label: "Days Present",
      value: totalPresent,
      icon: CalendarIcon,
      bg: "bg-indigo-50",
      text: "text-indigo-600",
      desc: "Total attended days",
    },
    {
      label: "Late Arrivals",
      value: totalLate,
      icon: AlertCircleIcon,
      bg: "bg-amber-50",
      text: "text-amber-600",
      desc: "Marked as late",
    },
    {
      label: "Avg. Work Hrs",
      value: "8.5 Hrs",
      icon: ClockIcon,
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      desc: "Average daily hours",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {stats.map((s) => {
        const Icon = s.icon;

        return (
          <div
            key={s.label}
            className="group relative overflow-hidden rounded-[28px] border border-white/70 bg-white/85 p-6 shadow-xl shadow-slate-200/50 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >
            <div className="absolute right-[-25px] top-[-25px] h-28 w-28 rounded-full bg-indigo-500/10 blur-2xl" />

            <div className="relative z-10 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-slate-500">
                  {s.label}
                </p>

                <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                  {s.value}
                </h2>

                <p className="mt-2 text-sm text-slate-500">{s.desc}</p>
              </div>

              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${s.bg} ${s.text} transition-all duration-300 group-hover:scale-110`}
              >
                <Icon className="h-7 w-7" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AttendanceStats;
