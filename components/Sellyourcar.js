// src/SellYourCar.js

import React, { useState } from 'react';

const SellYourCar = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    title: '',
    make: '',
    model: '',
    year: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here, like sending the data to your server or API
    console.log('Form submitted:', formData);
  };

  return (
    <div className="sell-your-car">
      <h2>Sell Your Car</h2>
      <p>
        Selling your car to us is simple and rewarding! We accept various types of vehicles, whether you want cash, financing, or a part exchange. Our team is here to provide you with a fair offer and a smooth transaction process.
      </p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input 
            type="text" 
            name="firstName" 
            value={formData.firstName} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input 
            type="text" 
            name="lastName" 
            value={formData.lastName} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label>Title:</label>
          <select 
            name="title" 
            value={formData.title} 
            onChange={handleChange}
            required
          >
            <option value="">Select Title</option>
            <option value="Dr">Dr</option>
            <option value="Lord">Lord</option>
            <option value="Prof">Prof</option>
            <option value="Mst">Mst</option>
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
            <option value="Ms">Ms</option>
          </select>
        </div>
        <div>
          <label>Make:</label>
          <input 
            type="text" 
            name="make" 
            value={formData.make} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label>Model:</label>
          <input 
            type="text" 
            name="model" 
            value={formData.model} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label>Year:</label>
          <input 
            type="number" 
            name="year" 
            value={formData.year} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            required 
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SellYourCar;
