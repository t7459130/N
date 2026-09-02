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

  const makeCounts = useMemo(() => {
    const counts = {};
    cars.forEach((c) => {
      if (!c.make) return;
      counts[c.make] = (counts[c.make] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => a[0].localeCompare(b[0]));
  }, [cars]);

  const bodyStyleCounts = useMemo(() => {
    const counts = {};
    cars.forEach((c) => {
      if (!c.bodyStyle) return;
      counts[c.bodyStyle] = (counts[c.bodyStyle] || 0) + 1;
    });
    return Object.entries(counts).sort((a, b) => a[0].localeCompare(b[0]));
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

  const hasActiveFilters = selectedMakes.length > 0 || selectedBodyStyles.length > 0;

  return (
    <Layout>
      <div className="stock-page">
        <div className="stock-header">
          <h1>Current Stock</h1>
          <p>
            {loading
              ? 'Loading vehicles...'
              : `${filteredCars.length} vehicle${filteredCars.length === 1 ? '' : 's'} available`}
          </p>
        </div>

        <div className="stock-layout">
          <aside className="stock-sidebar">
            <div className="filter-block">
              <h3>Search By Manufacturer</h3>
              <ul className="filter-list">
                {makeCounts.map(([make, count]) => (
                  <li key={make}>
                    <button
                      type="button"
                      className={`filter-item${selectedMakes.includes(make) ? ' active' : ''}`}
                      onClick={() => toggleMake(make)}
                    >
                      {make} <span>({count})</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {bodyStyleCounts.length > 0 && (
              <div className="filter-block">
                <h3>Body Style</h3>
                <ul className="filter-checklist">
                  {bodyStyleCounts.map(([style, count]) => (
                    <li key={style}>
                      <label>
                        <input
                          type="checkbox"
                          checked={selectedBodyStyles.includes(style)}
                          onChange={() => toggleBodyStyle(style)}
                        />
                        {style} <span>({count})</span>
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {hasActiveFilters && (
              <button type="button" className="clear-filters" onClick={clearFilters}>
                Clear Filters
              </button>
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
                {hasActiveFilters && (
                  <button type="button" className="clear-filters inline" onClick={clearFilters}>
                    Clear Filters
                  </button>
                )}
              </div>
            ) : (
              <div className="stock-grid">
                {filteredCars.map((car) => (
                  <Link key={car._id} href={`/car/${car._id}`} className="stock-card">
                    <div className="stock-image">
                      <img
                        src={car.images?.[0]}
                        alt={`${car.make} ${car.model}`}
                      />
                    </div>

                    <div className="stock-body">
                      <h3>
                        {car.make} {car.model}
                      </h3>

                      <p className="stock-price">£{Number(car.price).toLocaleString()}</p>

                      <div className="stock-meta">
                        <div className="meta-item">
                          <span className="meta-label">Year</span>
                          <span className="meta-value">{car.year || '—'}</span>
                        </div>
                        <div className="meta-item">
                          <span className="meta-label">Colour</span>
                          <span className="meta-value">{car.colour || '—'}</span>
                        </div>
                        <div className="meta-item">
                          <span className="meta-label">Mileage</span>
                          <span className="meta-value">
                            {car.mileage != null ? Number(car.mileage).toLocaleString() : '—'}
                          </span>
                        </div>
                      </div>

                      <span className="stock-cta">View Vehicle</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .stock-page {
          background: #ffffff;
          color: #1a1a1a;
          padding: 2.5rem 2rem 4rem;
        }

        .stock-header {
          max-width: 1400px;
          margin: 0 auto 2rem;
        }

        .stock-header h1 {
          font-size: 2rem;
          font-weight: 700;
          letter-spacing: 0.5px;
          margin: 0 0 0.35rem;
        }

        .stock-header p {
          color: #777;
          font-size: 0.95rem;
          margin: 0;
        }

        .stock-layout {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 260px 1fr;
          gap: 2.5rem;
          align-items: start;
        }

        /* SIDEBAR */
        .stock-sidebar {
          position: sticky;
          top: 1rem;
          border: 1px solid #e5e5e5;
          border-radius: 6px;
          padding: 1.5rem;
        }

        .filter-block + .filter-block {
          margin-top: 1.75rem;
          padding-top: 1.75rem;
          border-top: 1px solid #eee;
        }

        .filter-block h3 {
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #999;
          margin: 0 0 0.9rem;
        }

        .filter-list,
        .filter-checklist {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .filter-item {
          background: none;
          border: none;
          padding: 0;
          font-size: 0.9rem;
          color: #333;
          cursor: pointer;
          text-align: left;
          transition: color 0.15s ease;
        }

        .filter-item span {
          color: #aaa;
          font-size: 0.8rem;
        }

        .filter-item:hover {
          color: #000;
        }

        .filter-item.active {
          font-weight: 700;
          color: #000;
        }

        .filter-checklist label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: #333;
          cursor: pointer;
        }

        .filter-checklist input {
          accent-color: #000;
        }

        .filter-checklist span {
          color: #aaa;
          font-size: 0.8rem;
        }

        .clear-filters {
          margin-top: 1.5rem;
          width: 100%;
          padding: 0.6rem;
          background: #111;
          color: #fff;
          border: none;
          border-radius: 4px;
          font-size: 0.85rem;
          cursor: pointer;
        }

        .clear-filters:hover {
          background: #333;
        }

        .clear-filters.inline {
          margin-top: 1rem;
          width: auto;
          padding: 0.6rem 1.5rem;
        }

        /* MAIN */
        .stock-toolbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 1rem;
          margin-bottom: 1.5rem;
          border-bottom: 1px solid #eee;
        }

        .result-count {
          font-size: 0.85rem;
          color: #777;
        }

        .sort-select {
          border: 1px solid #ddd;
          border-radius: 4px;
          padding: 0.45rem 0.75rem;
          font-size: 0.85rem;
          color: #333;
          background: #fff;
        }

        .stock-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 28px;
        }

        .stock-card {
          text-decoration: none;
          color: inherit;
          display: flex;
          flex-direction: column;
          border: 1px solid #eee;
          border-radius: 6px;
          overflow: hidden;
          transition: box-shadow 0.2s ease, transform 0.2s ease;
        }

        .stock-card:hover {
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
          transform: translateY(-2px);
        }

        .stock-image {
          width: 100%;
          aspect-ratio: 370 / 250;
          background: #f4f4f4;
          overflow: hidden;
        }

        .stock-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .stock-body {
          padding: 1.1rem 1.2rem 1.3rem;
          display: flex;
          flex-direction: column;
        }

        .stock-body h3 {
          font-size: 1rem;
          font-weight: 700;
          margin: 0 0 0.3rem;
        }

        .stock-price {
          font-size: 1.15rem;
          font-weight: 700;
          margin: 0 0 1rem;
        }

        .stock-meta {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #eee;
        }

        .meta-item {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .meta-label {
          font-size: 0.68rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #999;
        }

        .meta-value {
          font-size: 0.85rem;
          font-weight: 600;
          color: #1a1a1a;
        }

        .stock-cta {
          margin-top: 1rem;
          display: block;
          text-align: center;
          padding: 0.65rem;
          border: 1px solid #111;
          border-radius: 4px;
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          color: #111;
          transition: background 0.2s ease, color 0.2s ease;
        }

        .stock-card:hover .stock-cta {
          background: #111;
          color: #fff;
        }

        .loading,
        .no-vehicles {
          padding: 60px 0;
          text-align: center;
          color: #777;
        }

        @media (max-width: 900px) {
          .stock-layout {
            grid-template-columns: 1fr;
          }

          .stock-sidebar {
            position: static;
          }
        }

        @media (max-width: 480px) {
          .stock-page {
            padding: 1.5rem 1rem 3rem;
          }

          .stock-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </Layout>
  );
}
