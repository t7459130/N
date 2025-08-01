// src/Inventory.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

import car1 from './images/car1.jpg';  // Example car images
import car2 from './images/car2.jpg';
import car3 from './images/car3.jpg';

const carsInventory = [
  { id: 1, make: 'Tesla', model: 'Model S', year: 2021, price: '$80,000', image: car1, link: '/car1' },
  { id: 2, make: 'BMW', model: 'i8', year: 2020, price: '$120,000', image: car2, link: '/car2' },
  { id: 3, make: 'Audi', model: 'R8', year: 2019, price: '$150,000', image: car3, link: '/car3' },
  // Add more cars here if needed
];

const Inventory = () => {
  return (
    <div className="inventory">
      <h2>Our Inventory</h2>
      <div className="car-listings">
        {carsInventory.map((car) => (
          <div key={car.id} className="car-card">
            <Link to={car.link}>
              <img src={car.image} alt={`${car.make} ${car.model}`} />
            </Link>
            <div className="car-details">
              <h3>{car.year} {car.make} {car.model}</h3>
              <p>Price: {car.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Inventory;