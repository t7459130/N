import React, { useState, useEffect, useRef } from 'react';
import { FaTimes, FaFilter } from 'react-icons/fa';
import Link from 'next/link';
import axios from 'axios';

const filterOptionsStatic = {
  transmission: ['Automatic', 'Manual'],
  fuelType: ['Petrol', 'Diesel', 'Electric', 'Hybrid'],
  bodyStyle: ['Sedan', 'Coupe', 'SUV', 'Hatchback', 'Convertible'],
};

function SearchOverlay({ isOpen, onClose }) {
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

  const [dynamicOptions, setDynamicOptions] = useState({
    colour: [],
    year: [],
    make: [],
    model: [],
  });

  const [showFilters, setShowFilters] = useState(false);

  const debounceTimer = useRef(null);

  const toggleFilter = (cat, val) => {
    setFilters((prev) => {
      const newSet = new Set(prev[cat]);

      if (newSet.has(val)) {
        newSet.delete(val);
      } else {
        newSet.add(val);
      }

      return {
        ...prev,
        [cat]: newSet,
      };
    });
  };

  const buildQueryParams = () => {
    const params = {};

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

  const fetchCars = async () => {
    setLoading(true);

    try {
      const params = buildQueryParams();

      const { data } = await axios.get('/api/cars', {
        params,
      });

      setCars(data.cars || []);

      setDynamicOptions({
        colour: [
          ...new Set(
            data.cars.map((c) => c.colour || c.color).filter(Boolean)
          ),
        ],

        year: [
          ...new Set(
            data.cars.map((c) => c.year).filter(Boolean)
          ),
        ].sort((a, b) => b - a),

        make: [
          ...new Set(
            data.cars.map((c) => c.make).filter(Boolean)
          ),
        ],

        model: [
          ...new Set(
            data.cars.map((c) => c.model).filter(Boolean)
          ),
        ],
      });

    } catch (err) {
      console.error('Failed to fetch cars:', err);
      setCars([]);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (!isOpen) return;

    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      fetchCars();
    }, 300);

    return () => clearTimeout(debounceTimer.current);

  }, [filters, searchInput, sortBy, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="search-overlay">

      <button className="close-btn" onClick={onClose}>
        <FaTimes size={24} />
      </button>

      <h2>Search Cars</h2>

      <div className="search-header">

        <input
          type="text"
          placeholder="Search by make or model..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="search-input"
          autoFocus
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select"
        >
          <option value="latest">Latest</option>
          <option value="year">Year (new to old)</option>
          <option value="price">Price (low to high)</option>
        </select>

        <button
          className={`filter-toggle-btn ${showFilters ? 'active' : ''}`}
          onClick={() => setShowFilters(!showFilters)}
        >
          <FaFilter style={{ marginRight: 6 }} />
          Filters
        </button>

      </div>

      {showFilters && (
        <div className="filter-panel">

          {Object.entries(filterOptionsStatic).map(([cat, opts]) => (
            <div key={cat} className="filter-group">

              <h4>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </h4>

              {opts.map((val) => (
                <label key={val} className="filter-label">

                  <input
                    type="checkbox"
                    checked={filters[cat].has(val)}
                    onChange={() => toggleFilter(cat, val)}
                  />

                  {val}

                </label>
              ))}

            </div>
          ))}

          {['colour', 'year', 'make', 'model'].map((cat) => (
            <div key={cat} className="filter-group">

              <h4>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </h4>

              {dynamicOptions[cat].length === 0 && (
                <p className="no-options">No options</p>
              )}

              {dynamicOptions[cat].map((val) => (
                <label key={val} className="filter-label">

                  <input
                    type="checkbox"
                    checked={filters[cat].has(val.toString())}
                    onChange={() =>
                      toggleFilter(cat, val.toString())
                    }
                  />

                  {val}

                </label>
              ))}

            </div>
          ))}

        </div>
      )}

      <div className="latest-arrivals-overlay">

        <h3>Latest Arrivals</h3>

        {loading ? (
          <p>Loading cars...</p>

        ) : cars.length === 0 ? (

          <p>No cars found matching your criteria.</p>

        ) : (

          <div className="car-listings">

            {cars.map((car) => (

              <Link
                key={car._id}
                href={`/car/${car._id}`}
                className="car-card-link"
                onClick={onClose}
              >

                <div className="car-card">

                  {car.images?.length > 0 ? (

                    <img
                      src={car.images[0]}
                      alt={`${car.make} ${car.model}`}
                      loading="lazy"
                    />

                  ) : (

                    <div className="placeholder-image" />

                  )}

                  <div className="car-details">

                    <h4>
                      {car.year} {car.make} {car.model}
                    </h4>

                    <p className="price">
                      £{Number(car.price).toLocaleString()}
                    </p>

                    <p>
                      {car.mileage?.toLocaleString()} miles
                    </p>

                    <p>
                      {car.colour || car.color}
                    </p>

                  </div>

                </div>

              </Link>

            ))}

          </div>

        )}

      </div>

      <style jsx>{`
        .search-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: white;
          padding: 20px;
          overflow-y: auto;
          z-index: 1000;
          box-shadow: 0 0 10px rgba(0,0,0,0.3);
          max-height: 90vh;
          width: 90vw;
          max-width: 1200px;
          margin: 30px auto;
          border-radius: 8px;
        }

        .close-btn {
          position: absolute;
          top: 15px;
          right: 15px;
          background: transparent;
          border: none;
          cursor: pointer;
        }

        .search-header {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          align-items: center;
          margin-bottom: 15px;
        }

        .search-input {
          flex: 1 1 60%;
          padding: 10px;
          font-size: 16px;
          border: 1px solid #ccc;
          border-radius: 4px;
          min-width: 180px;
        }

        .sort-select {
          padding: 10px;
          font-size: 16px;
          border-radius: 4px;
          border: 1px solid #ccc;
          min-width: 160px;
        }

        .filter-toggle-btn {
          display: flex;
          align-items: center;
          background-color: #000;
          color: white;
          border: none;
          padding: 10px 16px;
          font-size: 16px;
          cursor: pointer;
          border-radius: 4px;
          transition: 0.3s;
        }

        .filter-toggle-btn:hover {
          background-color: #222;
        }

        .filter-toggle-btn.active {
          background-color: #444;
        }

        .filter-panel {
          display: flex;
          flex-wrap: wrap;
          gap: 24px;
          padding: 15px 0;
          border-top: 1px solid #eee;
          margin-bottom: 20px;
        }

        .filter-group {
          min-width: 120px;
          max-width: 180px;
          flex: 1 1 120px;
        }

        .filter-group h4 {
          margin-bottom: 8px;
          font-size: 16px;
          border-bottom: 1px solid #ddd;
          padding-bottom: 4px;
        }

        .filter-label {
          display: block;
          margin-bottom: 6px;
          cursor: pointer;
          font-size: 14px;
        }

        .latest-arrivals-overlay h3 {
          margin-bottom: 12px;
        }

        .car-listings {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
        }

        .car-card-link {
          text-decoration: none;
          color: inherit;
        }

        .car-card {
          width: 300px;
          border: 1px solid #ddd;
          border-radius: 6px;
          overflow: hidden;
          background: #fff;
          transition: 0.3s ease;
          cursor: pointer;
        }

        .car-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 18px rgba(0,0,0,0.15);
        }

        .car-card img {
          width: 100%;
          height: 180px;
          object-fit: cover;
          display: block;
        }

        .placeholder-image {
          width: 100%;
          height: 180px;
          background-color: #ccc;
        }

        .car-details {
          padding: 12px;
        }

        .car-details h4 {
          margin-bottom: 10px;
          font-size: 18px;
        }

        .car-details p {
          margin: 4px 0;
          color: #555;
        }

        .price {
          font-weight: bold;
          color: #000;
          font-size: 18px;
        }

        @media (max-width: 768px) {

          .search-overlay {
            width: 95vw;
            padding: 16px;
          }

          .search-header {
            flex-direction: column;
            align-items: stretch;
          }

          .filter-panel {
            flex-direction: column;
            gap: 16px;
          }

          .car-listings {
            justify-content: center;
          }

          .car-card {
            width: 100%;
            max-width: 350px;
          }

        }
      `}</style>

    </div>
  );
}

export default SearchOverlay;