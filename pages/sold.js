import React, { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import Layout from '../components/Layout';
import { AdminProvider, useAdmin } from '../components/AdminContext';

/* ==========================================================================
   SOLD VEHICLE PROFILES
   --------------------------------------------------------------------
   /api/sold-images reads every photo in public/header and returns them
   as a flat list of URLs, with no car data attached. Every photo in that
   folder is a real camera file named IMG_<number>.<ext> (some with a
   " - Copy" or " (1)" suffix from duplicate saves) — the number itself is
   sequential from the camera roll, so instead of assuming a fixed photo
   COUNT per car and slicing the array by position (fragile: any stray,
   missing, or duplicate file anywhere in the folder shifts every position
   after it, and silently mixes cars together), each car below is defined
   by the actual IMG-number RANGE its photos fall in. Every photo is bucketed
   into whichever car's range contains its number, wherever it happens to
   land in the array. This only breaks if a photo's number itself falls
   outside every listed range (it lands in "Recently Sold" as a catch-all)
   or two cars' number ranges genuinely overlap (they don't, below).

      1. Mercedes-Benz 350 SL (R107)          — IMG_5749 to IMG_5850
      2. Bentley Bentayga First Edition       — IMG_5875 to IMG_5941
      3. Mercedes-Benz SLK (R172 AMG Sport)   — IMG_5945 to IMG_6362
      4. Ferrari F40                          — IMG_6363 to IMG_6685
      5. Bentley Continental GTC              — IMG_6687 to IMG_6770
      6. Range Rover Evoque HSE               — IMG_6801 to IMG_6964
      7. BMW 1 Series M135i                   — IMG_7127 to IMG_7199
      8. Aston Martin Vanquish S              — IMG_7211 to IMG_7401
      9. Mercedes-Benz SLK (second example)   — IMG_7511 to IMG_7552
     10. Ferrari F40 (second example)         — IMG_7562 to IMG_7703
     11. Mercedes-Benz A-Class AMG Line       — IMG_7779 to IMG_7862

   If you add a new car's photos to public/header, add a new entry below
   with its own IMG-number range (check the actual filenames first) rather
   than just dropping the files in — otherwise they'll fall through to the
   generic "Recently Sold" catch-all at the end of the list.
========================================================================== */
const SOLD_VEHICLES = [
  {
    id: 'mercedes-350sl',
    range: [5749, 5850],
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
    range: [5875, 5941],
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
    range: [5945, 6362],
    make: 'Mercedes-Benz',
    model: 'SLK',
    generation: 'R172, AMG Sport',
    bodyStyle: 'Convertible',
    colour: 'Silver with Black interior',
    description:
      'A striking SLK finished in silver with AMG Sport styling and sports alloy wheels, paired with a folding retractable hardtop for effortless open-top driving.',
  },
  {
    id: 'ferrari-f40',
    range: [6363, 6685],
    make: 'Ferrari',
    model: 'F40',
    generation: '',
    bodyStyle: 'Coupe',
    colour: 'Rosso Corsa Red',
    description:
      "An icon of the supercar world. This F40 features factory Sabelt racing harnesses, bare composite door cards, a gated manual shifter and its twin-turbocharged V8 on show under the rear clamshell, finished in the marque's signature Rosso Corsa red.",
  },
  {
    id: 'bentley-continental-gtc',
    range: [6687, 6770],
    make: 'Bentley',
    model: 'Continental GTC',
    generation: 'W12',
    bodyStyle: 'Convertible',
    colour: 'Anthracite Grey with Cream leather',
    description:
      'A commanding Continental GTC finished in anthracite grey over cream leather, powered by the effortless twin-turbocharged W12 and equipped with a fully lined fabric roof for refined open-top touring.',
  },
  {
    id: 'range-rover-evoque-hse',
    range: [6801, 6964],
    make: 'Land Rover',
    model: 'Range Rover Evoque',
    generation: 'HSE',
    bodyStyle: 'SUV',
    colour: 'Corris Grey',
    description:
      'A five-door Evoque in HSE specification, finished in Corris Grey with the distinctive coupe-like roofline, machined alloy wheels and premium interior trim the model is known for.',
  },
  {
    id: 'bmw-1-series-m135i',
    range: [7127, 7199],
    make: 'BMW',
    model: '1 Series',
    generation: 'M135i',
    bodyStyle: 'Hatchback',
    colour: 'Black Sapphire',
    description:
      'A pocket-rocket M135i finished in Black Sapphire, with M Sport alloy wheels, uprated brake calipers and the turbocharged six-cylinder performance that made this generation of 1 Series famous.',
  },
  {
    id: 'aston-martin-vanquish-s',
    range: [7211, 7401],
    make: 'Aston Martin',
    model: 'Vanquish S',
    generation: '',
    bodyStyle: 'Coupe',
    colour: 'Silver metallic',
    description:
      "A striking Vanquish S in silver metallic, showcasing Aston Martin's hand-finished coupe styling, naturally-aspirated V12 power and the timeless wing badge front and rear.",
  },
  {
    id: 'mercedes-slk-second',
    range: [7511, 7552],
    make: 'Mercedes-Benz',
    model: 'SLK',
    generation: 'R172',
    bodyStyle: 'Convertible',
    colour: 'Silver with Black interior',
    description:
      'A second SLK example through our hands, finished in silver with black leather and a folding retractable hardtop — a well specified, sporty drop-top for every season.',
  },
  {
    id: 'ferrari-f40-second',
    range: [7562, 7703],
    make: 'Ferrari',
    model: 'F40',
    generation: '',
    bodyStyle: 'Coupe',
    colour: 'Rosso Corsa Red',
    description:
      'A further F40 through our hands, documented in detail from its Sabelt racing harnesses and gated manual shifter to its twin-turbocharged V8 with the engine cover raised — every inch as special as the model deserves.',
  },
  {
    id: 'mercedes-a-class-amg-line',
    range: [7779, 7862],
    make: 'Mercedes-Benz',
    model: 'A-Class',
    generation: 'AMG Line',
    bodyStyle: 'Hatchback',
    colour: 'Silver with Black AMG Line styling',
    description:
      'A sharp A-Class in AMG Line trim, finished in silver with black styling accents and alloy wheels, combining everyday practicality with genuine road presence.',
  },
];

// Pulls the camera roll number out of a filename like "/header/IMG_7527 (1).JPG"
// so we can bucket each photo by which car's IMG-number range it falls in,
// instead of relying on its position in the array (see the big comment above
// SOLD_VEHICLES for why position-based slicing was fragile).
function extractImgNumber(url) {
  const match = url.match(/IMG_?(\d+)/i);
  return match ? parseInt(match[1], 10) : null;
}

function buildSoldCars(images) {
  const used = new Set();
  const cars = [];

  for (const profile of SOLD_VEHICLES) {
    const [min, max] = profile.range;
    const carImages = images.filter((url) => {
      const num = extractImgNumber(url);
      return num !== null && num >= min && num <= max;
    });
    carImages.forEach((img) => used.add(img));
    if (carImages.length > 0) {
      cars.push({ ...profile, images: carImages });
    }
  }

  // Any photo whose number doesn't fall inside a listed range (e.g. a newly
  // added car nobody's added a range for yet) is shown as one extra entry
  // rather than being silently dropped, so nothing uploaded goes missing.
  const leftover = images.filter((url) => !used.has(url));
  if (leftover.length > 0) {
    cars.push({
      id: 'additional-sold',
      make: 'Recently Sold',
      model: 'Vehicle',
      generation: '',
      bodyStyle: '',
      colour: '',
      description: 'Delivered to a delighted client.',
      images: leftover,
    });
  }

  return cars;
}

// Split into two even columns for the sidebar's two-column filter lists
// (matches the pattern used on the Inventory page).
function splitInTwo(arr) {
  const mid = Math.ceil(arr.length / 2);
  return [arr.slice(0, mid), arr.slice(mid)];
}

function SoldContent() {
  const { isAdmin } = useAdmin();

  const [images, setImages] = useState([]);
  const [previewIndices, setPreviewIndices] = useState({});
  const [selectedMakes, setSelectedMakes] = useState([]);
  const [selectedBodyStyles, setSelectedBodyStyles] = useState([]);

  const getPreviewIndex = (carId) => previewIndices[carId] || 0;
  const setPreviewIndex = (carId, index) =>
    setPreviewIndices((prev) => ({ ...prev, [carId]: index }));

  // Load images — from the dedicated sold-photos endpoint (public/header),
  // NOT /api/wallpaper-images, which serves the homepage hero carousel from
  // a different folder and was showing unrelated photos here.
  useEffect(() => {
    fetch('/api/sold-images')
      .then((res) => res.json())
      .then((data) => setImages(Array.isArray(data) ? data : []))
      .catch(() => setImages([]));
  }, []);

  const soldCars = useMemo(() => buildSoldCars(images), [images]);

  const makes = useMemo(() => {
    const set = new Set();
    soldCars.forEach((c) => c.make && set.add(c.make));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [soldCars]);

  const bodyStyles = useMemo(() => {
    const set = new Set();
    soldCars.forEach((c) => c.bodyStyle && set.add(c.bodyStyle));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [soldCars]);

  const toggleMake = (make) => {
    setSelectedMakes((prev) =>
      prev.includes(make) ? prev.filter((m) => m !== make) : [...prev, make]
    );
  };

  const toggleBodyStyle = (style) => {
    setSelectedBodyStyles((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]
    );
  };

  const clearFilters = () => {
    setSelectedMakes([]);
    setSelectedBodyStyles([]);
  };

  const filteredCars = useMemo(() => {
    return soldCars.filter((c) => {
      const makeOk = selectedMakes.length === 0 || selectedMakes.includes(c.make);
      const styleOk =
        selectedBodyStyles.length === 0 || selectedBodyStyles.includes(c.bodyStyle);
      return makeOk && styleOk;
    });
  }, [soldCars, selectedMakes, selectedBodyStyles]);

  const [makeColA, makeColB] = splitInTwo(makes);
  const [styleColA, styleColB] = splitInTwo(bodyStyles);

  return (
    <Layout>
      <Head>
        <title>Previously Sold Vehicles</title>
      </Head>

      <div className="stock-page">
        <div className="stock-layout">
          <aside className="stock-sidebar">
            <button type="button" className="view-full-stock" onClick={clearFilters}>
              View All Sold Vehicles
            </button>

            <div className="filter-block">
              <h3>Search By Manufacturer</h3>
              <div className="filter-columns">
                <ul className="filter-list">
                  {makeColA.map((make) => (
                    <li key={make}>
                      <button
                        type="button"
                        className={`filter-item${selectedMakes.includes(make) ? ' active' : ''}`}
                        onClick={() => toggleMake(make)}
                      >
                        {make}
                      </button>
                    </li>
                  ))}
                </ul>
                <ul className="filter-list">
                  {makeColB.map((make) => (
                    <li key={make}>
                      <button
                        type="button"
                        className={`filter-item${selectedMakes.includes(make) ? ' active' : ''}`}
                        onClick={() => toggleMake(make)}
                      >
                        {make}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {bodyStyles.length > 0 && (
              <div className="filter-block">
                <h3>Search By Bodystyle</h3>
                <div className="filter-columns">
                  <ul className="filter-list">
                    {styleColA.map((style) => (
                      <li key={style}>
                        <button
                          type="button"
                          className={`filter-item${selectedBodyStyles.includes(style) ? ' active' : ''}`}
                          onClick={() => toggleBodyStyle(style)}
                        >
                          {style}
                        </button>
                      </li>
                    ))}
                  </ul>
                  <ul className="filter-list">
                    {styleColB.map((style) => (
                      <li key={style}>
                        <button
                          type="button"
                          className={`filter-item${selectedBodyStyles.includes(style) ? ' active' : ''}`}
                          onClick={() => toggleBodyStyle(style)}
                        >
                          {style}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </aside>

          <div className="stock-main">
            <div className="stock-toolbar">
              <span className="result-count">
                {images.length === 0 ? '' : `${filteredCars.length} sold`}
              </span>
            </div>

            {images.length === 0 ? (
              <div className="loading">Loading sold vehicles...</div>
            ) : filteredCars.length === 0 ? (
              <div className="no-vehicles">
                <p>No sold vehicles match your current filters</p>
                <button type="button" className="view-full-stock inline" onClick={clearFilters}>
                  View All Sold Vehicles
                </button>
              </div>
            ) : (
              <div className="stock-list">
                {filteredCars.map((car) => (
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
                        <span className="info-price">SOLD</span>
                      </div>

                      <div className="spec-list">
                        {car.generation && (
                          <div className="spec-row">
                            <span className="spec-label">Spec:</span>
                            <span className="spec-value">{car.generation}</span>
                          </div>
                        )}
                        {car.bodyStyle && (
                          <div className="spec-row">
                            <span className="spec-label">Body:</span>
                            <span className="spec-value">{car.bodyStyle}</span>
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
                ))}
              </div>
            )}
          </div>
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