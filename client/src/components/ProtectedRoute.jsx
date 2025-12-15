import { Navigate } from 'react-router-dom';
import { useHospital } from '../context/HospitalContext';

const ProtectedRoute = ({ children }) => {
  const { hospital } = useHospital();
  if (!hospital) {
    return <Navigate to="/hospital/login" replace />;
  }
  return children;
};

export default ProtectedRoute;




