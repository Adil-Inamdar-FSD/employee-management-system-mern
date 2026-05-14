import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  CalendarIcon,
  ChevronRightIcon,
  DollarSignIcon,
  FileTextIcon,
  LayoutDashboardIcon,
  Loader2,
  LogOutIcon,
  MenuIcon,
  SettingsIcon,
  ShieldCheck,
  UserIcon,
  UsersIcon,
  XIcon,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

const Sidebar = () => {
  const { pathname } = useLocation();

  const [userName, setUserName] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const { user, loading, logout } = useAuth();

  useEffect(() => {
    api.get("/profile").then(({ data }) => {
      if (data.firstName) {
        setUserName(`${data.firstName} ${data.lastName || ""}`.trim());
      }
    });
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const role = user?.role;

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboardIcon,
    },

    role === "ADMIN"
      ? {
          name: "Employees",
          href: "/employees",
          icon: UsersIcon,
        }
      : {
          name: "Attendance",
          href: "/attendance",
          icon: CalendarIcon,
        },

    {
      name: "Leave",
      href: "/leave",
      icon: FileTextIcon,
    },

    {
      name: "Payslips",
      href: "/payslips",
      icon: DollarSignIcon,
    },

    {
      name: "Settings",
      href: "/settings",
      icon: SettingsIcon,
    },
  ];

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  const sidebarContent = (
    <>
      {/* Top Brand */}
      <div className="border-b border-white/10 px-5 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-600 shadow-lg shadow-indigo-500/30">
              <ShieldCheck className="h-5 w-5 text-white" />
            </div>

            <div>
              <h2 className="text-sm font-bold tracking-wide text-white">
                Employee MS
              </h2>

              <p className="text-xs text-slate-400">Management Dashboard</p>
            </div>
          </div>

          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white"
          >
            <XIcon size={18} />
          </button>
        </div>
      </div>

      {/* Profile Card */}
      {userName && (
        <div className="mx-4 mt-5 rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-bold text-white shadow-lg">
              {userName.charAt(0).toUpperCase()}
            </div>

            <div className="min-w-0">
              <h3 className="truncate text-sm font-semibold text-white">
                {userName}
              </h3>

              <p className="truncate text-xs text-slate-400">
                {role === "ADMIN"
                  ? "System Administrator"
                  : "Employee Workspace"}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="px-5 pt-6 pb-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
          Main Menu
        </p>
      </div>

      <div className="flex-1 space-y-1 overflow-y-auto px-3 pb-5">
        {loading ? (
          <div className="flex items-center gap-2 px-3 py-3 text-slate-400">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm">Loading...</span>
          </div>
        ) : (
          navItems.map((item) => {
            const isActive = pathname.startsWith(item.href);

            return (
              <Link
                key={item.name}
                to={item.href}
                className={`group relative flex items-center gap-3 overflow-hidden rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-500/20 to-violet-500/10 text-white shadow-lg shadow-indigo-500/10"
                    : "text-slate-300 hover:bg-white/5 hover:text-white"
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-indigo-500" />
                )}

                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                    isActive
                      ? "bg-indigo-500 text-white"
                      : "bg-white/5 text-slate-400 group-hover:bg-white/10 group-hover:text-white"
                  }`}
                >
                  <item.icon className="h-[18px] w-[18px]" />
                </div>

                <span className="flex-1">{item.name}</span>

                <ChevronRightIcon
                  className={`h-4 w-4 transition-all duration-300 ${
                    isActive
                      ? "translate-x-0 text-indigo-300"
                      : "translate-x-[-4px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                  }`}
                />
              </Link>
            );
          })
        )}
      </div>

      {/* Bottom Logout */}
      <div className="border-t border-white/10 p-4">
        <button
          onClick={handleLogout}
          className="group flex w-full items-center gap-3 rounded-2xl border border-transparent px-4 py-3 text-sm font-medium text-slate-400 transition-all duration-300 hover:border-rose-500/20 hover:bg-rose-500/10 hover:text-rose-400"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 transition-all duration-300 group-hover:bg-rose-500/20">
            <LogOutIcon className="h-[18px] w-[18px]" />
          </div>

          <span>Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-50 rounded-2xl border border-white/10 bg-slate-900 p-3 text-white shadow-2xl lg:hidden"
      >
        <MenuIcon size={20} />
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden h-full w-[290px] shrink-0 border-r border-white/5 bg-gradient-to-b from-[#0f172a] via-[#111827] to-[#020617] lg:flex lg:flex-col">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[290px] flex-col bg-gradient-to-b from-[#0f172a] via-[#111827] to-[#020617] shadow-2xl transition-transform duration-300 lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  );
};

export default Sidebar;
