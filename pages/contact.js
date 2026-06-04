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
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setEmail('');
      setSubmitted(false);
    }, 2000);
  };

  return (
    <div className="contact-page">

      {/* HERO SECTION */}
      <div className="contact-hero">
        <div className="overlay" />

        <div className="hero-content">
          <h1>
            <Typewriter text="Excellence in Motion" speed={50} />
          </h1>

          <p>
            <Typewriter text="A curated automotive experience inspired by Rolls-Royce craftsmanship." speed={40} />
          </p>
        </div>
      </div>

      {/* CONTACT DETAILS */}
      <section className="contact-section">
        <div className="contact-container">
          <h2>Get In Touch</h2>

          <p className="contact-intro">
            If you have any enquiries about our vehicles, inventory, or services,
            our team is here to assist you with premium customer care.
          </p>

          <div className="contact-grid">
            <div className="contact-card">
              <h3>📧 Email</h3>
              <p>
                <a href="mailto:surreyexotics@gmail.com">surreyexotics@gmail.com</a>
              </p>
            </div>

            <div className="contact-card">
              <h3>📞 Phone</h3>
              <p>
                <a href="tel:+447826456793">+44 7826 456793</a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MAILING LIST */}
      <section className="contact-section dark">
        <div className="contact-container">
          <h2>Private Inventory Access</h2>
          <p className="contact-intro">
            Join our exclusive mailing list to receive updates on rare vehicles and private collection drops.
          </p>

          <form onSubmit={handleSubmit} className="mailing-form">
            <div className="form-group">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="submit-btn">
                {submitted ? '✓ Subscribed' : 'Subscribe'}
              </button>
            </div>
          </form>

          {submitted && (
            <p className="success-message">Thank you for subscribing to our private list.</p>
          )}
        </div>
      </section>
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