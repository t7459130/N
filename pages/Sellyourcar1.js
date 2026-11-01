import React, { useState } from 'react';
import Layout from '../components/Layout';

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

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setFormData({
        firstName: '',
        lastName: '',
        title: '',
        make: '',
        model: '',
        year: '',
        description: ''
      });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="sell-page">
      <div className="sell-header">
        <h1>Sell Your Vehicle</h1>
        <p>Join our selective clients who've trusted us with their luxury vehicles</p>
      </div>

      <div className="sell-container">
        <div className="sell-intro">
          <p>
            Selling your vehicle to us is straightforward and rewarding. We accept premium supercars, 
            luxury SUVs, and prestige vehicles. Whether you want cash, financing, or part exchange, 
            our team will provide a fair valuation and seamless transaction.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="sell-form">
          <div className="form-section">
            <h3>Your Details</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label>Title</label>
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
                  <option value="Mr">Mr</option>
                  <option value="Mrs">Mrs</option>
                  <option value="Ms">Ms</option>
                </select>
              </div>

              <div className="form-group">
                <label>First Name</label>
                <input 
                  type="text" 
                  name="firstName" 
                  value={formData.firstName} 
                  onChange={handleChange} 
                  required 
                />
              </div>

              <div className="form-group">
                <label>Last Name</label>
                <input 
                  type="text" 
                  name="lastName" 
                  value={formData.lastName} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Vehicle Details</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label>Make</label>
                <input 
                  type="text" 
                  name="make" 
                  value={formData.make} 
                  onChange={handleChange} 
                  placeholder="e.g., Ferrari"
                  required 
                />
              </div>

              <div className="form-group">
                <label>Model</label>
                <input 
                  type="text" 
                  name="model" 
                  value={formData.model} 
                  onChange={handleChange} 
                  placeholder="e.g., F8 Tributo"
                  required 
                />
              </div>

              <div className="form-group">
                <label>Year</label>
                <input 
                  type="number" 
                  name="year" 
                  value={formData.year} 
                  onChange={handleChange} 
                  placeholder="e.g., 2023"
                  required 
                />
              </div>
            </div>

            <div className="form-group full-width">
              <label>Additional Information</label>
              <textarea 
                name="description" 
                value={formData.description} 
                onChange={handleChange} 
                placeholder="Provide details about your vehicle's condition, mileage, service history, and any special features..."
                rows="6"
                required 
              />
            </div>
          </div>

          {submitted && (
            <div className="success-message">
              ✓ Thank you! We've received your submission and will be in touch shortly.
            </div>
          )}

          <button type="submit" className="submit-button">
            {submitted ? 'Submitted' : 'Submit Vehicle Details'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default function SellYourCarPage() {
  return (
    <Layout>
      <SellYourCar />
    </Layout>
  );
}