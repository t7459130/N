// pages/add-car.js
import dynamic from 'next/dynamic';
const CarForm = dynamic(() => import('../../components/CarForm'), { ssr: false });

export default function AddCarPage() {
  return (
    <div style={{ padding: '90px 20px 20px' }}>
      <h1>Add a New Car</h1>
      <CarForm
        onAddSuccess={() => {
          alert('Car added successfully! Redirecting to inventory.');
          window.location.href = '/inventory';
        }}
      />
    </div>
  );
}
