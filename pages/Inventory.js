import { useEffect, useState, useMemo } from 'react';
import Layout from '../components/Layout';
import Link from 'next/link';

export default function Inventory() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedMakes, setSelectedMakes] = useState([]);
  const [selectedBodyStyles, setSelectedBodyStyles] = useState([]);
  const [sortBy, setSortBy] = useState('latest');

  useEffect(() => {
    fetch('/api/cars')
      .then((r) => r.json())
      .then((d) => {
        setCars(d.cars || []);
        setLoading(false);
      })
      .catch(() => {
        setCars([]);
        setLoading(false);
      });
  }, []);

  const makes = useMemo(() => {
    const set = new Set();
    cars.forEach((c) => c.make && set.add(c.make));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [cars]);

  const bodyStyles = useMemo(() => {
    const set = new Set();
    cars.forEach((c) => c.bodyStyle && set.add(c.bodyStyle));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [cars]);

  const toggleMake = (make) => {
    setSelectedMakes((prev) =>
      prev.includes(make) ? prev.filter((m) => m !== make) : [...prev, make]
    );
  };

  const toggleBodyStyle = (style) => {
    setSelectedBodyStyles((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]
    );
  };

  const clearFilters = () => {
    setSelectedMakes([]);
    setSelectedBodyStyles([]);
  };

  const filteredCars = useMemo(() => {
    let result = cars.filter((c) => {
      const makeOk = selectedMakes.length === 0 || selectedMakes.includes(c.make);
      const styleOk =
        selectedBodyStyles.length === 0 || selectedBodyStyles.includes(c.bodyStyle);
      return makeOk && styleOk;
    });

    if (sortBy === 'price-asc') {
      result = [...result].sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === 'price-desc') {
      result = [...result].sort((a, b) => Number(b.price) - Number(a.price));
    } else if (sortBy === 'year') {
      result = [...result].sort((a, b) => Number(b.year) - Number(a.year));
    }

    return result;
  }, [cars, selectedMakes, selectedBodyStyles, sortBy]);

  // Split into two even columns for the sidebar's two-column filter lists
  const splitInTwo = (arr) => {
    const mid = Math.ceil(arr.length / 2);
    return [arr.slice(0, mid), arr.slice(mid)];
  };
  const [makeColA, makeColB] = splitInTwo(makes);
  const [styleColA, styleColB] = splitInTwo(bodyStyles);

  return (
    <Layout>
      <div className="stock-page">
        <div className="stock-layout">
          <aside className="stock-sidebar">
            <button type="button" className="view-full-stock" onClick={clearFilters}>
              View Full Stock List
            </button>

            <div className="filter-block">
              <h3>Search By Manufacturer</h3>
              <div className="filter-columns">
                <ul className="filter-list">
                  {makeColA.map((make) => (
                    <li key={make}>
                      <button
                        type="button"
                        className={`filter-item${selectedMakes.includes(make) ? ' active' : ''}`}
                        onClick={() => toggleMake(make)}
                      >
                        {make}
                      </button>
                    </li>
                  ))}
                </ul>
                <ul className="filter-list">
                  {makeColB.map((make) => (
                    <li key={make}>
                      <button
                        type="button"
                        className={`filter-item${selectedMakes.includes(make) ? ' active' : ''}`}
                        onClick={() => toggleMake(make)}
                      >
                        {make}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {bodyStyles.length > 0 && (
              <div className="filter-block">
                <h3>Search By Bodystyle</h3>
                <div className="filter-columns">
                  <ul className="filter-list">
                    {styleColA.map((style) => (
                      <li key={style}>
                        <button
                          type="button"
                          className={`filter-item${selectedBodyStyles.includes(style) ? ' active' : ''}`}
                          onClick={() => toggleBodyStyle(style)}
                        >
                          {style}
                        </button>
                      </li>
                    ))}
                  </ul>
                  <ul className="filter-list">
                    {styleColB.map((style) => (
                      <li key={style}>
                        <button
                          type="button"
                          className={`filter-item${selectedBodyStyles.includes(style) ? ' active' : ''}`}
                          onClick={() => toggleBodyStyle(style)}
                        >
                          {style}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </aside>

          <div className="stock-main">
            <div className="stock-toolbar">
              <span className="result-count">
                {loading ? '' : `${filteredCars.length} results`}
              </span>
              <select
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="latest">Latest Arrivals</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="year">Year: Newest First</option>
              </select>
            </div>

            {loading ? (
              <div className="loading">Loading vehicles...</div>
            ) : filteredCars.length === 0 ? (
              <div className="no-vehicles">
                <p>No vehicles match your current filters</p>
                <button type="button" className="view-full-stock inline" onClick={clearFilters}>
                  View Full Stock List
                </button>
              </div>
            ) : (
              <div className="stock-list">
                {filteredCars.map((car) => (
                  <Link key={car._id} href={`/car/${car._id}`} className="stock-row">
                    <div className="stock-image">
                      <img
                        src={car.images?.[0]}
                        alt={`${car.make} ${car.model}`}
                      />
                    </div>

                    <div className="stock-info">
                      <div className="info-title-row">
                        <h3>
                          {car.make} {car.model}
                        </h3>
                        <span className="info-price">
                          £{Number(car.price).toLocaleString()}
                        </span>
                      </div>

                      <div className="spec-list">
                        <div className="spec-row">
                          <span className="spec-label">Year:</span>
                          <span className="spec-value">{car.year || '—'}</span>
                        </div>
                        <div className="spec-row">
                          <span className="spec-label">Colour:</span>
                          <span className="spec-value">{car.colour || '—'}</span>
                        </div>
                        <div className="spec-row spec-row-cta">
                          <div className="spec-row-inner">
                            <span className="spec-label">Mileage:</span>
                            <span className="spec-value">
                              {car.mileage != null ? Number(car.mileage).toLocaleString() : '—'}
                            </span>
                          </div>
                          <span className="stock-cta">View Vehicle</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
