import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";
import Loading from "../components/Loading";

const Layout = () => {
  const { user, loading } = useAuth();

  if (loading) return <Loading />;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <div className="h-dvh w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <div className="flex h-full w-full overflow-hidden">
        <Sidebar />

        <main className="min-w-0 flex-1 overflow-y-auto">
          <div className="min-h-full w-full px-4 py-6 pt-20 sm:px-6 lg:px-8 lg:pt-8 xl:px-10">
            <div className="mx-auto w-full max-w-[1600px]">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
