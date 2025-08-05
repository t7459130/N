import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';

const filterOptionsStatic = {
  transmission: ['Automatic', 'Manual'],
  fuelType: ['Petrol', 'Diesel', 'Electric', 'Hybrid'],
  bodyStyle: ['Sedan', 'Coupe', 'SUV', 'Hatchback', 'Convertible'],
};

function SearchOverlay({ isOpen, onClose }) {
  // Filters state (all as Sets for multi-select)
  const [filters, setFilters] = useState({
    transmission: new Set(),
    fuelType: new Set(),
    bodyStyle: new Set(),
    colour: new Set(),
    year: new Set(),
    make: new Set(),
    model: new Set(),
  });

  const [searchInput, setSearchInput] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);

  // These will be filled dynamically from fetched cars
  const [dynamicOptions, setDynamicOptions] = useState({
    colour: [],
    year: [],
    make: [],
    model: [],
  });

  // Toggle filters helper
  const toggleFilter = (cat, val) => {
    setFilters((prev) => {
      const newSet = new Set(prev[cat]);
      if (newSet.has(val)) newSet.delete(val);
      else newSet.add(val);
      return { ...prev, [cat]: newSet };
    });
  };

  // Prepare query params for API from filters
  const buildQueryParams = () => {
    const params = {};

    // For multi-select filters, join by comma
    for (const cat in filters) {
      if (filters[cat].size > 0) {
        params[cat] = Array.from(filters[cat]).join(',');
      }
    }

    if (searchInput.trim()) {
      params.search = searchInput.trim();
    }

    if (sortBy) {
      params.sortBy = sortBy;
    }

    return params;
  };

  // Fetch filtered cars from backend
  useEffect(() => {
    if (!isOpen) return; // Only fetch when overlay open
    const fetchCars = async () => {
      setLoading(true);
      try {
        const params = buildQueryParams();
        // Replace '/api/cars' with your real API endpoint
        const { data } = await axios.get('/api/cars', { params });
        setCars(data.cars || []);

        // Update dynamic filter options from results
        setDynamicOptions({
          colour: [...new Set(data.cars.map(c => c.colour).filter(Boolean))],
          year: [...new Set(data.cars.map(c => c.year).filter(Boolean))].sort((a,b) => b - a),
          make: [...new Set(data.cars.map(c => c.make).filter(Boolean))],
          model: [...new Set(data.cars.map(c => c.model).filter(Boolean))],
        });
      } catch (err) {
        console.error('Failed to fetch cars:', err);
        setCars([]);
      }
      setLoading(false);
    };

    fetchCars();
  }, [filters, searchInput, sortBy, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="search-overlay" style={{ padding: 20, background: '#fff', overflowY: 'auto', maxHeight: '90vh' }}>
      <button className="close-btn" onClick={onClose} style={{ float: 'right' }}>
        <FaTimes size={24} />
      </button>

      <h2>Search Cars</h2>

      <div className="search-header" style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Search by make or model..."
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
          style={{ width: '60%', padding: 8, fontSize: 16 }}
        />

        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          style={{ marginLeft: 20, padding: 8, fontSize: 16 }}
        >
          <option value="latest">Latest</option>
          <option value="year">Year (new to old)</option>
          <option value="price">Price (low to high)</option>
        </select>
      </div>

      <div className="filter-panel" style={{ display: 'flex', flexWrap: 'wrap', gap: 20, marginBottom: 30 }}>
        {/* Static filters */}
        {Object.entries(filterOptionsStatic).map(([cat, opts]) => (
          <div key={cat} className="filter-group" style={{ minWidth: 120 }}>
            <h4>{cat.charAt(0).toUpperCase() + cat.slice(1)}</h4>
            {opts.map(val => (
              <label key={val} style={{ display: 'block' }}>
                <input
                  type="checkbox"
                  checked={filters[cat].has(val)}
                  onChange={() => toggleFilter(cat, val)}
                />{' '}
                {val}
              </label>
            ))}
          </div>
        ))}

        {/* Dynamic filters */}
        {['colour', 'year', 'make', 'model'].map(cat => (
          <div key={cat} className="filter-group" style={{ minWidth: 120 }}>
            <h4>{cat.charAt(0).toUpperCase() + cat.slice(1)}</h4>
            {dynamicOptions[cat].length === 0 && <p>No options</p>}
            {dynamicOptions[cat].map(val => (
              <label key={val} style={{ display: 'block' }}>
                <input
                  type="checkbox"
                  checked={filters[cat].has(val.toString())}
                  onChange={() => toggleFilter(cat, val.toString())}
                />{' '}
                {val}
              </label>
            ))}
          </div>
        ))}
      </div>

      <div className="latest-arrivals-overlay">
        <h3>Latest Arrivals</h3>
        {loading ? (
          <p>Loading cars...</p>
        ) : cars.length === 0 ? (
          <p>No cars found matching your criteria.</p>
        ) : (
          <div className="car-listings" style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
            {cars.map((car) => (
              <div
                key={car._id}
                className="car-card"
                style={{
                  border: '1px solid #ddd',
                  borderRadius: 4,
                  overflow: 'hidden',
                  width: 300,
                  boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                }}
              >
                {car.images?.length > 0 ? (
                  <img
                    src={car.images[0]} // assuming full URL stored
                    alt={`${car.make} ${car.model}`}
                    style={{ width: '100%', height: 180, objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{ width: '100%', height: 180, backgroundColor: '#ccc' }} />
                )}

                <div style={{ padding: 10 }}>
                  <h4 style={{ margin: '8px 0' }}>
                    {car.year} {car.make} {car.model}
                  </h4>
                  <p>£{car.price?.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchOverlay;
