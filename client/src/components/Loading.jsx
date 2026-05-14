import React from "react";
import { ShieldCheck } from "lucide-react";

const Loading = () => {
  return (
    <div className="relative flex min-h-dvh w-full items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-indigo-200/40 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-violet-200/40 blur-3xl" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(99,102,241,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.04)_1px,transparent_1px)] bg-[size:60px_60px]" />
      </div>

      {/* Loading Card */}
      <div className="relative z-10 flex w-[90%] max-w-sm flex-col items-center rounded-[32px] border border-white/70 bg-white/90 p-10 shadow-2xl shadow-slate-200/80 backdrop-blur-xl">
        {/* Logo */}
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-3xl bg-indigo-600 text-white shadow-xl shadow-indigo-500/30">
          <ShieldCheck className="h-8 w-8" />
        </div>

        {/* Spinner */}
        <div className="relative mb-6">
          <div className="h-14 w-14 rounded-full border-[3px] border-indigo-100" />

          <div className="absolute inset-0 animate-spin rounded-full border-[3px] border-indigo-600 border-t-transparent" />
        </div>

        {/* Text */}
        <h2 className="text-xl font-bold text-slate-900">Loading Dashboard</h2>

        <p className="mt-2 text-center text-sm leading-6 text-slate-500">
          Please wait while we securely prepare your workspace.
        </p>

        {/* Loading Bars */}
        <div className="mt-8 w-full space-y-3">
          <div className="h-3 w-full animate-pulse rounded-full bg-slate-200" />

          <div className="h-3 w-4/5 animate-pulse rounded-full bg-slate-200" />

          <div className="h-3 w-2/3 animate-pulse rounded-full bg-slate-200" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
