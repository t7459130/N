import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';
import Link from 'next/link';

export default function SearchOverlay({ isOpen, onClose }) {
  const [mode, setMode] = useState('cars'); // cars | plate
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  if (!isOpen) return null;

  const searchCars = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/cars', {
        params: { search: query }
      });

      setResults(data.cars || []);
    } catch {
      setResults([]);
    }
    setLoading(false);
  };

  const searchPlate = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/api/plate-lookup', {
        params: { plate: query }
      });

      setResults(data ? [data] : []);
    } catch {
      setResults([]);
    }
    setLoading(false);
  };

  const handleSearch = () => {
    if (!query) return;

    if (mode === 'cars') searchCars();
    if (mode === 'plate') searchPlate();
  };

  return (
    <div className="search-overlay">

      <button className="close-btn" onClick={onClose}>
        <FaTimes size={24} />
      </button>

      <h2>Search</h2>

      {/* MODE SWITCH */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 10 }}>
        <button onClick={() => setMode('cars')}>
          Cars
        </button>
        <button onClick={() => setMode('plate')}>
          Registration Lookup
        </button>
      </div>

      {/* INPUT */}
      <input
        type="text"
        placeholder={
          mode === 'cars'
            ? "Search cars..."
            : "Enter registration (e.g. AB12 CDE)"
        }
        value={query}
        onChange={(e) => setQuery(e.target.value.toUpperCase())}
        style={{
          width: '100%',
          padding: 12,
          fontSize: 16,
          marginBottom: 10
        }}
      />

      <button onClick={handleSearch}>
        Search
      </button>

      {loading && <p>Loading...</p>}

      {/* RESULTS */}
      <div style={{ marginTop: 20 }}>
        {results.map((item, i) => (
          <div key={i} style={{
            border: '1px solid #ddd',
            padding: 10,
            marginBottom: 10
          }}>
            
            {mode === 'cars' ? (
              <Link href={`/car/${item._id}`}>
                <img src={item.images?.[0]} width="100%" />
                <h4>{item.make} {item.model}</h4>
              </Link>
            ) : (
              <>
                <h3>{item.registration}</h3>
                <p>Make: {item.make}</p>
                <p>Model: {item.model}</p>
                <p>Year: {item.year}</p>
                <p>Fuel: {item.fuelType}</p>
              </>
            )}

          </div>
        ))}
      </div>

      <style jsx>{`
        .search-overlay {
          position: fixed;
          inset: 0;
          background: white;
          z-index: 9999;
          padding: 20px;
          overflow-y: auto;
        }

        .close-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          background: none;
          border: none;
        }
      `}</style>
    </div>
  );
}