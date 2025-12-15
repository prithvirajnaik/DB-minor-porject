import { useState } from 'react';
import toast from 'react-hot-toast';
import apiClient from '../api/apiClient';
import PageHeader from '../components/PageHeader';
import { BLOOD_GROUPS } from '../constants';

const defaultForm = {
  name: '',
  blood_group: 'A+',
  phone: '',
  city: '',
  availability_status: 'Available',
};

const DonorRegister = () => {
  const [form, setForm] = useState(defaultForm);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await apiClient.post('/donor', form);
      toast.success('Donor registered');
      setForm(defaultForm);
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Register Donor"
        description="Capture donor information and their current availability."
      />
      <form
        onSubmit={handleSubmit}
        className="grid gap-6 rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-100 sm:grid-cols-2"
      >
        <div className="sm:col-span-2">
          <label className="text-sm font-medium text-slate-700">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2"
            placeholder="Donor full name"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">
            Blood Group
          </label>
          <select
            name="blood_group"
            value={form.blood_group}
            onChange={handleChange}
            className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2"
          >
            {BLOOD_GROUPS.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">Phone</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2"
            placeholder="Contact number"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">City</label>
          <input
            name="city"
            value={form.city}
            onChange={handleChange}
            required
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
            value={form.availability_status}
            onChange={handleChange}
            className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2"
          >
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>
        </div>
        <div className="sm:col-span-2">
          <button
            disabled={submitting}
            className="w-full rounded-lg bg-rose-600 py-3 text-sm font-semibold text-white disabled:opacity-70"
          >
            {submitting ? 'Submitting...' : 'Register Donor'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DonorRegister;




