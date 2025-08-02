import React, { createContext, useContext, useState } from 'react';

const AdminContext = createContext();
AdminContext.displayName = 'AdminContext';

export const useAdmin = () => useContext(AdminContext);

// Rename export to AdminProvider (match your import)
export const AdminProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);

  const loginAsAdmin = (password) => {
    if (password === 'supersecret') {
      setIsAdmin(true);
      return true;
    }
    return false;
  };

  const logout = () => setIsAdmin(false);

  return (
    <AdminContext.Provider value={{ isAdmin, loginAsAdmin, logout }}>
      {children}
    </AdminContext.Provider>
  );
};
