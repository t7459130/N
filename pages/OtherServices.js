// src/OtherServices.js
import React from 'react';

const servicesData = [
  {
    id: 1,
    title: "Car Financing",
    description: "We offer competitive financing options to help you purchase your dream car with flexible payment plans.",
  },
  {
    id: 2,
    title: "Vehicle Trade-In",
    description: "Looking to trade in your old car? We provide fair market value assessments for your vehicle.",
  },
  {
    id: 3,
    title: "Car Maintenance",
    description: "Regular maintenance services to keep your vehicle in top condition, including oil changes, tire rotations, and more.",
  },
  {
    id: 4,
    title: "Insurance Assistance",
    description: "Get help finding the right insurance coverage for your vehicle. We work with multiple insurance providers.",
  },
  {
    id: 5,
    title: "Warranty Services",
    description: "Extended warranty options are available to protect your investment and provide peace of mind.",
  },
];

const OtherServices = () => {
  return (
    <div className="other-services">
      <h2>Other Services We Offer</h2>
      <div className="services-list">
        {servicesData.map((service) => (
          <div key={service.id} className="service-card">
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OtherServices;
