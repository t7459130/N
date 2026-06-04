import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function Inventory() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/cars')
      .then(r => r.json())
      .then(d => {
        setCars(d.cars || []);
        setLoading(false);
      })
      .catch(() => {
        setCars([]);
        setLoading(false);
      });
  }, []);

  return (
    <Layout>
      <div className="inventory-page">
        <div className="inventory-header">
          <h1>Current Inventory</h1>
          <p>Browse our curated selection of premium luxury vehicles</p>
        </div>

        {loading ? (
          <div className="loading">Loading vehicles...</div>
        ) : cars.length === 0 ? (
          <div className="no-vehicles">
            <p>No vehicles currently available</p>
          </div>
        ) : (
          <div className="inventory-grid">
            {cars.map(car => (
              <Link key={car._id} href={`/car/${car._id}`} className="inventory-card">
                <div className="inventory-image">
                  <img src={car.images?.[0]} alt={`${car.make} ${car.model}`} />
                  <div className="inventory-price">£{Number(car.price).toLocaleString()}</div>
                </div>
                <div className="inventory-info">
                  <h3>{car.year} {car.make} {car.model}</h3>
                  <div className="inventory-specs">
                    <span>{car.mileage?.toLocaleString()} miles</span>
                    <span>{car.fuelType}</span>
                    <span>{car.transmission}</span>
                  </div>
                  <button className="view-details">View Details</button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}