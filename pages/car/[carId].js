// pages/car/[carId].js
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Layout from '../../components/Layout';
import ThumbnailStrip from '../../components/ThumbnailStrip';

function CarDetail() {
  const router = useRouter();
  const { carId } = router.query;

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!carId) return; // router.query isn't populated yet on first render

    setLoading(true);
    setNotFound(false);
    setCurrentIndex(0);

    fetch(`/api/cars/${carId}`)
      .then((res) => {
        if (!res.ok) throw new Error('not found');
        return res.json();
      })
      .then((data) => setCar(data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [carId]);

  const nextImage = () => {
    if (!car) return;
    setCurrentIndex((prev) => (prev + 1) % car.images.length);
  };

  const prevImage = () => {
    if (!car) return;
    setCurrentIndex((prev) =>
      prev === 0 ? car.images.length - 1 : prev - 1
    );
  };

  return (
    <Layout>
      <div className="car-detail-page">
        {loading ? (
          <p className="status-text">Loading...</p>
        ) : notFound || !car ? (
          <p className="status-text">Car not found</p>
        ) : (
          <div className="detail-grid">
            <div className="gallery-col">
              <div className="main-image-frame">
                <button
                  type="button"
                  className="nav-arrow left"
                  onClick={prevImage}
                  aria-label="Previous image"
                >
                  <FaChevronLeft size={22} />
                </button>

                <img src={car.images[currentIndex]} alt={`${car.make} ${car.model}`} />

                <button
                  type="button"
                  className="nav-arrow right"
                  onClick={nextImage}
                  aria-label="Next image"
                >
                  <FaChevronRight size={22} />
                </button>
              </div>

              <div className="thumb-wrap">
                <ThumbnailStrip
                  images={car.images}
                  currentIndex={currentIndex}
                  onSelect={setCurrentIndex}
                  visibleCount={7}
                  theme="dark"
                />
              </div>
            </div>

            <div className="info-col">
              <h1>
                {car.year} {car.make} {car.model}
                {car.variant && <span className="variant"> - {car.variant}</span>}
              </h1>

              <p className="price">£{Number(car.price).toLocaleString()}</p>

              <div className="spec-grid">
                <div className="spec">
                  <span className="label">Transmission</span>
                  <span className="value">{car.transmission || '—'}</span>
                </div>
                <div className="spec">
                  <span className="label">Fuel Type</span>
                  <span className="value">{car.fuelType || '—'}</span>
                </div>
                <div className="spec">
                  <span className="label">Mileage</span>
                  <span className="value">
                    {car.mileage != null ? `${Number(car.mileage).toLocaleString()} mi` : '—'}
                  </span>
                </div>
                <div className="spec">
                  <span className="label">Body Style</span>
                  <span className="value">{car.bodyStyle || '—'}</span>
                </div>
                <div className="spec">
                  <span className="label">Colour</span>
                  <span className="value">{car.colour || '—'}</span>
                </div>
                <div className="spec">
                  <span className="label">Engine Size</span>
                  <span className="value">{car.engineSize || '—'}</span>
                </div>
                <div className="spec full">
                  <span className="label">Fuel Economy</span>
                  <span className="value">{car.fuelEconomy || '—'}</span>
                </div>
              </div>

              {car.description && (
                <div className="description">
                  <h3>Description</h3>
                  <p>{car.description}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .car-detail-page {
          min-height: 60vh;
          padding: 3rem 2rem;
          background: linear-gradient(135deg, #000000 0%, #000000 100%);
        }

        .status-text {
          text-align: center;
          color: #b0b0b0;
          font-size: 1.1rem;
          padding: 4rem 0;
        }

        .detail-grid {
          max-width: 1300px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.3fr 1fr;
          gap: 3rem;
          align-items: start;
        }

        .gallery-col {
          display: flex;
          flex-direction: column;
        }

        .main-image-frame {
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid #2a2f4a;
          background: #000;
        }

        .main-image-frame img {
          width: 100%;
          height: 480px;
          object-fit: cover;
          display: block;
        }

        .nav-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.55);
          border: 1px solid #2a2f4a;
          color: #f5f5f5;
          width: 46px;
          height: 46px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.3s ease, color 0.3s ease, border-color 0.3s ease;
        }

        .nav-arrow.left {
          left: 1rem;
        }

        .nav-arrow.right {
          right: 1rem;
        }

        .nav-arrow:hover {
          background: rgba(0, 0, 0, 0.8);
          color: #c9a961;
          border-color: #c9a961;
        }

        .thumb-wrap {
          margin-top: 1rem;
        }

        .info-col {
          background: #000000;
          border: 1px solid #2a2f4a;
          border-radius: 8px;
          padding: 2rem;
        }

        .info-col h1 {
          font-family: 'Playfair Display', serif;
          font-size: 1.8rem;
          font-weight: 700;
          color: #f5f5f5;
          margin-bottom: 0.5rem;
          line-height: 1.3;
        }

        .variant {
          color: #b0b0b0;
          font-weight: 400;
        }

        .price {
          font-family: 'Playfair Display', serif;
          font-size: 1.8rem;
          font-weight: 700;
          color: #c9a961;
          margin-bottom: 1.5rem;
        }

        .spec-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.25rem;
          padding-top: 1.5rem;
          border-top: 1px solid #2a2f4a;
          margin-bottom: 1.5rem;
        }

        .spec.full {
          grid-column: 1 / -1;
        }

        .spec {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .spec .label {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #b0b0b0;
        }

        .spec .value {
          font-size: 1rem;
          font-weight: 600;
          color: #f5f5f5;
        }

        .description {
          padding-top: 1.5rem;
          border-top: 1px solid #2a2f4a;
        }

        .description h3 {
          font-family: 'Playfair Display', serif;
          font-size: 1.2rem;
          font-weight: 700;
          color: #c9a961;
          margin-bottom: 0.75rem;
        }

        .description p {
          color: #b0b0b0;
          line-height: 1.8;
          font-size: 0.95rem;
        }

        @media (max-width: 900px) {
          .detail-grid {
            grid-template-columns: 1fr;
          }

          .main-image-frame img {
            height: 320px;
          }
        }

        @media (max-width: 480px) {
          .car-detail-page {
            padding: 1.5rem 1rem;
          }

          .info-col {
            padding: 1.25rem;
          }

          .spec-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </Layout>
  );
}

export default CarDetail;
