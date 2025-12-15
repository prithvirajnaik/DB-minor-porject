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

  const navLinks = [
    { to: '/dashboard', label: 'Dashboard', authRequired: false },
    { to: '/donor/register', label: 'Register', authRequired: false },
    { to: '/hospital/search', label: 'Search', authRequired: true },
    { to: '/hospital/requests', label: 'Requests', authRequired: true },
  ];

  const visibleLinks = navLinks.filter(link => !link.authRequired || hospital);

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-600 text-white shadow-sm">
            <span className="text-lg font-bold">B</span>
          </div>
          <span className="hidden text-lg font-bold text-slate-800 sm:block">
            BloodLink
          </span>
        </div>

        {/* Desktop Navigation - Centered */}
        <div className="hidden items-center gap-1 sm:flex">
          {visibleLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `rounded-full px-4 py-1.5 text-sm font-medium transition-all ${isActive
                  ? 'bg-rose-50 text-rose-600 shadow-sm ring-1 ring-rose-100'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          {hospital && (
            <NavLink
              to="/donor/manage"
              className={({ isActive }) =>
                `rounded-full px-4 py-1.5 text-sm font-medium transition-all ${isActive
                  ? 'bg-rose-50 text-rose-600 shadow-sm ring-1 ring-rose-100'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                }`
              }
            >
              Manage
            </NavLink>
          )}
        </div>

        {/* User Profile / Actions - Right */}
        <div className="flex items-center gap-4">
          {hospital ? (
            <div className="flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-xs font-semibold text-slate-900">{hospital.name}</p>
                <p className="text-[10px] text-slate-500">{hospital.city}</p>
              </div>
              <button
                onClick={handleLogout}
                className="rounded-full bg-slate-100 px-4 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-200 hover:text-slate-900"
              >
                Logout
              </button>
            </div>
          ) : (
            <NavLink
              to="/hospital/login"
              className="rounded-full bg-rose-600 px-5 py-1.5 text-sm font-medium text-white shadow-sm shadow-rose-200 transition-all hover:bg-rose-700 hover:shadow-md"
            >
              Hospital Login
            </NavLink>
          )}
        </div>
      </div>

      {/* Mobile Navigation (Simple Horizontal Scroll for now) */}
      <div className="flex overflow-x-auto border-t border-slate-50 px-4 py-3 sm:hidden">
        <div className="flex gap-2">
          {visibleLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `whitespace-nowrap rounded-full px-3 py-1 text-sm font-medium ${isActive
                  ? 'bg-rose-50 text-rose-600'
                  : 'text-slate-600 bg-slate-50'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          {hospital && (
            <NavLink
              to="/donor/manage"
              className={({ isActive }) =>
                `whitespace-nowrap rounded-full px-3 py-1 text-sm font-medium ${isActive ? 'bg-rose-50 text-rose-600' : 'text-slate-600 bg-slate-50'
                }`
              }
            >
              Manage
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;




