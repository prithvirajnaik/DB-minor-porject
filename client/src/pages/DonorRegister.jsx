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
      toast.success('Donor registered successfully!');
      setForm(defaultForm);
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  };

  const inputClasses = "mt-2 w-full rounded-lg border border-slate-200 px-4 py-2.5 text-sm transition-all focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 outline-none";

  return (
    <div className="space-y-8 animate-fade-in">
      <PageHeader
        title="Register Donor"
        description="Capture donor information and their current availability."
      />
      <form
        onSubmit={handleSubmit}
        className="grid gap-6 rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-100 sm:grid-cols-2"
      >
        <div className="sm:col-span-2">
          <label className="text-sm font-medium text-slate-700">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className={inputClasses}
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
            className={inputClasses}
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
            className={inputClasses}
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
            className={inputClasses}
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
            className={inputClasses}
          >
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>
        </div>
        <div className="sm:col-span-2 pt-4">
          <button
            disabled={submitting}
            className="w-full rounded-lg bg-rose-600 py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-rose-500 hover:shadow-md disabled:opacity-70 disabled:hover:shadow-none"
          >
            {submitting ? 'Registering...' : 'Register Donor'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DonorRegister;




