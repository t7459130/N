import { useEffect, useState } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';

export default function Inventory() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCars = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/cars');
      if (!res.ok) throw new Error('Failed to fetch cars');
      const data = await res.json();
      setCars(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <Layout>
      <div style={{ padding: '2rem', maxWidth: 1200, margin: 'auto' }}>
        <h1>Inventory</h1>
        {loading ? (
          <p>Loading cars...</p>
        ) : cars.length === 0 ? (
          <p>No cars available</p>
        ) : (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {cars.map((car) => (
              <div key={car._id} style={{ border: '1px solid #ccc', borderRadius: 8, width: 260, padding: 12 }}>
                <Link href={`/car/${car._id}`}>
                  <a style={{ textDecoration: 'none', color: 'inherit' }}>
                    <img
                      src={car.images?.[0] || '/placeholder.png'}
                      alt={`${car.make} ${car.model}`}
                      style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 6 }}
                    />
                    <h3 style={{ margin: '10px 0 5px' }}>{car.make} {car.model}</h3>
                    <p>£{car.price}</p>
                  </a>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
