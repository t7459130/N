import React, { useState } from 'react';
import { useAdmin } from './AdminContext';
import CarForm from './CarForm';

const AddCarPage = () => {
  const { isAdmin, loginAsAdmin, logout } = useAdmin();
  const [passwordInput, setPasswordInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const success = loginAsAdmin(passwordInput);
    if (!success) alert('Incorrect admin password');
    setPasswordInput('');
  };

  const handleAddCar = async (formData) => {
    setLoading(true);
    try {
      const response = await fetch('/api/add-car', {
        method: 'POST',
        body: formData, // No headers here — browser sets them for multipart
      });

      if (!response.ok) {
        throw new Error('Failed to add car');
      }

      const result = await response.json();
      console.log('Server response:', result);
      alert('Car added successfully!');
    } catch (error) {
      console.error('Add car error:', error);
      alert('Error adding car');
    } finally {
      setLoading(false);
    }
  };

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
    <div className="add-car-page">
      <button onClick={logout}>Logout</button>
      <h2>Add New Car to Inventory</h2>
      {loading && <p>Saving car...</p>}
      <CarForm onAddCar={handleAddCar} />
    </div>
  );
};

export default AddCarPage;
