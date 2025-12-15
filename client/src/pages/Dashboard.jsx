import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import apiClient from '../api/apiClient';
import PageHeader from '../components/PageHeader';
import LoadingSpinner from '../components/LoadingSpinner';

const statLabels = [
  { key: 'totalDonors', label: 'Total Donors' },
  { key: 'availableDonors', label: 'Available Donors' },
  { key: 'totalRequests', label: 'Contact Requests' },
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
    <div className="space-y-8">
      <PageHeader
        title="Dashboard"
        description="Track donors, availability, and hospital contact activity."
      />
      {loading && <LoadingSpinner />}
      {!loading && stats && (
        <div className="grid gap-4 sm:grid-cols-3">
          {statLabels.map(({ key, label }) => (
            <div
              key={key}
              className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-100"
            >
              <p className="text-sm text-slate-500">{label}</p>
              <p className="text-3xl font-semibold text-slate-900">
                {stats[key]}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;




