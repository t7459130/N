import { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function Inventory() {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    fetch('/api/cars')
      .then(r => r.json())
      .then(d => setCars(d.cars || []));
  }, []);

  return (
    <Layout cars={cars}>
      <div className="content">
        <h1>Inventory</h1>

        <div className="grid">
          {cars.map(c => (
            <Link key={c._id} href={`/car/${c._id}`} className="card">
              <img src={c.images?.[0]} />
              <h3>{c.make} {c.model}</h3>
              <p>£{c.price}</p>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}