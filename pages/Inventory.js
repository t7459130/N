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
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
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

      <style jsx>{`
        .stock-page {
          background: #ffffff;
          color: #1a1a1a;
          padding: 2.5rem 2rem 4rem;
          font-family: 'Poppins', -apple-system, BlinkMacSystemFont, sans-serif;
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
        }

        .view-full-stock {
          display: block;
          width: 100%;
          background: none;
          border: 1px solid #111;
          border-radius: 2px;
          padding: 0.9rem 1rem;
          font-size: 0.82rem;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #111;
          cursor: pointer;
          margin-bottom: 2rem;
          transition: background 0.2s ease, color 0.2s ease;
        }

        .view-full-stock:hover {
          background: #111;
          color: #fff;
        }

        .view-full-stock.inline {
          width: auto;
          display: inline-block;
          margin: 1rem 0 0;
          padding: 0.75rem 1.75rem;
        }

        .filter-block + .filter-block {
          margin-top: 2rem;
        }

        .filter-block h3 {
          font-size: 0.95rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #111;
          margin: 0 0 1rem;
        }

        .filter-columns {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0 0.5rem;
        }

        .filter-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
        }

        .filter-item {
          background: none;
          border: none;
          padding: 0;
          font-size: 0.88rem;
          color: #444;
          cursor: pointer;
          text-align: left;
          transition: color 0.15s ease;
        }

        .filter-item:hover {
          color: #000;
        }

        .filter-item.active {
          font-weight: 700;
          color: #000;
          text-decoration: underline;
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
        }

        .stock-row {
          display: flex;
          gap: 2.5rem;
          align-items: flex-start;
          padding: 2.5rem 0;
          border-bottom: 1px solid #e5e5e5;
          text-decoration: none;
          color: inherit;
          transition: opacity 0.2s ease;
        }

        .stock-list a.stock-row:first-child {
          padding-top: 0;
        }

        .stock-row:hover {
          opacity: 0.92;
        }

        .stock-image {
          flex: 0 0 400px;
          aspect-ratio: 4 / 3;
          background: #f5f5f5;
          overflow: hidden;
        }

        .stock-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .stock-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .info-title-row {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #ddd;
          margin-bottom: 1.75rem;
        }

        .info-title-row h3 {
          font-size: 1.3rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin: 0;
          color: #1a1a1a;
        }

        .info-price {
          font-size: 1rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: #333;
          white-space: nowrap;
        }

        .spec-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .spec-row {
          display: flex;
          align-items: baseline;
          gap: 0.6rem;
        }

        .spec-label {
          text-transform: uppercase;
          letter-spacing: 1px;
          font-size: 0.78rem;
          font-weight: 600;
          color: #999;
          width: 80px;
          flex-shrink: 0;
        }

        .spec-value {
          font-size: 1rem;
          color: #222;
        }

        .spec-row-cta {
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .spec-row-inner {
          display: flex;
          align-items: baseline;
          gap: 0.6rem;
        }

        .stock-cta {
          flex-shrink: 0;
          padding: 0.95rem 2.5rem;
          background: #111;
          border-radius: 2px;
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #fff;
          white-space: nowrap;
          transition: background 0.2s ease;
        }

        .stock-row:hover .stock-cta {
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

          .stock-row {
            flex-direction: column;
          }

          .stock-image {
            flex: 0 0 auto;
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .stock-page {
            padding: 1.5rem 1rem 3rem;
          }

          .filter-columns {
            grid-template-columns: 1fr;
            gap: 0.6rem 0;
          }

          .spec-row-cta {
            flex-direction: column;
            align-items: flex-start;
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
