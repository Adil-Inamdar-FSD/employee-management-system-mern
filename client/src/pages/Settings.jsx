import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import {
  LockIcon,
  ShieldCheckIcon,
  SettingsIcon,
  UserRoundIcon,
} from "lucide-react";
import ProfileForm from "../components/ProfileForm";
import ChangePasswordModal from "../components/ChangePasswordModal";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";
import toast from "react-hot-toast";

const Settings = () => {
  const { user } = useAuth();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const res = await api.get("/profile");
      const profile = res.data;

      if (profile) setProfile(profile);
    } catch (err) {
      toast.error(err?.response?.data?.error || err?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [user]);

  if (loading) return <Loading />;

  return (
    <div className="animate-in fade-in duration-500">
      {/* Header */}
      <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-4 py-2">
            <SettingsIcon className="h-4 w-4 text-indigo-600" />

            <span className="text-xs font-semibold uppercase tracking-wide text-indigo-700">
              Account Settings
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Settings
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
            Manage your profile, security settings, and account preferences.
          </p>
        </div>

        <div className="rounded-3xl border border-white/70 bg-white/80 px-5 py-4 shadow-lg shadow-slate-200/60 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <ShieldCheckIcon className="h-5 w-5" />
            </div>

            <div>
              <p className="text-sm font-bold text-slate-900">
                Account Protected
              </p>
              <p className="text-xs text-slate-500">
                Secure authentication enabled
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_380px]">
        {/* Profile Form */}
        <div className="min-w-0">
          <ProfileForm initialData={profile} onSuccess={fetchProfile} />
        </div>

        {/* Right Security Panel */}
        <aside className="space-y-6">
          <div className="overflow-hidden rounded-[30px] border border-white/70 bg-white/85 shadow-xl shadow-slate-200/50 backdrop-blur-xl">
            <div className="border-b border-slate-100 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                  <UserRoundIcon className="h-5 w-5" />
                </div>

                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Profile Summary
                  </h2>
                  <p className="text-sm text-slate-500">
                    Your account information
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-5 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-indigo-500 to-violet-600 text-xl font-bold text-white shadow-lg">
                  {profile?.firstName?.[0]?.toUpperCase() ||
                    user?.email?.[0]?.toUpperCase() ||
                    "U"}
                </div>

                <div className="min-w-0">
                  <h3 className="truncate text-lg font-bold text-slate-900">
                    {profile?.firstName
                      ? `${profile.firstName} ${profile.lastName || ""}`
                      : "User"}
                  </h3>

                  <p className="truncate text-sm text-slate-500">
                    {profile?.email || user?.email || "No email available"}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                  <span className="text-sm font-medium text-slate-500">
                    Role
                  </span>
                  <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600">
                    {user?.role || "USER"}
                  </span>
                </div>

                <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                  <span className="text-sm font-medium text-slate-500">
                    Status
                  </span>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-600">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Password Card */}
          <div className="rounded-[30px] border border-white/70 bg-white/85 p-6 shadow-xl shadow-slate-200/50 backdrop-blur-xl">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-600">
                <LockIcon className="h-5 w-5" />
              </div>

              <div>
                <p className="font-bold text-slate-900">Password</p>
                <p className="text-sm text-slate-500">
                  Update your account password
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowPasswordModal(true)}
              className="w-full rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-all duration-300 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600"
            >
              Change Password
            </button>
          </div>
        </aside>
      </div>

      <ChangePasswordModal
        open={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
      />
    </div>
  );
};

export default Settings;
