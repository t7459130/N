import { useEffect, useState, useMemo } from 'react';
import Head from 'next/head';
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
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
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
              <div className="stock-list">
                {filteredCars.map((car) => (
                  <Link key={car._id} href={`/car/${car._id}`} className="stock-card">
                    <div className="card-title-row">
                      <h3>
                        {car.make} {car.model}
                      </h3>
                      <span className="card-year">{car.year}</span>
                    </div>

                    <hr className="card-divider" />

                    <div className="stock-image">
                      <img
                        src={car.images?.[0]}
                        alt={`${car.make} ${car.model}`}
                      />
                    </div>

                    <hr className="card-divider" />

                    <div className="card-footer">
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

                      <div className="card-footer-right">
                        <p className="stock-price">£{Number(car.price).toLocaleString()}</p>
                        <span className="stock-cta">View Vehicle</span>
                      </div>
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
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
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

        .stock-list {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .stock-card {
          text-decoration: none;
          color: inherit;
          display: block;
          transition: opacity 0.2s ease;
        }

        .stock-card:hover {
          opacity: 0.92;
        }

        .card-title-row {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          padding-bottom: 0.85rem;
        }

        .card-title-row h3 {
          font-size: 1.4rem;
          font-weight: 600;
          margin: 0;
          color: #1a1a1a;
        }

        .card-year {
          font-size: 1rem;
          color: #888;
        }

        .card-divider {
          border: none;
          border-top: 1px solid #ddd;
          margin: 0;
        }

        .stock-image {
          width: 100%;
          aspect-ratio: 16 / 9;
          background: #f4f4f4;
          overflow: hidden;
          margin: 1.25rem 0;
        }

        .stock-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .card-footer {
          padding-top: 1.1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .stock-meta {
          display: flex;
          gap: 2.5rem;
        }

        .meta-item {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .meta-label {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #999;
        }

        .meta-value {
          font-size: 0.95rem;
          font-weight: 500;
          color: #1a1a1a;
        }

        .card-footer-right {
          display: flex;
          align-items: center;
          gap: 1.75rem;
          margin-left: auto;
        }

        .stock-price {
          font-size: 1.4rem;
          font-weight: 700;
          margin: 0;
          white-space: nowrap;
        }

        .stock-cta {
          flex-shrink: 0;
          padding: 0.95rem 2.5rem;
          background: #111;
          border: 1px solid #111;
          border-radius: 4px;
          font-size: 0.9rem;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          color: #fff;
          white-space: nowrap;
          transition: background 0.2s ease;
        }

        .stock-card:hover .stock-cta {
          background: #333;
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

          .card-footer {
            flex-direction: column;
            align-items: flex-start;
          }

          .card-footer-right {
            margin-left: 0;
            width: 100%;
            justify-content: space-between;
          }
        }

        @media (max-width: 480px) {
          .stock-page {
            padding: 1.5rem 1rem 3rem;
          }

          .stock-meta {
            flex-wrap: wrap;
            gap: 1.25rem;
          }

          .stock-cta {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>
    </Layout>
  );
}
