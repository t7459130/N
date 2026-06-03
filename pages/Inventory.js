import { useEffect, useState } from 'react';
import Link from 'next/link';
import Layout from '../components/Layout';

export default function Inventory() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch('/api/cars')
      .then(res => res.json())
      .then(data => setCars(data.cars || []));
  }, []);

  return (
    <Layout>
      <div className="page">

        <h1>Inventory</h1>

        <div className="grid">
          {cars.map(car => (
            <Link key={car._id} href={`/car/${car._id}`} className="card">
              <img src={car.images?.[0]} />
              <h3>{car.make} {car.model}</h3>
            </Link>
          ))}
        </div>

      </div>
    </Layout>
  );
}