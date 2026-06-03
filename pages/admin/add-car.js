// pages/admin/add-car.js
import dynamic from 'next/dynamic';
const CarForm = dynamic(() => import('../../components/CarForm'), { ssr: false });

export default function AddCarPage() {

  const handleDeleteAll = async () => {
    if (!confirm('Are you sure you want to delete ALL cars? This cannot be undone.')) return;
    try {
      const res = await fetch('/api/cars', { method: 'DELETE' });
      const data = await res.json();
      alert(data.message);
    } catch (err) {
      alert('Error deleting cars: ' + err.message);
    }
  };

  return (
    <div style={{ padding: '90px 20px 20px' }}>
      <h1>Add a New Car</h1>

      <CarForm
        onAddSuccess={() => {
          alert('Car added successfully! Redirecting to inventory.');
          window.location.href = '/Inventory';
        }}
      />

      <hr style={{ margin: '40px 0', borderColor: '#ddd' }} />

      <div>
        <h2 style={{ color: '#c0392b', marginBottom: '10px' }}>Danger Zone</h2>
        <p style={{ color: '#666', marginBottom: '15px' }}>
          This will permanently delete every car from the database.
        </p>
        <button
          onClick={handleDeleteAll}
          style={{
            padding: '12px 24px',
            background: '#c0392b',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
        >
          🗑 Delete All Cars
        </button>
      </div>
    </div>
  );
}