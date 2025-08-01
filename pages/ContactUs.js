// src/ContactUs.js
import React, { useState } from 'react';

const ContactUs = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle email subscription logic here
    alert(`Subscribed with email: ${email}`);
    setEmail(''); // Clear the input field after submission
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

export default ContactUs;
