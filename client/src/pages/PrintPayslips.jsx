import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { format } from "date-fns";
import api from "../api/axios";
import {
  AlertCircleIcon,
  Building2Icon,
  CalendarIcon,
  MailIcon,
  PrinterIcon,
  ReceiptTextIcon,
  UserIcon,
} from "lucide-react";

const PrintPayslips = () => {
  const { id } = useParams();

  const [payslip, setPayslip] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/payslips/${id}`)
      .then((res) => setPayslip(res.data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loading />;

  if (!payslip) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-slate-50 p-4">
        <div className="w-full max-w-md rounded-[30px] border border-white/70 bg-white/90 p-8 text-center shadow-xl shadow-slate-200/70">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-rose-50 text-rose-600">
            <AlertCircleIcon className="h-8 w-8" />
          </div>

          <h2 className="text-xl font-bold text-slate-900">
            Payslip not found
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            The requested payslip could not be loaded.
          </p>
        </div>
      </div>
    );
  }

  const period = format(new Date(payslip.year, payslip.month - 1), "MMMM yyyy");

  const employeeName = `${payslip.employee?.firstName || ""} ${
    payslip.employee?.lastName || ""
  }`.trim();

  return (
    <div className="min-h-dvh bg-gradient-to-br from-slate-50 via-white to-indigo-50 px-4 py-8 print:bg-white print:p-0">
      <div className="mx-auto max-w-4xl">
        {/* Print Button */}
        <div className="mb-5 flex justify-end print:hidden">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:from-indigo-700 hover:to-indigo-600 active:scale-[0.98]"
          >
            <PrinterIcon className="h-4 w-4" />
            Print Payslip
          </button>
        </div>

        {/* Payslip Card */}
        <div className="overflow-hidden rounded-[32px] border border-white/70 bg-white/95 shadow-2xl shadow-slate-200/70 backdrop-blur-xl print:rounded-none print:border-0 print:shadow-none">
          {/* Header */}
          <div className="relative overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#020617] px-6 py-8 text-white sm:px-10">
            <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full bg-indigo-500/25 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-violet-500/15 blur-3xl" />

            <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 shadow-lg shadow-indigo-500/30">
                  <ReceiptTextIcon className="h-7 w-7" />
                </div>

                <div>
                  <h1 className="text-2xl font-bold tracking-tight">PAYSLIP</h1>
                  <p className="mt-1 text-sm text-slate-300">
                    Employee Management System
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-xl">
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Pay Period
                </p>
                <p className="mt-1 text-lg font-bold text-white">{period}</p>
              </div>
            </div>
          </div>

          {/* Employee Info */}
          <div className="grid grid-cols-1 gap-4 border-b border-slate-100 p-6 sm:grid-cols-2 sm:p-8 lg:grid-cols-4">
            <div className="rounded-2xl bg-slate-50 p-4">
              <UserIcon className="mb-3 h-5 w-5 text-indigo-600" />
              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                Employee Name
              </p>
              <p className="mt-1 font-semibold text-slate-900">
                {employeeName || "N/A"}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <Building2Icon className="mb-3 h-5 w-5 text-indigo-600" />
              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                Position
              </p>
              <p className="mt-1 font-semibold text-slate-900">
                {payslip.employee?.position || "N/A"}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <MailIcon className="mb-3 h-5 w-5 text-indigo-600" />
              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                Email
              </p>
              <p className="mt-1 break-all font-semibold text-slate-900">
                {payslip.employee?.email || "N/A"}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-4">
              <CalendarIcon className="mb-3 h-5 w-5 text-indigo-600" />
              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                Period
              </p>
              <p className="mt-1 font-semibold text-slate-900">{period}</p>
            </div>
          </div>

          {/* Salary Table */}
          <div className="p-6 sm:p-8">
            <div className="overflow-hidden rounded-3xl border border-slate-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                      Description
                    </th>
                    <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wide text-slate-500">
                      Amount
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="px-5 py-4 font-medium text-slate-700">
                      Basic Salary
                    </td>
                    <td className="px-5 py-4 text-right font-semibold text-slate-900">
                      ₹{payslip.basicSalary?.toLocaleString()}
                    </td>
                  </tr>

                  <tr>
                    <td className="px-5 py-4 font-medium text-slate-700">
                      Allowances
                    </td>
                    <td className="px-5 py-4 text-right font-semibold text-emerald-600">
                      +₹{payslip.allowances?.toLocaleString()}
                    </td>
                  </tr>

                  <tr>
                    <td className="px-5 py-4 font-medium text-slate-700">
                      Deductions
                    </td>
                    <td className="px-5 py-4 text-right font-semibold text-rose-600">
                      -₹{payslip.deductions?.toLocaleString()}
                    </td>
                  </tr>

                  <tr className="bg-indigo-50">
                    <td className="px-5 py-5 text-base font-bold text-slate-900">
                      Net Salary
                    </td>
                    <td className="px-5 py-5 text-right text-xl font-bold text-indigo-700">
                      ₹{payslip.netSalary?.toLocaleString()}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Note
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  This is a computer-generated payslip and does not require a
                  physical signature.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left sm:text-right">
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Generated On
                </p>
                <p className="mt-2 font-semibold text-slate-900">
                  {format(new Date(), "dd MMMM yyyy")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Print CSS helper */}
      <style>
        {`
          @media print {
            body {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
          }
        `}
      </style>
    </div>
  );
};

export default PrintPayslips;
