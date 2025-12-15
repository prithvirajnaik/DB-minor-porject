import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import apiClient from '../api/apiClient';
import PageHeader from '../components/PageHeader';
import StatusBadge from '../components/StatusBadge';
import LoadingSpinner from '../components/LoadingSpinner';
import { BLOOD_GROUPS } from '../constants';

const DonorManage = () => {
  const [donors, setDonors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);

  const fetchDonors = async () => {
    setLoading(true);
    try {
      const { data } = await apiClient.get('/donor');
      setDonors(data);
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to load donors');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  const startEdit = (donor) => {
    setEditing({ ...donor });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditing((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data } = await apiClient.put(`/donor/${editing._id}`, {
        name: editing.name,
        blood_group: editing.blood_group,
        phone: editing.phone,
        city: editing.city,
        availability_status: editing.availability_status,
      });
      toast.success('Donor updated');
      setDonors((prev) =>
        prev.map((donor) => (donor._id === data._id ? data : donor))
      );
      setEditing(null);
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  const toggleAvailability = async (donor) => {
    try {
      const { data } = await apiClient.put(`/donor/${donor._id}`, {
        availability_status:
          donor.availability_status === 'Available'
            ? 'Unavailable'
            : 'Available',
      });
      setDonors((prev) =>
        prev.map((item) => (item._id === donor._id ? data : item))
      );
    } catch (err) {
      toast.error('Unable to update availability');
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Manage Donors"
        description="Edit donor details and update their availability."
      />

      {editing && (
        <form
          onSubmit={handleUpdate}
          className="grid gap-4 rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-100 md:grid-cols-5"
        >
          <input
            className="rounded-lg border border-slate-200 px-3 py-2 md:col-span-2"
            name="name"
            value={editing.name}
            onChange={handleChange}
            required
          />
          <select
            name="blood_group"
            value={editing.blood_group}
            onChange={handleChange}
            className="rounded-lg border border-slate-200 px-3 py-2"
          >
            {BLOOD_GROUPS.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
          <input
            className="rounded-lg border border-slate-200 px-3 py-2"
            name="phone"
            value={editing.phone}
            onChange={handleChange}
            required
          />
          <input
            className="rounded-lg border border-slate-200 px-3 py-2"
            name="city"
            value={editing.city}
            onChange={handleChange}
            required
          />
          <select
            name="availability_status"
            value={editing.availability_status}
            onChange={handleChange}
            className="rounded-lg border border-slate-200 px-3 py-2 md:col-span-2"
          >
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>
          <div className="flex gap-3 md:col-span-3">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 rounded-lg bg-emerald-600 py-2 text-sm font-semibold text-white disabled:opacity-70"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setEditing(null)}
              className="rounded-lg border border-slate-200 px-4 text-sm font-medium text-slate-700"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="overflow-x-auto rounded-xl bg-white shadow-sm ring-1 ring-slate-100">
          <table className="min-w-full divide-y divide-slate-100">
            <thead className="bg-slate-50">
              <tr>
                {['Name', 'Blood', 'Phone', 'City', 'Availability', 'Actions'].map(
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
              {donors.map((donor) => (
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
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(donor)}
                        className="rounded-md border border-slate-200 px-3 py-1 text-xs text-slate-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => toggleAvailability(donor)}
                        className="rounded-md border border-rose-200 px-3 py-1 text-xs text-rose-600"
                      >
                        Toggle
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DonorManage;

