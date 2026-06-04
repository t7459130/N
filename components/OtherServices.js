import React from 'react';
import Layout from '../components/Layout';

const servicesData = [
  {
    id: 1,
    title: "Bespoke Financing",
    description: "Competitive financing options tailored to your needs. Flexible payment plans to suit your circumstances.",
    icon: "💳",
  },
  {
    id: 2,
    title: "Vehicle Trade-In",
    description: "Trade in your current vehicle for a premium valuation. We provide transparent, fair market assessments.",
    icon: "🔄",
  },
  {
    id: 3,
    title: "Specialist Maintenance",
    description: "Expert servicing and maintenance for your luxury vehicle. Keep your investment in pristine condition.",
    icon: "🔧",
  },
  {
    id: 4,
    title: "Insurance Guidance",
    description: "Connect with specialists who understand luxury vehicle insurance. We work with premium providers.",
    icon: "🛡️",
  },
  {
    id: 5,
    title: "Extended Warranty",
    description: "Comprehensive warranty protection for peace of mind. Protect your investment with extended coverage.",
    icon: "✓",
  },
];

const OtherServices = () => {
  return (
    <div className="services-page">
      <div className="services-header">
        <h1>Our Services</h1>
        <p>Premium support services tailored to luxury vehicle ownership</p>
      </div>

      <div className="services-container">
        <div className="services-grid">
          {servicesData.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function OtherServicesPage() {
  return (
    <Layout>
      <OtherServices />
    </Layout>
  );
}