import { format } from "date-fns";
import { Download, ReceiptTextIcon } from "lucide-react";
import React from "react";

const PayslipList = ({ payslips = [], isAdmin }) => {
  return (
    <div className="overflow-hidden rounded-[28px] border border-white/70 bg-white/85 shadow-xl shadow-slate-200/50 backdrop-blur-xl">
      <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <ReceiptTextIcon className="h-5 w-5" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900">Payslips</h2>
            <p className="text-sm text-slate-500">
              View and download salary slips
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] border-collapse">
          <thead>
            <tr className="bg-slate-50 text-left">
              {isAdmin && (
                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                  Employee
                </th>
              )}
              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                Period
              </th>
              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                Basic Salary
              </th>
              <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                Net Salary
              </th>
              <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-wide text-slate-500">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {payslips.length === 0 ? (
              <tr>
                <td
                  colSpan={isAdmin ? 5 : 4}
                  className="px-5 py-14 text-center"
                >
                  <div className="mx-auto flex max-w-sm flex-col items-center">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                      <ReceiptTextIcon className="h-7 w-7" />
                    </div>

                    <h3 className="text-base font-bold text-slate-800">
                      No payslips found
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Payslip records will appear here once generated.
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              payslips.map((payslip) => {
                const id = payslip._id || payslip.id;

                return (
                  <tr
                    key={id}
                    className="transition-colors duration-200 hover:bg-indigo-50/40"
                  >
                    {isAdmin && (
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-indigo-50 text-sm font-bold text-indigo-600">
                            {payslip.employee?.firstName?.[0] || "E"}
                          </div>

                          <div>
                            <p className="font-semibold text-slate-900">
                              {payslip.employee?.firstName}{" "}
                              {payslip.employee?.lastName}
                            </p>
                            <p className="text-xs text-slate-500">Employee</p>
                          </div>
                        </div>
                      </td>
                    )}

                    <td className="px-5 py-4 text-sm font-medium text-slate-600">
                      {format(
                        new Date(payslip.year, payslip.month - 1),
                        "MMMM yyyy",
                      )}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-500">
                      ₹{payslip.basicSalary?.toLocaleString()}
                    </td>

                    <td className="px-5 py-4">
                      <span className="text-sm font-bold text-slate-900">
                        ₹{payslip.netSalary?.toLocaleString()}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-center">
                      <button
                        onClick={() =>
                          window.open(`/print/payslips/${id}`, "_blank")
                        }
                        className="inline-flex items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 px-3 py-2 text-xs font-bold text-indigo-600 transition-all duration-300 hover:bg-indigo-100 hover:text-indigo-700"
                      >
                        <Download className="mr-1.5 h-3.5 w-3.5" />
                        Download
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PayslipList;
