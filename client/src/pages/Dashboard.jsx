import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import apiClient from '../api/apiClient';
import PageHeader from '../components/PageHeader';
import SkeletonLoader from '../components/SkeletonLoader';
import { Link } from 'react-router-dom';

const statLabels = [
  { key: 'totalDonors', label: 'Total Donors', icon: '🩸', color: 'bg-red-50 text-red-600' },
  { key: 'availableDonors', label: 'Available Donors', icon: '✅', color: 'bg-emerald-50 text-emerald-600' },
  { key: 'totalRequests', label: 'Contact Requests', icon: '📞', color: 'bg-blue-50 text-blue-600' },
];

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await apiClient.get('/dashboard/stats');
        setStats(data);
      } catch (err) {
        toast.error(err?.response?.data?.message || 'Failed to load stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in py-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="mt-1 text-sm text-slate-500">Overview of donor availability and requests.</p>
        </div>
        <div className="flex gap-3">
          <Link to="/hospital/search" className="inline-flex items-center justify-center rounded-lg bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm ring-1 ring-slate-200 hover:bg-slate-50 transition-colors">
            Find Donors
          </Link>
          <Link to="/donor/register" className="inline-flex items-center justify-center rounded-lg bg-rose-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-rose-700 transition-colors">
            Register New Donor
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-3">
          <SkeletonLoader type="card" count={3} />
        </div>
      ) : stats ? (
        <div className="grid gap-6 sm:grid-cols-3">
          {statLabels.map(({ key, label, icon, color }) => (
            <div
              key={key}
              className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] ring-1 ring-slate-100 transition-all hover:shadow-lg hover:ring-rose-500/20"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">{label}</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900 tracking-tight">
                    {stats[key]}
                  </p>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${color} bg-opacity-10 text-2xl group-hover:scale-110 transition-transform`}>
                  {icon}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-300 p-12 text-center">
          <p className="text-slate-500">No stats available yet.</p>
        </div>
      )}

      {/* Quick Actions / Help Section - Simplified as it is now in header but keeping a secondary info section */}
      <div className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-white shadow-lg">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="text-lg font-semibold text-white">Need to find a donor urgently?</h3>
            <p className="mt-2 text-slate-300 max-w-xl">
              Use our search tool to filter donors by blood group and location instantly.
            </p>
          </div>
          <Link to="/hospital/search" className="whitespace-nowrap rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-slate-900 shadow hover:bg-slate-100 transition-colors">
            Search Donors
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;




