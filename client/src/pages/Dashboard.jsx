import { useEffect, useState } from "react";
import { AlertCircleIcon, RefreshCcwIcon } from "lucide-react";
import Loading from "../components/Loading";
import EmployeeDashboard from "../components/EmployeeDashboard";
import AdminDashboard from "../components/AdminDashboard";
import api from "../api/axios";
import toast from "react-hot-toast";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const res = await api.get("/dashboard");
      setData(res.data);
    } catch (err) {
      toast.error(err.response?.data?.error || err?.message);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) return <Loading />;

  if (!data) {
    return (
      <div className="flex min-h-[70dvh] items-center justify-center">
        <div className="w-full max-w-md rounded-[30px] border border-white/70 bg-white/85 p-8 text-center shadow-xl shadow-slate-200/50 backdrop-blur-xl">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-3xl bg-rose-50 text-rose-600">
            <AlertCircleIcon className="h-8 w-8" />
          </div>

          <h2 className="text-xl font-bold text-slate-900">
            Failed to load dashboard
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            We could not fetch your dashboard data. Please try again.
          </p>

          <button
            onClick={fetchDashboard}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition-all duration-300 hover:from-indigo-700 hover:to-indigo-600 active:scale-[0.98]"
          >
            <RefreshCcwIcon className="h-4 w-4" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  return data.role === "ADMIN" ? (
    <AdminDashboard data={data} />
  ) : (
    <EmployeeDashboard data={data} />
  );
};

export default Dashboard;
