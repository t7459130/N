import { useState } from 'react';
import Layout from '../components/Layout';

export default function SellYourCar() {
  const [form, setForm] = useState({});

  return (
    <Layout>
      <div className="page">

        <h1>Sell Your Car</h1>

        <input placeholder="Make" />
        <input placeholder="Model" />
        <input placeholder="Year" />

        <textarea placeholder="Description" />

        <button>Submit</button>

      </div>
    </Layout>
  );
}