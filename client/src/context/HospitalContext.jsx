import { createContext, useContext, useMemo, useState } from 'react';

const HospitalContext = createContext(null);

export const HospitalProvider = ({ children }) => {
  const [hospital, setHospital] = useState(() => {
    const stored = localStorage.getItem('hospital');
    return stored ? JSON.parse(stored) : null;
  });

  const login = (hospitalData) => {
    localStorage.setItem('hospital', JSON.stringify(hospitalData));
    setHospital(hospitalData);
  };

  const logout = () => {
    localStorage.removeItem('hospital');
    setHospital(null);
  };

  const value = useMemo(
    () => ({ hospital, login, logout }),
    [hospital]
  );

  return (
    <HospitalContext.Provider value={value}>
      {children}
    </HospitalContext.Provider>
  );
};

export const useHospital = () => {
  const context = useContext(HospitalContext);
  if (!context) {
    throw new Error('useHospital must be used within HospitalProvider');
  }
  return context;
};




