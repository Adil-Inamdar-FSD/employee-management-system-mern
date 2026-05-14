import { Link, Navigate } from "react-router-dom";
import LoginLeftSide from "../components/LoginLeftSide";
import {
  ArrowRight,
  Building2,
  LockKeyhole,
  ShieldCheck,
  UserIcon,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading";

const LoginLanding = () => {
  const { user, loading } = useAuth();

  if (loading) return <Loading />;
  if (user) return <Navigate to="/dashboard" replace />;

  const portaloptions = [
    {
      to: "/login/admin",
      title: "Admin Portal",
      description: "Manage employees, departments, payroll, and reports.",
      icon: ShieldCheck,
      tag: "Management",
    },
    {
      to: "/login/employee",
      title: "Employee Portal",
      description: "Track attendance, leaves, profile, and payslips.",
      icon: UserIcon,
      tag: "Workspace",
    },
  ];

  return (
    <div className="min-h-dvh w-full overflow-hidden bg-[#f5f7fb] lg:grid lg:grid-cols-2">
      {/* LEFT SIDE */}
      <div className="hidden min-h-dvh lg:block">
        <LoginLeftSide />
      </div>

      {/* RIGHT SIDE */}
      <main className="relative flex min-h-dvh w-full items-center justify-center overflow-y-auto px-4 py-8 sm:px-6 lg:px-10 xl:px-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#dbeafe,transparent_35%),radial-gradient(circle_at_bottom_left,#e0e7ff,transparent_30%)]" />

        <section className="relative z-10 w-full max-w-[520px]">
          <div className="mb-6 flex justify-center lg:justify-start">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 shadow-sm">
              <LockKeyhole className="h-4 w-4 text-indigo-600" />
              <span className="text-xs font-semibold text-slate-600">
                Secure EMS Access
              </span>
            </div>
          </div>

          <div className="rounded-[30px] border border-white/80 bg-white/95 p-5 shadow-2xl shadow-slate-200/80 backdrop-blur-xl sm:p-8 lg:p-10">
            <div className="mb-8 text-center lg:text-left">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg shadow-indigo-200 lg:mx-0">
                <Building2 className="h-7 w-7" />
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
                Welcome back
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-500 sm:text-base">
                Choose your portal to continue to the employee management
                dashboard.
              </p>
            </div>

            <div className="space-y-4">
              {portaloptions.map((portal) => {
                const Icon = portal.icon;

                return (
                  <Link
                    key={portal.to}
                    to={portal.to}
                    className="group flex items-center gap-4 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:bg-indigo-50/70 hover:shadow-xl hover:shadow-indigo-100 sm:p-5"
                  >
                    <div className="flex h-13 w-13 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-indigo-600 transition-all duration-300 group-hover:bg-indigo-600 group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="mb-1 flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-bold text-slate-900 sm:text-lg">
                          {portal.title}
                        </h3>

                        <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-500 group-hover:bg-white group-hover:text-indigo-600">
                          {portal.tag}
                        </span>
                      </div>

                      <p className="text-xs leading-5 text-slate-500 sm:text-sm">
                        {portal.description}
                      </p>
                    </div>

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 transition-all duration-300 group-hover:bg-indigo-600">
                      <ArrowRight className="h-4 w-4 text-slate-500 transition-all duration-300 group-hover:text-white" />
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-center text-xs leading-5 text-slate-500 sm:text-sm">
                Authorized users only. Your activity may be monitored for
                security and compliance.
              </p>
            </div>

            <div className="mt-7 border-t border-slate-200 pt-5 text-center text-xs text-slate-400 sm:text-sm">
              <p>
                © {new Date().getFullYear()} Greatstack. All rights reserved.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LoginLanding;