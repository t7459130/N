import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';

const Typewriter = ({ text, speed = 60 }) => {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <span>{displayed}</span>;
};

const ContactUs = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Subscribed with email: ${email}`);
    setEmail('');
  };

  return (
    <div className="contact-page">

      {/* HERO SECTION */}
      <div className="contact-hero">
        <div className="overlay" />

        <div className="hero-content">
          <h1>
            <Typewriter text="Excellence in Motion" />
          </h1>

          <p>
            <Typewriter text="A curated automotive experience inspired by Rolls-Royce craftsmanship." />
          </p>
        </div>
      </div>

      {/* CONTACT DETAILS */}
      <div className="contact-section">
        <h2>Contact Us</h2>

        <p>
          If you have any enquiries about our vehicles, inventory, or services,
          our team is here to assist you.
        </p>

        <div className="contact-grid">
          <div className="contact-card">
            <h3>Email</h3>
            <p>surreyexotics@gmail.com</p>
          </div>

          <div className="contact-card">
            <h3>Phone</h3>
            <p>+44 7826 456793</p>
          </div>
        </div>
      </div>

      {/* MAILING LIST */}
      <div className="contact-section dark">
        <h2>Join Our Private List</h2>
        <p>Receive exclusive vehicle drops and private collection updates.</p>

        <form onSubmit={handleSubmit} className="mailing-form">
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </div>
  );
};

export default function ContactPageWrapper() {
  return (
    <Layout>
      <ContactUs />
    </Layout>
  );
}