// components/AddCarPageContent.js
import { useState, useEffect } from 'react';
import { useAdmin } from './AdminContext';

export default function AddCarPageContent() {
  const { isAdmin, loginAsAdmin, logout } = useAdmin();
  const [passwordInput, setPasswordInput] = useState('');
  const [clientReady, setClientReady] = useState(false);

  useEffect(() => {
    setClientReady(true);
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const success = loginAsAdmin(passwordInput);
    if (!success) alert('Incorrect admin password');
    setPasswordInput('');
  };

  if (!clientReady) return null;

  if (!isAdmin) {
    return (
      <div className="admin-login">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            placeholder="Enter admin password"
          />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>Add Car Page</h2>
      <button onClick={logout}>Logout</button>
      {/* your car form goes here */}
    </div>
  );
}
