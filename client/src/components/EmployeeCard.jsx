import {
  BriefcaseIcon,
  MailIcon,
  PencilIcon,
  Trash2Icon,
  UserRoundIcon,
} from "lucide-react";
import React from "react";
import api from "../api/axios";
import toast from "react-hot-toast";

const EmployeeCard = ({ employee, onDelete, onEdit }) => {
  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this employee?")) return;

    try {
      await api.delete(`/employees/${employee.id}`);
      toast.success("Employee deleted successfully");
      onDelete();
    } catch (err) {
      toast.error(err.response?.data?.error || err.message);
    }
  };

  const initials = `${employee?.firstName?.[0] || ""}${
    employee?.lastName?.[0] || ""
  }`.toUpperCase();

  return (
    <div className="group relative overflow-hidden rounded-[28px] border border-white/70 bg-white/85 shadow-xl shadow-slate-200/50 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">
      {/* Top Background */}
      <div className="relative h-32 overflow-hidden bg-gradient-to-br from-indigo-500 via-violet-500 to-slate-900">
        <div className="absolute -left-10 -top-10 h-32 w-32 rounded-full bg-white/20 blur-2xl" />
        <div className="absolute bottom-0 right-0 h-36 w-36 rounded-full bg-indigo-200/20 blur-2xl" />

        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-700 shadow-sm backdrop-blur">
            {employee?.department || "Remote"}
          </span>

          {employee?.isDeleted && (
            <span className="rounded-full bg-rose-500 px-3 py-1 text-xs font-bold text-white shadow-sm">
              Deleted
            </span>
          )}
        </div>

        {!employee?.isDeleted && (
          <div className="absolute right-4 top-4 flex gap-2 opacity-100 sm:opacity-0 transition-all duration-300 group-hover:opacity-100">
            <button
              onClick={() => onEdit(employee)}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/90 text-slate-700 shadow-lg backdrop-blur transition-all duration-300 hover:scale-105 hover:text-indigo-600"
              title="Edit employee"
            >
              <PencilIcon className="h-4 w-4" />
            </button>

            <button
              onClick={handleDelete}
              className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/90 text-slate-700 shadow-lg backdrop-blur transition-all duration-300 hover:scale-105 hover:text-rose-600"
              title="Delete employee"
            >
              <Trash2Icon className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      {/* Avatar */}
      <div className="relative px-5">
        <div className="-mt-10 flex h-20 w-20 items-center justify-center rounded-3xl border-4 border-white bg-gradient-to-br from-indigo-100 to-violet-100 shadow-lg">
          {initials ? (
            <span className="text-2xl font-bold text-indigo-600">
              {initials}
            </span>
          ) : (
            <UserRoundIcon className="h-8 w-8 text-indigo-500" />
          )}
        </div>
      </div>

      {/* Body */}
      <div className="px-5 pb-5 pt-4">
        <h3 className="truncate text-lg font-bold text-slate-900">
          {employee?.firstName} {employee?.lastName}
        </h3>

        <p className="mt-1 truncate text-sm font-medium text-slate-500">
          {employee?.position || "Employee"}
        </p>

        <div className="mt-5 space-y-3">
          <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-3 py-2.5">
            <BriefcaseIcon className="h-4 w-4 text-indigo-500" />
            <span className="truncate text-sm text-slate-600">
              {employee?.department || "No department"}
            </span>
          </div>

          {employee?.email && (
            <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-3 py-2.5">
              <MailIcon className="h-4 w-4 text-indigo-500" />
              <span className="truncate text-sm text-slate-600">
                {employee.email}
              </span>
            </div>
          )}
        </div>

        {!employee?.isDeleted && (
          <div className="mt-5 grid grid-cols-2 gap-3 sm:hidden">
            <button
              onClick={() => onEdit(employee)}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-indigo-300 hover:text-indigo-600"
            >
              Edit
            </button>

            <button
              onClick={handleDelete}
              className="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-100"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeCard;
