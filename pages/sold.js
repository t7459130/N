import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import { AdminProvider, useAdmin } from '../components/AdminContext';

/* ==========================================================================
   SOLD VEHICLE PROFILES
   --------------------------------------------------------------------
   /api/wallpaper-images returns a flat list of photo URLs with no car
   data attached to them. These profiles were written by looking at the
   actual photos you sent us, in upload order, and group them back into
   the individual cars they show:

     1. Mercedes-Benz 350 SL (R107)        — 11 photos
     2. Bentley Bentayga First Edition     — 23 photos
     3. Mercedes-Benz SLK (R172 AMG Sport) — 22 photos (incl. 1 badge shot)
     4. Ferrari F40                        — 26 photos
                                     Total:   82 photos

   IMPORTANT: this only groups correctly if /api/wallpaper-images keeps
   returning photos in that same order. If you add more sold photos, add
   a new entry below (or bump a `count`) to match — otherwise the photo
   counts will drift out of sync with the cars they belong to.
========================================================================== */
const SOLD_VEHICLES = [
  {
    id: 'mercedes-350sl',
    count: 11,
    make: 'Mercedes-Benz',
    model: '350 SL',
    generation: 'R107',
    bodyStyle: 'Convertible',
    colour: 'White with Blue leather',
    description:
      'A beautifully preserved R107-generation 350 SL, finished in white over blue leather with its classic wood-trimmed dashboard, sports seats and factory alloy wheels — a true modern-classic convertible.',
  },
  {
    id: 'bentley-bentayga-first-edition',
    count: 23,
    make: 'Bentley',
    model: 'Bentayga',
    generation: 'First Edition',
    bodyStyle: 'SUV',
    colour: 'Black with Cognac leather',
    description:
      'One of the exclusive First Edition specification Bentaygas, finished in black with quilted cognac leather, dark wood veneers, a panoramic sunroof and rear-seat entertainment screens throughout.',
  },
  {
    id: 'mercedes-slk-amg-sport',
    count: 22,
    make: 'Mercedes-Benz',
    model: 'SLK',
    generation: 'R172, AMG Sport',
    bodyStyle: 'Retractable Hardtop Convertible',
    colour: 'Silver with Black interior',
    description:
      'A striking SLK finished in silver with AMG Sport styling and sports alloy wheels, paired with a folding retractable hardtop for effortless open-top driving.',
  },
  {
    id: 'ferrari-f40',
    count: 26,
    make: 'Ferrari',
    model: 'F40',
    generation: '',
    bodyStyle: 'Coupe',
    colour: 'Rosso Corsa Red',
    description:
      "An icon of the supercar world. This F40 features factory Sabelt racing harnesses, bare composite door cards, a gated manual shifter and its twin-turbocharged V8 on show under the rear clamshell, finished in the marque's signature Rosso Corsa red.",
  },
];

function buildSoldCars(images) {
  const cars = [];
  let cursor = 0;

  for (const profile of SOLD_VEHICLES) {
    const carImages = images.slice(cursor, cursor + profile.count);
    cursor += profile.count;
    if (carImages.length > 0) {
      cars.push({ ...profile, images: carImages });
    }
  }

  // Any photos beyond the profiles above are shown as one extra entry
  // rather than being silently dropped, so nothing uploaded goes missing.
  if (cursor < images.length) {
    cars.push({
      id: 'additional-sold',
      make: 'Recently Sold',
      model: 'Vehicle',
      generation: '',
      bodyStyle: '',
      colour: '',
      description: 'Delivered to a delighted client.',
      images: images.slice(cursor),
    });
  }

  return cars;
}

function SoldContent() {
  const { isAdmin } = useAdmin();

  const [images, setImages] = useState([]);
  const [previewIndices, setPreviewIndices] = useState({});

  const getPreviewIndex = (carId) => previewIndices[carId] || 0;
  const setPreviewIndex = (carId, index) =>
    setPreviewIndices((prev) => ({ ...prev, [carId]: index }));

  // Load images
  useEffect(() => {
    fetch('/api/wallpaper-images')
      .then((res) => res.json())
      .then((data) => setImages(Array.isArray(data) ? data : []))
      .catch(() => setImages([]));
  }, []);

  const soldCars = buildSoldCars(images);

  return (
    <Layout>
      <Head>
        <title>Previously Sold Vehicles</title>
      </Head>

      {/* HEADER */}
      <div className="inventory-header">
        <h1>Previously Sold</h1>
        <p>Luxury vehicles delivered across the UK and internationally</p>
      </div>

      {/* SOLD LIST - one panel per vehicle, matching the Inventory layout */}
      <div className="stock-page">
        <div className="stock-list">
          {images.length === 0 ? (
            <div className="no-vehicles">
              <p>Loading sold vehicles...</p>
            </div>
          ) : (
            soldCars.map((car) => (
              <div key={car.id} className="stock-row sold-row">
                <div className="stock-image">
                  <img
                    src={car.images[getPreviewIndex(car.id)] || car.images[0]}
                    alt={`${car.make} ${car.model}`}
                  />
                  <div className="price-tag sold-tag">SOLD</div>
                </div>

                <div className="stock-info">
                  <div className="info-title-row">
                    <h3>{car.make} {car.model}</h3>
                    {car.bodyStyle && <span className="info-price">{car.bodyStyle}</span>}
                  </div>

                  <div className="spec-list">
                    {car.generation && (
                      <div className="spec-row">
                        <span className="spec-label">Spec:</span>
                        <span className="spec-value">{car.generation}</span>
                      </div>
                    )}
                    {car.colour && (
                      <div className="spec-row">
                        <span className="spec-label">Colour:</span>
                        <span className="spec-value">{car.colour}</span>
                      </div>
                    )}
                    <div className="spec-row">
                      <span className="spec-label">Notes:</span>
                      <span className="spec-value">{car.description}</span>
                    </div>
                  </div>

                  {car.images.length > 1 && (
                    <div className="sold-thumbs">
                      {car.images.map((img, i) => (
                        <button
                          key={i}
                          type="button"
                          className={`sold-thumb${i === getPreviewIndex(car.id) ? ' active' : ''}`}
                          onClick={() => setPreviewIndex(car.id, i)}
                          aria-label={`View photo ${i + 1} of ${car.make} ${car.model}`}
                        >
                          <img src={img} alt="" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* FOOTER */}
      <footer>
        <p>Nabil's Surrey Supercars • Surrey, England • +44 7826 456793</p>
        <p>&copy; 2025 All Rights Reserved</p>
      </footer>
    </Layout>
  );
}

export default function SoldPage() {
  return (
    <AdminProvider>
      <SoldContent />
    </AdminProvider>
  );
}