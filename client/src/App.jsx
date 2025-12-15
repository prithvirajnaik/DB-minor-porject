import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import DonorRegister from './pages/DonorRegister';
import DonorManage from './pages/DonorManage';
import HospitalLogin from './pages/HospitalLogin';
import HospitalSearch from './pages/HospitalSearch';
import HospitalRequests from './pages/HospitalRequests';
import { HospitalProvider } from './context/HospitalContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <HospitalProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-slate-50">
          <Navbar />
          <main className="mx-auto max-w-6xl px-4 py-8">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/donor/register" element={<DonorRegister />} />
              <Route path="/donor/manage" element={<DonorManage />} />
              <Route path="/hospital/login" element={<HospitalLogin />} />
              <Route
                path="/hospital/search"
                element={
                  <ProtectedRoute>
                    <HospitalSearch />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/hospital/requests"
                element={
                  <ProtectedRoute>
                    <HospitalRequests />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
      <Toaster position="top-right" />
    </HospitalProvider>
  );
}

export default App;
