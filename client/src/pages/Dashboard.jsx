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
    <div className="space-y-8 animate-fade-in">
      <PageHeader
        title="Dashboard"
        description="Track donors, availability, and hospital contact activity."
      />

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-3">
          <SkeletonLoader type="card" count={3} />
        </div>
      ) : stats ? (
        <div className="grid gap-6 sm:grid-cols-3">
          {statLabels.map(({ key, label, icon, color }) => (
            <div
              key={key}
              className="relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 transition-all hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">{label}</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900">
                    {stats[key]}
                  </p>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${color} text-2xl`}>
                  {icon}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-slate-500">No stats available.</div>
      )}

      {/* Quick Actions / Help Section - New Addition for UX */}
      <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
        <h3 className="text-lg font-semibold text-slate-900">Need Help?</h3>
        <p className="mt-2 text-slate-600">
          Get started by searching for donors or registering a new donor manually if they walk in.
        </p>
        <div className="mt-6 flex gap-4">
          <Link to="/hospital/search" className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-rose-500">
            Find Donors
          </Link>
          <Link to="/donor/register" className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-900 ring-1 ring-slate-300 hover:bg-slate-50">
            Register Donor
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;




