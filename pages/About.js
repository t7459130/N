import { useEffect, useState } from 'react';
import Layout from '../components/Layout';

export default function About() {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    fetch('/api/wallpaper')
      .then((res) => res.json())
      .then(setImages)
      .catch(() => setImages([]));
  }, []);

  useEffect(() => {
    if (!images.length) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [images]);

  return (
    <Layout>
      <section className="about-hero">
        <div
          className="about-bg"
          style={{
            backgroundImage: `url(${images[index] || ''})`,
          }}
        />

        <div className="about-overlay" />

        <div className="about-content">
          <h1>About Us</h1>

          <p>
            Luxury car dealership built on passion, precision and performance.
          </p>

          <p>
            We specialise in supercars, prestige vehicles and collector-grade stock sourced across the UK and Europe.
          </p>

          <p>
            Every vehicle is hand-selected for quality, provenance and presentation.
          </p>
        </div>
      </section>
    </Layout>
  );
}