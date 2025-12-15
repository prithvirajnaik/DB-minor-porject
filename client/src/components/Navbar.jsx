import { NavLink, useNavigate } from 'react-router-dom';
import { useHospital } from '../context/HospitalContext';

const links = [
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/donor/register', label: 'Register Donor' },
  { to: '/donor/manage', label: 'Manage Donors' },
  { to: '/hospital/search', label: 'Search Donors' },
  { to: '/hospital/requests', label: 'Requests' },
];

const Navbar = () => {
  const { hospital, logout } = useHospital();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/hospital/login');
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-lg font-semibold text-rose-600">
            Blood Donor Search
          </p>
          {hospital ? (
            <p className="text-sm text-slate-500">
              Logged in as {hospital.name} ({hospital.city})
            </p>
          ) : (
            <p className="text-sm text-slate-500">Hospital login required</p>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `text-sm font-medium ${
                  isActive ? 'text-rose-600' : 'text-slate-600'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          {hospital ? (
            <button
              onClick={handleLogout}
              className="rounded-md bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700 hover:bg-slate-200"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/hospital/login"
              className="rounded-md bg-rose-600 px-3 py-1 text-sm font-medium text-white"
            >
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;




