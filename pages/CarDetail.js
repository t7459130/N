// CarDetail.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function CarDetail({ cars }) {
  const { carId } = useParams();
  const car = cars?.find((c) => String(c.id) === carId);

  const [currentIndex, setCurrentIndex] = useState(0);

  if (!car) return <p>Car not found</p>;

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
      {/* Top margin to clear header */}
      <div className="car-image-viewer">
        <button className="nav-arrow left" onClick={prevImage}>
          <FaChevronLeft size={30} />
        </button>
        <img src={car.images[currentIndex]} alt={`${car.make} ${car.model}`} />
        <button className="nav-arrow right" onClick={nextImage}>
          <FaChevronRight size={30} />
        </button>
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
