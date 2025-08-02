// components/AddCarPageContent.js
import { useState, useEffect } from 'react';
import { useAdmin } from './AdminContext';

export default function AddCarPageContent() {
  const [clientReady, setClientReady] = useState(false);
  const { isAdmin, loginAsAdmin, logout } = useAdmin();

  useEffect(() => { setClientReady(true); }, []);
  if (!clientReady) return null;
  ...
}

console.log('useAdmin returns:', useAdmin());

