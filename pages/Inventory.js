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
                  <img
                    src={car.images?.[0]}
                    alt={`${car.make} ${car.model}`}
                  />
                  <div className="inventory-price">
                    £{Number(car.price).toLocaleString()}
                  </div>
                </div>

                <div className="inventory-info">
                  <h3>
                    {car.year} {car.make} {car.model}
                  </h3>

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

      <style jsx>{`
        .inventory-page {
          padding: 24px;
        }

        .inventory-header {
          margin-bottom: 20px;
        }

        /* ✅ GRID like eBay */
        .inventory-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 20px;
        }

        /* ✅ Card styling */
        .inventory-card {
          background: #fff;
          border-radius: 12px;
          overflow: hidden;
          text-decoration: none;
          color: inherit;
          box-shadow: 0 2px 10px rgba(0,0,0,0.08);
          transition: transform 0.15s ease, box-shadow 0.15s ease;
          display: flex;
          flex-direction: column;
        }

        .inventory-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 6px 18px rgba(0,0,0,0.12);
        }

        /* ✅ Image container controls sizing */
        .inventory-image {
          position: relative;
          width: 100%;
          height: 180px;
          background: #f5f5f5;
          overflow: hidden;
        }

        .inventory-image img {
          width: 100%;
          height: 100%;
          object-fit: cover; /* 🔥 key fix */
          display: block;
        }

        .inventory-price {
          position: absolute;
          bottom: 10px;
          left: 10px;
          background: rgba(0,0,0,0.75);
          color: #fff;
          padding: 6px 10px;
          border-radius: 6px;
          font-weight: bold;
          font-size: 14px;
        }

        .inventory-info {
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .inventory-info h3 {
          font-size: 15px;
          margin: 0;
        }

        .inventory-specs {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          font-size: 12px;
          color: #555;
        }

        .inventory-specs span {
          background: #f2f2f2;
          padding: 3px 6px;
          border-radius: 4px;
        }

        .view-details {
          margin-top: auto;
          padding: 8px;
          border: none;
          border-radius: 6px;
          background: #111;
          color: #fff;
          cursor: pointer;
          font-size: 13px;
        }

        .view-details:hover {
          background: #333;
        }

        .loading,
        .no-vehicles {
          padding: 40px;
          text-align: center;
        }
      `}</style>
    </Layout>
  );
}