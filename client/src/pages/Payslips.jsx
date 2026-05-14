import React, { useCallback, useEffect, useState } from "react";
import Loading from "../components/Loading";
import PayslipList from "../components/payslip/PayslipList";
import GeneratePayslipsForm from "../components/payslip/GeneratePayslipsForm";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import toast from "react-hot-toast";
import {
  BanknoteIcon,
  ReceiptTextIcon,
  RefreshCcwIcon,
  UsersIcon,
} from "lucide-react";

const Payslips = () => {
  const [payslips, setPayslips] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAuth();

  const isAdmin = user?.role === "ADMIN";

  const fetchPayslips = useCallback(async () => {
    try {
      setLoading(true);

      const res = await api.get("/payslips");
      setPayslips(res.data.data || []);
    } catch (error) {
      toast.error(error?.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchEmployees = useCallback(async () => {
    if (!isAdmin) return;

    try {
      const res = await api.get("/employees");
      setEmployees((res.data || []).filter((e) => !e.isDeleted));
    } catch (error) {
      toast.error(error?.response?.data?.error || "Failed to load employees");
    }
  }, [isAdmin]);

  useEffect(() => {
    fetchPayslips();
  }, [fetchPayslips]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  if (loading) return <Loading />;

  const totalNetSalary = payslips.reduce(
    (total, item) => total + Number(item.netSalary || 0),
    0,
  );

  const latestPayslip = payslips[0];

  return (
    <div className="animate-in fade-in duration-500">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2">
            <ReceiptTextIcon className="h-4 w-4 text-indigo-600" />

            <span className="text-xs font-semibold uppercase tracking-wide text-indigo-700">
              Payroll Center
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Payslips
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
            {isAdmin
              ? "Generate, review, and manage employee salary slips."
              : "View and download your salary slip history."}
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <button
            onClick={fetchPayslips}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600"
          >
            <RefreshCcwIcon className="h-4 w-4" />
            Refresh
          </button>

          {isAdmin && (
            <GeneratePayslipsForm
              employees={employees}
              onSuccess={fetchPayslips}
            />
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <div className="rounded-[28px] border border-white/70 bg-white/85 p-6 shadow-xl shadow-slate-200/50 backdrop-blur-xl">
          <div className="mb-5 flex h-13 w-13 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <ReceiptTextIcon className="h-6 w-6" />
          </div>

          <p className="text-sm font-semibold text-slate-500">Total Payslips</p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            {payslips.length}
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Available payroll records
          </p>
        </div>

        {isAdmin && (
          <div className="rounded-[28px] border border-white/70 bg-white/85 p-6 shadow-xl shadow-slate-200/50 backdrop-blur-xl">
            <div className="mb-5 flex h-13 w-13 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
              <UsersIcon className="h-6 w-6" />
            </div>

            <p className="text-sm font-semibold text-slate-500">
              Active Employees
            </p>

            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              {employees.length}
            </h2>

            <p className="mt-2 text-sm text-slate-500">Eligible for payroll</p>
          </div>
        )}

        <div className="rounded-[28px] border border-white/70 bg-white/85 p-6 shadow-xl shadow-slate-200/50 backdrop-blur-xl">
          <div className="mb-5 flex h-13 w-13 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <BanknoteIcon className="h-6 w-6" />
          </div>

          <p className="text-sm font-semibold text-slate-500">
            {isAdmin ? "Total Net Payroll" : "Latest Net Salary"}
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            ₹
            {isAdmin
              ? totalNetSalary.toLocaleString()
              : Number(latestPayslip?.netSalary || 0).toLocaleString()}
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            {isAdmin ? "Combined salary payout" : "Most recent payslip amount"}
          </p>
        </div>
      </div>

      <PayslipList payslips={payslips} isAdmin={isAdmin} />
    </div>
  );
};

export default Payslips;
