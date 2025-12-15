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

  const inputClasses = "block w-full rounded-md border-slate-200 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm py-2 px-3 bg-slate-50";
  const labelClasses = "block text-sm font-medium text-slate-700 mb-1";

  return (
    <div className="max-w-xl mx-auto py-8 animate-fade-in">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Register New Donor</h1>
        <p className="mt-2 text-sm text-slate-600">Enter the donor's details below to add them to the system.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className={labelClasses}>Full Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className={inputClasses}
                placeholder="e.g. John Doe"
              />
            </div>

            <div>
              <label className={labelClasses}>Blood Group</label>
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
              <label className={labelClasses}>Availability</label>
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

            <div>
              <label className={labelClasses}>Phone Number</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                className={inputClasses}
                placeholder="e.g. +91 98765 43210"
              />
            </div>

            <div>
              <label className={labelClasses}>City</label>
              <input
                name="city"
                value={form.city}
                onChange={handleChange}
                required
                className={inputClasses}
                placeholder="e.g. Mumbai"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              disabled={submitting}
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {submitting ? 'Registering...' : 'Register Donor'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DonorRegister;




