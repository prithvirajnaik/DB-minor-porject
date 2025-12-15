import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import apiClient from '../api/apiClient';
import PageHeader from '../components/PageHeader';
import StatusBadge from '../components/StatusBadge';
import LoadingSpinner from '../components/LoadingSpinner'; // Keeping it for now if used elsewhere, or I can remove if I'm sure. 
// Actually I'll just add SkeletonLoader import, and remove LoadingSpinner if I'm replacing it fully in this file.
import SkeletonLoader from '../components/SkeletonLoader';
import { BLOOD_GROUPS } from '../constants';
import { useHospital } from '../context/HospitalContext';

const defaultFilters = {
  blood_group: '',
  city: '',
  availability_status: 'Available',
};

const HospitalSearch = () => {
  const { hospital } = useHospital();
  const [filters, setFilters] = useState(defaultFilters);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchResults = async () => {
    setLoading(true);
    try {
      const params = Object.fromEntries(
        Object.entries(filters).filter(
          ([, value]) => value !== '' && value !== null
        )
      );
      const { data } = await apiClient.get('/donor/search', { params });
      setResults(data);
    } catch (err) {
      toast.error('Failed to fetch donors');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleContact = async (donorId) => {
    try {
      await apiClient.post('/request', {
        donor_id: donorId,
        hospital_id: hospital._id,
      });
      toast.success('Request logged');
    } catch (err) {
      toast.error('Unable to log request');
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Search Donors"
        description="Filter donors by blood type, city, and availability."
      />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchResults();
        }}
        className="grid gap-4 rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-100 md:grid-cols-4"
      >
        <div>
          <label className="text-sm font-medium text-slate-700">
            Blood Group
          </label>
          <select
            name="blood_group"
            value={filters.blood_group}
            onChange={handleChange}
            className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2"
          >
            <option value="">Any</option>
            {BLOOD_GROUPS.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">City</label>
          <input
            name="city"
            value={filters.city}
            onChange={handleChange}
            className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2"
            placeholder="City"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">
            Availability
          </label>
          <select
            name="availability_status"
            value={filters.availability_status}
            onChange={handleChange}
            className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2"
          >
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
            <option value="">Any</option>
          </select>
        </div>
        <div className="flex items-end">
          <button className="w-full rounded-lg bg-rose-600 py-3 text-sm font-semibold text-white">
            Search
          </button>
        </div>
      </form>

      {loading ? (
        <div className="bg-white p-6 rounded-xl shadow-sm ring-1 ring-slate-100">
          <SkeletonLoader type="table" count={5} />
        </div>
      ) : results.length > 0 ? (
        <div className="overflow-x-auto rounded-xl bg-white shadow-sm ring-1 ring-slate-100">
          <table className="min-w-full divide-y divide-slate-100">
            <thead className="bg-slate-50">
              <tr>
                {['Name', 'Blood', 'Phone', 'City', 'Availability', 'Action'].map(
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
              {results.map((donor) => (
                <tr key={donor._id}>
                  <td className="px-4 py-3 text-sm font-medium text-slate-900">
                    {donor.name}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {donor.blood_group}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {donor.phone}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    {donor.city}
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    <StatusBadge status={donor.availability_status} />
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600">
                    <button
                      onClick={() => handleContact(donor._id)}
                      className="rounded-md bg-emerald-600 px-3 py-1 text-xs font-semibold text-white transition-colors hover:bg-emerald-700"
                    >
                      Contact
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl bg-white p-12 text-center shadow-sm ring-1 ring-slate-100">
          <div className="mb-4 text-4xl">🔍</div>
          <h3 className="mb-1 text-lg font-medium text-slate-900">No donors found</h3>
          <p className="text-slate-500">We couldn't find any donors matching your criteria. Try adjusting the filters.</p>
        </div>
      )}
    </div>
  );
};

export default HospitalSearch;

