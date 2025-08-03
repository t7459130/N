import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const filterOptions = {
  transmission: ['Automatic', 'Manual'],
  fuelType: ['Petrol', 'Diesel', 'Electric', 'Hybrid'],
  bodyStyle: ['Sedan', 'Coupe', 'SUV', 'Hatchback', 'Convertible'],
  colour: [], // will be set dynamically
  year: [], // dynamic from cars
  make: [], // dynamic from cars
  model: [], // dynamic from cars
};

function SearchOverlay({ cars, isOpen, onClose }) {
  const [searchInput, setSearchInput] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [filters, setFilters] = useState({
    transmission: new Set(),
    fuelType: new Set(),
    bodyStyle: new Set(),
    colour: new Set(),
    year: new Set(),
    make: new Set(),
    model: new Set(),
  });

  const toggleFilter = (category, value) => {
    setFilters((prev) => {
      const newSet = new Set(prev[category]);
      newSet.has(value) ? newSet.delete(value) : newSet.add(value);
      return { ...prev, [category]: newSet };
    });
  };

  const applyFilters = (car) => {
    return Object.entries(filters).every(([cat, set]) =>
      set.size === 0 || set.has(car[cat]?.toString())
    );
  };

  // Dynamically fill colours, years, makes, models from cars
  filterOptions.colour = [...new Set(cars.map((c) => c.colour).filter(Boolean))];
  filterOptions.year = [...new Set(cars.map((c) => c.year).filter(Boolean))].sort((a, b) => b - a);
  filterOptions.make = [...new Set(cars.map((c) => c.make).filter(Boolean))];
  filterOptions.model = [...new Set(cars.map((c) => c.model).filter(Boolean))];

  const filtered = cars
    .filter((car) =>
      `${car.make} ${car.model}`.toLowerCase().includes(searchInput.toLowerCase())
    )
    .filter(applyFilters)
    .sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'year') return b.year - a.year;
      return b.id - a.id;
    });

  if (!isOpen) return null;

  return (
    <div className="search-overlay">
      <button className="close-btn" onClick={onClose}>
        <FaTimes size={20} />
      </button>

      <div className="search-header">
        <input
          type="text"
          placeholder="Search by make or model..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button className="search-btn" onClick={() => { /* trigger filtering if needed */ }}>
          Search
        </button>
        <button className="sort-btn">
          Sort By
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="latest">Latest</option>
            <option value="year">Year (new to old)</option>
            <option value="price">Price (low to high)</option>
          </select>
        </button>
      </div>

      <div className="filter-panel">
        {Object.entries(filterOptions).map(([cat, opts]) => (
          <div key={cat} className="filter-group">
            <h4>{cat.charAt(0).toUpperCase() + cat.slice(1)}</h4>
            {opts.map((val) => (
              <label key={val}>
                <input
                  type="checkbox"
                  checked={filters[cat].has(val.toString())}
                  onChange={() => toggleFilter(cat, val.toString())}
                />
                {val}
              </label>
            ))}
          </div>
        ))}
      </div>

      <div className="latest-arrivals-overlay">
        <h3>Latest Arrivals</h3>
        <div className="car-listings">
          {filtered.slice(0, 10).map((car) => (
            <div key={car.id || car._id} className="car-card">
              {car.images?.[0] ? (
                <img
                  src={car.images[0]}
                  alt={`${car.make} ${car.model}`}
                  style={{ width: 400, height: 250, objectFit: 'cover' }}
                />
              ) : (
                <div style={{ width: 400, height: 250, backgroundColor: '#ccc' }} />
              )}
              <div className="car-details">
                <h4>
                  {car.year} {car.make} {car.model}
                </h4>
                <p>£{car.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchOverlay;
