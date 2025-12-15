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

  const inputClasses = "block w-full rounded-md border-slate-200 shadow-sm focus:border-rose-500 focus:ring-rose-500 sm:text-sm py-2 px-3 bg-slate-50";
  const labelClasses = "block text-sm font-medium text-slate-700 mb-1";

  return (
    <div className="flex min-h-[80vh] items-center justify-center animate-fade-in">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100 text-2xl">
            🏥
          </div>
          <h2 className="mt-6 text-3xl font-bold tracking-tight text-slate-900">Hospital Login</h2>
          <p className="mt-2 text-sm text-slate-600">
            Welcome back. Please enter your credentials to access the dashboard.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-slate-100">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="phone" className={labelClasses}>
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="text"
                required
                value={credentials.phone}
                onChange={handleChange}
                className={inputClasses}
                placeholder="Enter registered phone"
              />
            </div>

            <div>
              <label htmlFor="password" className={labelClasses}>
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={credentials.password}
                onChange={handleChange}
                className={inputClasses}
                placeholder="••••••••"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-lg bg-rose-600 px-3 py-2 text-sm font-bold text-white shadow-sm hover:bg-rose-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-slate-500">Demo Credentials</span>
              </div>
            </div>
            <div className="mt-4 text-center text-xs text-slate-400">
              Phone: 999-000-0000 • Password: password123
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalLogin;




