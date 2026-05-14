import React from "react";
import {
  BarChart3,
  BadgeCheck,
  CalendarCheck,
  ShieldCheck,
  Users,
} from "lucide-react";

const LoginLeftSide = () => {
  const features = [
    { icon: Users, title: "Employee Records" },
    { icon: CalendarCheck, title: "Attendance Tracking" },
    { icon: BarChart3, title: "Payroll Insights" },
  ];

  return (
    <aside className="relative flex min-h-full w-full overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#020617]">
      <div className="absolute inset-0">
        <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-indigo-500/25 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-violet-500/15 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:64px_64px]" />
      </div>

      <div className="relative z-10 flex w-full flex-col justify-between p-8 lg:p-12 xl:p-16">
        <div className="flex items-center gap-4">
          <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-xl shadow-indigo-500/30">
            <BadgeCheck className="h-7 w-7" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-white">Employee MS</h2>
            <p className="text-sm text-slate-400">
              Enterprise Workforce Platform
            </p>
          </div>
        </div>

        <div className="max-w-xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-xl">
            <ShieldCheck className="h-4 w-4 text-indigo-300" />
            <span className="text-xs font-semibold text-slate-300">
              Secure dashboard access
            </span>
          </div>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white xl:text-6xl">
            Manage your team with a modern HR dashboard.
          </h1>

          <p className="mt-6 max-w-lg text-base leading-8 text-slate-400 xl:text-lg">
            Track attendance, manage employee records, process payslips, and
            keep workforce operations organized in one secure platform.
          </p>

          <div className="mt-10 grid gap-4 xl:grid-cols-3">
            {features.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition hover:border-indigo-400/40 hover:bg-white/10"
                >
                  <Icon className="mb-4 h-6 w-6 text-indigo-300" />
                  <p className="text-sm font-semibold text-white">
                    {item.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-7">
          <div>
            <h3 className="text-2xl font-bold text-white">24/7</h3>
            <p className="text-xs text-slate-400">Access</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white">99%</h3>
            <p className="text-xs text-slate-400">Secure</p>
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white">Fast</h3>
            <p className="text-xs text-slate-400">Workflow</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default LoginLeftSide;