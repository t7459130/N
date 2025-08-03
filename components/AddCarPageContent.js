import { useState, useEffect } from 'react';
import { useAdmin } from './AdminContext';

export default function AddCarPageContent() {
  const [clientReady, setClientReady] = useState(false);
  const { isAdmin, loginAsAdmin, logout } = useAdmin();

  useEffect(() => {
    setClientReady(true);
    console.log('useAdmin returns:', { isAdmin, loginAsAdmin, logout });
  }, [isAdmin]);

  if (!clientReady) return null;

  return (
    <div>
      <h1>Add Car Page</h1>
      {isAdmin ? (
        <>
          <p>You are logged in as admin.</p>
          <button onClick={logout}>Log out</button>
        </>
      ) : (
        <>
          <p>You are not an admin.</p>
          <button onClick={() => loginAsAdmin(prompt('Enter admin password'))}>
            Log in as Admin
          </button>
        </>
      )}
    </div>
  );
}
