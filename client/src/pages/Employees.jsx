import React, { useCallback, useEffect, useState } from "react";
import { DEPARTMENTS } from "../assets/assets";
import { Plus, Search, Users2Icon, UserRoundSearch, X } from "lucide-react";
import EmployeeCard from "../components/EmployeeCard";
import EmployeeForm from "../components/EmployeeForm";
import api from "../api/axios";
import Loading from "../components/Loading";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectDept, setSelectDept] = useState("");
  const [editEmployee, setEditEmployee] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const fetchEmployees = useCallback(async () => {
    try {
      setLoading(true);

      const url = selectDept
        ? `/employees?department=${selectDept}`
        : "/employees";

      const res = await api.get(url);

      setEmployees(res.data || []);
    } catch (error) {
      console.error("Failed to fetch employees");
    } finally {
      setLoading(false);
    }
  }, [selectDept]);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const filtered = employees.filter((emp) =>
    `${emp.firstName} ${emp.lastName} ${emp.position}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  return (
    <div className="animate-in fade-in duration-500">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2">
            <Users2Icon className="h-4 w-4 text-indigo-600" />

            <span className="text-xs font-semibold uppercase tracking-wide text-indigo-700">
              Team Management
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Employees
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
            Manage employee records, departments, and workforce information.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:from-indigo-700 hover:to-indigo-600 active:scale-[0.98]"
        >
          <Plus className="h-4 w-4" />
          Add Employee
        </button>
      </div>

      {/* Search & Filter */}
      <div className="mb-7 rounded-[28px] border border-white/70 bg-white/85 p-5 shadow-xl shadow-slate-200/50 backdrop-blur-xl">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_240px]">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

            <input
              placeholder="Search employees by name or position..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
            />
          </div>

          {/* Department */}
          <select
            value={selectDept}
            onChange={(e) => setSelectDept(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-300 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100"
          >
            <option value="">All Departments</option>

            {DEPARTMENTS.map((deptName) => (
              <option key={deptName} value={deptName}>
                {deptName}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Employees Grid */}
      {loading ? (
        <Loading />
      ) : filtered.length === 0 ? (
        <div className="rounded-[30px] border border-dashed border-slate-200 bg-white/70 px-6 py-20 text-center shadow-lg shadow-slate-200/40">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100 text-slate-400">
            <UserRoundSearch className="h-8 w-8" />
          </div>

          <h3 className="text-lg font-bold text-slate-800">
            No employees found
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Try changing search keywords or department filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {filtered.map((emp) => (
            <EmployeeCard
              key={emp.id || emp._id}
              employee={emp}
              onDelete={fetchEmployees}
              onEdit={(e) => setEditEmployee(e)}
            />
          ))}
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm"
          onClick={() => setShowCreateModal(false)}
        >
          <div
            className="relative my-8 w-full max-w-5xl rounded-[32px] border border-white/70 bg-white/95 shadow-2xl shadow-slate-900/30 backdrop-blur-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-start justify-between border-b border-slate-100 bg-white/95 px-6 py-5 backdrop-blur-xl">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Add New Employee
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Create employee account and organization profile
                </p>
              </div>

              <button
                onClick={() => setShowCreateModal(false)}
                className="flex h-10 w-10 items-center justify-center rounded-2xl text-slate-400 transition-all duration-300 hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 sm:p-6">
              <EmployeeForm
                onSuccess={() => {
                  setShowCreateModal(false);
                  fetchEmployees();
                }}
                onCancel={() => setShowCreateModal(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editEmployee && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-950/60 p-4 backdrop-blur-sm"
          onClick={() => setEditEmployee(null)}
        >
          <div
            className="relative my-8 w-full max-w-5xl rounded-[32px] border border-white/70 bg-white/95 shadow-2xl shadow-slate-900/30 backdrop-blur-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-start justify-between border-b border-slate-100 bg-white/95 px-6 py-5 backdrop-blur-xl">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Edit Employee
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Update employee information and organization details
                </p>
              </div>

              <button
                onClick={() => setEditEmployee(null)}
                className="flex h-10 w-10 items-center justify-center rounded-2xl text-slate-400 transition-all duration-300 hover:bg-slate-100 hover:text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 sm:p-6">
              <EmployeeForm
                initialData={editEmployee}
                onSuccess={() => {
                  setEditEmployee(null);
                  fetchEmployees();
                }}
                onCancel={() => setEditEmployee(null)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Employees;
