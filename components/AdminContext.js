import { createContext, useContext, useState } from 'react';

const AdminContext = createContext(null);

export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  const loginAsAdmin = (pw) => {
    // Simple placeholder logic — replace with real auth
    if (pw === 'admin123') {
      setIsAdmin(true);
    }
  };

  const logout = () => setIsAdmin(false);

  return (
    <AdminContext.Provider value={{ isAdmin, loginAsAdmin, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const ctx = useContext(AdminContext);
  if (ctx === null) throw new Error('useAdmin must be inside AdminProvider');
  return ctx;
};
