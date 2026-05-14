import {
  AlertTriangleIcon,
  CheckCircle2Icon,
  Loader2,
  MailIcon,
  Save,
  User,
  UserRoundIcon,
  BriefcaseIcon,
} from "lucide-react";
import React, { useState } from "react";
import api from "../api/axios";

const ProfileForm = ({ initialData, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (initialData?.isDeleted) return;

    setLoading(true);
    setError("");
    setMessage("");

    const formData = new FormData(e.currentTarget);

    try {
      await api.post("/profile", formData);

      setMessage("Profile updated successfully");
      onSuccess?.();
    } catch (err) {
      setError(err.response?.data?.error || err?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400";

  const labelClass = "mb-2 block text-sm font-semibold text-slate-700";

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 overflow-hidden rounded-[30px] border border-white/70 bg-white/85 shadow-xl shadow-slate-200/50 backdrop-blur-xl"
    >
      {/* Header */}
      <div className="border-b border-slate-100 px-5 py-5 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
            <User className="h-6 w-6" />
          </div>

          <div>
            <h2 className="text-lg font-bold text-slate-900">Public Profile</h2>
            <p className="text-sm text-slate-500">
              Manage your visible profile information
            </p>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        {/* Error Message */}
        {error && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
            <AlertTriangleIcon className="mt-0.5 h-5 w-5 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Success Message */}
        {message && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
            <CheckCircle2Icon className="mt-0.5 h-5 w-5 shrink-0" />
            <span>{message}</span>
          </div>
        )}

        <div className="space-y-5">
          {/* Readonly Fields */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className={labelClass}>Name</label>

              <div className="relative">
                <UserRoundIcon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  disabled
                  readOnly
                  value={`${initialData?.firstName || ""} ${
                    initialData?.lastName || ""
                  }`}
                  className={`${inputClass} pl-10`}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Email</label>

              <div className="relative">
                <MailIcon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  disabled
                  readOnly
                  value={initialData?.email || ""}
                  className={`${inputClass} pl-10`}
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className={labelClass}>Position</label>

              <div className="relative">
                <BriefcaseIcon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                <input
                  disabled
                  readOnly
                  value={initialData?.position || ""}
                  className={`${inputClass} pl-10`}
                />
              </div>
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className={labelClass}>Bio</label>

            <textarea
              disabled={initialData?.isDeleted}
              name="bio"
              defaultValue={initialData?.bio || ""}
              placeholder="Write a brief bio..."
              rows={5}
              className={`${inputClass} resize-none ${
                initialData?.isDeleted
                  ? "cursor-not-allowed bg-slate-50 text-slate-400"
                  : ""
              }`}
            />

            <p className="mt-2 text-xs leading-5 text-slate-400">
              This information will be displayed in your profile.
            </p>
          </div>

          {/* Deactivated State */}
          {initialData?.isDeleted ? (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-100 text-rose-600">
                <AlertTriangleIcon className="h-6 w-6" />
              </div>

              <p className="font-bold text-rose-700">Account Deactivated</p>

              <p className="mt-1 text-sm text-rose-600">
                You can no longer update your profile.
              </p>
            </div>
          ) : (
            <div className="flex justify-end border-t border-slate-100 pt-5">
              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/30 transition-all duration-300 hover:from-indigo-700 hover:to-indigo-600 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Save className="h-4 w-4" />
                )}

                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default ProfileForm;
