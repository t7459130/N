import { useState } from 'react';
import Layout from '../components/Layout';

export default function Contact() {
  const [email, setEmail] = useState('');

  return (
    <Layout>
      <div className="page">

        <h1>Contact Us</h1>

        <p>Email: info@yourdealership.com</p>
        <p>Phone: 123-456-7890</p>

        <input
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
        />

        <button>Subscribe</button>

      </div>
    </Layout>
  );
}