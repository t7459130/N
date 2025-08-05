// pages/contact.js (if this is a page, it should live in /pages directory)

import React, { useState } from 'react';
import Layout from '../components/Layout';

const ContactUs = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Subscribed with email: ${email}`);
    setEmail('');
  };

  return (
    <div className="contact-us">
      <h2>Contact Us</h2>
      <p>If you have any questions or inquiries, feel free to reach out to us!</p>
      <p>Email: info@cardealership.com</p>
      <p>Phone: (123) 456-7890</p>

      <h3>Mailing List Subscription</h3>
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
  );
};

// 👇 Wrap with Layout
export default function ContactPageWrapper() {
  return (
    <Layout>
      <ContactUs />
    </Layout>
  );
}
