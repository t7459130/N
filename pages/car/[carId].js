// pages/car/[carId].js
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
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

  if (loading) return <p>Loading...</p>;
  if (notFound || !car) return <p>Car not found</p>;

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % car.images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? car.images.length - 1 : prev - 1
    );
  };

  return (
    <div className="detail-page">
      <div className="car-image-viewer">
        <button className="nav-arrow left" onClick={prevImage}>
          <FaChevronLeft size={30} />
        </button>
        <img src={car.images[currentIndex]} alt={`${car.make} ${car.model}`} />
        <button className="nav-arrow right" onClick={nextImage}>
          <FaChevronRight size={30} />
        </button>
      </div>

      <div className="thumb-strip-wrap" style={{ margin: '0.75rem 0 0' }}>
        <ThumbnailStrip
          images={car.images}
          currentIndex={currentIndex}
          onSelect={setCurrentIndex}
          visibleCount={7}
          theme="dark"
        />
      </div>

      <div className="car-details-block">
        <h2>
          {car.year} {car.make} {car.model} {car.variant && `- ${car.variant}`}
        </h2>
        <p><strong>Price:</strong> £{car.price}</p>
        <p><strong>Transmission:</strong> {car.transmission}</p>
        <p><strong>Fuel Type:</strong> {car.fuelType}</p>
        <p><strong>Mileage:</strong> {car.mileage}</p>
        <p><strong>Body Style:</strong> {car.bodyStyle}</p>
        <p><strong>Colour:</strong> {car.colour}</p>
        <p><strong>Engine Size:</strong> {car.engineSize}</p>
        <p><strong>Fuel Economy:</strong> {car.fuelEconomy}</p>
        <div className="description">
          <h3>Description</h3>
          <p>{car.description}</p>
        </div>
      </div>
    </div>
  );
}

export default CarDetail;
