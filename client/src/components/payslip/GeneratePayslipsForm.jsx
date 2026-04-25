import { Loader2, Plus, X } from "lucide-react";
import React, { useState } from "react";

const GeneratePayslipsForm = ({ employees, onSuccess }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  if (!isOpen)
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="btn-primary flex items-center gap-2"
      >
        <Plus className="w-4 h-4" /> Generate Payslip
      </button>
    );
  const handleSubmit = async (e) => {
    e.preventDefault();
  };
  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4 ">
      <div className="card max-w-lg w-full p-6 animate-slide-up">
        <div className="flex justify-between items-center mb-6">
          <h3>Generate Monthly Payslip</h3>
          <button
            onClick={() => setIsOpen(false)}
            className="text-slate-400 hover:text-slate-600 p-1"
          >
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* select employee  */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Employee
            </label>
            <select name="employeeId" required>
              {employees.map((e) => (
                <option value={e.id} key={e.id}>
                  {e.firstName} {e.lastName} ({e.position})
                </option>
              ))}
            </select>
          </div>
          {/* select month and year  */}
          <div className=" grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Month
              </label>
              <select name="month">
                {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                  <option value={m} key={m}>
                    {m}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Year
              </label>
              <input
                type="number"
                name="year"
                defaultValue={new Date().getFullYear()}
              />
            </div>
          </div>
          {/* basic Salary */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Basic Salary
            </label>
            <input
              type="number"
              name="basicSalary"
              required
              placeholder="5000"
            />
          </div>
          {/* allowances and deduction */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Allowances
              </label>
              <input type="number" name="allowances" defaultValue="0" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Deductions
              </label>
              <input type="number" name="deductions" defaultValue="0" />
            </div>
          </div>
          {/* buttons */}
          <div className="flex justify-end gap-3 pt-2">
            <button
              onClick={() => setIsOpen(false)}
              type="button"
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              disabled={loading}
              type="submit"
              className="btn-primary flex items-center"
            >
              {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Generate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default GeneratePayslipsForm;
