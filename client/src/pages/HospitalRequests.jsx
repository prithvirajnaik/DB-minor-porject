import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import apiClient from '../api/apiClient';
import PageHeader from '../components/PageHeader';
import LoadingSpinner from '../components/LoadingSpinner';
import { useHospital } from '../context/HospitalContext';

const HospitalRequests = () => {
  const { hospital } = useHospital();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const { data } = await apiClient.get('/request');
      setRequests(data);
    } catch (err) {
      toast.error('Failed to load requests');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Contact Requests"
        description="Monitor when hospitals contact donors."
        action={
          <button
            onClick={fetchRequests}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700"
          >
            Refresh
          </button>
        }
      />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="overflow-x-auto rounded-xl bg-white shadow-sm ring-1 ring-slate-100">
          <table className="min-w-full divide-y divide-slate-100">
            <thead className="bg-slate-50">
              <tr>
                {['Hospital', 'Donor', 'Blood', 'City', 'Requested On'].map(
                  (header) => (
                    <th
                      key={header}
                      className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-500"
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {requests.map((request) => (
                <tr key={request._id}>
                  <td className="px-4 py-3 text-sm font-medium text-slate-900">
                    {request.hospital_id?.name}{' '}
                    {hospital &&
                      request.hospital_id?._id === hospital._id &&
                      '(You)'}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {request.donor_id?.name}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {request.donor_id?.blood_group}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {request.donor_id?.city}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {new Date(request.request_date).toLocaleString()}
                  </td>
                </tr>
              ))}
              {requests.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-6 text-center text-sm text-slate-500"
                  >
                    No requests logged yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HospitalRequests;




