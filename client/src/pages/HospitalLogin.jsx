import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import apiClient from '../api/apiClient';
import PageHeader from '../components/PageHeader';
import { useHospital } from '../context/HospitalContext';

const HospitalLogin = () => {
  const navigate = useNavigate();
  const { login } = useHospital();
  const [credentials, setCredentials] = useState({ phone: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await apiClient.post('/hospital/login', credentials);
      login(data);
      toast.success('Login successful');
      navigate('/hospital/search');
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <PageHeader
        title="Hospital Login"
        description="Use the default credentials from the seed data to sign in."
      />
      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-xl bg-white p-6 shadow-sm ring-1 ring-slate-100"
      >
        <div>
          <label className="text-sm font-medium text-slate-700">Phone</label>
          <input
            className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2"
            name="phone"
            value={credentials.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium text-slate-700">
            Password
          </label>
          <input
            type="password"
            className="mt-2 w-full rounded-lg border border-slate-200 px-3 py-2"
            name="password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
        </div>
        <button
          disabled={loading}
          className="w-full rounded-lg bg-rose-600 py-3 text-sm font-semibold text-white disabled:opacity-70"
        >
          {loading ? 'Signing in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default HospitalLogin;




