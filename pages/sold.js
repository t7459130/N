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
   sequential from the camera roll, so each car below is defined by the
   actual IMG-number RANGE its photos fall in, and every photo is bucketed
   into whichever car's range contains its number (see buildSoldCars below).
   This is immune to the array's order or to stray/duplicate files elsewhere
   in the folder — it only breaks if a photo's number falls outside every
   listed range (it lands in "Recently Sold" as a catch-all) or two ranges
   genuinely overlap (they don't, below).

   These 15 cars and their exact ranges were produced by opening every one
   of the 206 photos in public/header (via generated contact sheets) and
   visually identifying each vehicle in camera-roll order — replacing an
   earlier version of this file whose first four entries were carried over
   from an older, smaller photo set and never re-verified against this
   folder, which is why they showed the wrong photos.

      1.  Ferrari 488 GTB                     — IMG_5749 to IMG_5784
      2.  Bentley Mulsanne                    — IMG_5838 to IMG_5850
      3.  Mercedes-Benz 350 SL (R107)         — IMG_5875 to IMG_5908
      4.  Bentley Bentayga First Edition      — IMG_5910 to IMG_5971
      5.  Porsche 911 (classic)               — IMG_5978 to IMG_6001
      6.  Range Rover Sport                   — IMG_6288 to IMG_6365
      7.  Aston Martin DB6 (classic)          — IMG_6372 to IMG_6482
      8.  Jaguar XJ                           — IMG_6503 to IMG_6518
      9.  Bentley Continental GTC             — IMG_6636 to IMG_6770
     10.  Range Rover Evoque HSE              — IMG_6801 to IMG_6964
     11.  BMW 1 Series M135i                  — IMG_7127 to IMG_7199
     12.  Aston Martin Vanquish S             — IMG_7211 to IMG_7401
     13.  Mercedes-Benz SLK (R172)            — IMG_7511 to IMG_7552
     14.  Ferrari F40                         — IMG_7562 to IMG_7703
     15.  Mercedes-Benz A-Class AMG Line      — IMG_7779 to IMG_7862

   If you add a new car's photos to public/header, add a new entry below
   with its own IMG-number range (check the actual filenames first) rather
   than just dropping the files in — otherwise they'll fall through to the
   generic "Recently Sold" catch-all at the end of the list.
========================================================================== */
const SOLD_VEHICLES = [
  {
    id: 'ferrari-488-gtb',
    range: [5749, 5784],
    make: 'Ferrari',
    model: '488 GTB',
    generation: '',
    bodyStyle: 'Coupe',
    colour: 'Grigio Silverstone metallic',
    description:
      'A modern Ferrari icon, this 488 GTB combines a twin-turbocharged V8 with razor-sharp handling, finished in an understated silver-grey over yellow brake calipers and forged alloy wheels.',
  },
  {
    id: 'bentley-mulsanne',
    range: [5838, 5850],
    make: 'Bentley',
    model: 'Mulsanne',
    generation: '',
    bodyStyle: 'Saloon',
    colour: 'Black',
    description:
      'The flagship Bentley saloon, finished in black with its unmistakable matrix grille and presence to match — effortless, hand-built luxury motoring at its finest.',
  },
  {
    id: 'mercedes-350sl',
    range: [5875, 5908],
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
    range: [5910, 5971],
    make: 'Bentley',
    model: 'Bentayga',
    generation: 'First Edition',
    bodyStyle: 'SUV',
    colour: 'Black with Cognac leather',
    description:
      'One of the exclusive First Edition specification Bentaygas, finished in black with quilted cognac leather, dark wood veneers, a panoramic sunroof and rear-seat entertainment screens throughout.',
  },
  {
    id: 'porsche-911-classic',
    range: [5978, 6001],
    make: 'Porsche',
    model: '911',
    generation: 'Classic',
    bodyStyle: 'Convertible',
    colour: 'Green',
    description:
      'An air-cooled classic 911 finished in a striking green, with its removable targa top and timeless silhouette — as usable today as the day it left the factory.',
  },
  {
    id: 'range-rover-sport',
    range: [6288, 6365],
    make: 'Land Rover',
    model: 'Range Rover Sport',
    generation: '',
    bodyStyle: 'SUV',
    colour: 'White',
    description:
      'A commanding Range Rover Sport finished in white with dark alloy wheels, pairing everyday usability with genuine off-road capability and presence on the road.',
  },
  {
    id: 'aston-martin-db6',
    range: [6372, 6482],
    make: 'Aston Martin',
    model: 'DB6',
    generation: 'Classic',
    bodyStyle: 'Coupe',
    colour: 'Silver',
    description:
      'A beautifully sorted classic Aston Martin DB6, finished in silver with wire wheels, a wood-rimmed steering wheel and black leather interior — grand touring elegance from a golden era.',
  },
  {
    id: 'jaguar-xj',
    range: [6503, 6518],
    make: 'Jaguar',
    model: 'XJ',
    generation: '',
    bodyStyle: 'Saloon',
    colour: 'Silver',
    description:
      'A refined Jaguar XJ saloon finished in silver, combining effortless motorway comfort with the sporting character the badge is known for.',
  },
  {
    id: 'bentley-continental-gtc',
    range: [6636, 6770],
    make: 'Bentley',
    model: 'Continental GTC',
    generation: 'W12',
    bodyStyle: 'Convertible',
    colour: 'Anthracite Grey',
    description:
      'A commanding Continental GTC finished in anthracite grey, powered by the effortless twin-turbocharged W12 and equipped with a fully lined fabric roof for refined open-top touring.',
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
    id: 'mercedes-slk',
    range: [7511, 7552],
    make: 'Mercedes-Benz',
    model: 'SLK',
    generation: 'R172',
    bodyStyle: 'Convertible',
    colour: 'Silver with Black interior',
    description:
      'A striking SLK finished in silver with black leather and a folding retractable hardtop — a well specified, sporty drop-top for every season.',
  },
  {
    id: 'ferrari-f40',
    range: [7562, 7703],
    make: 'Ferrari',
    model: 'F40',
    generation: '',
    bodyStyle: 'Coupe',
    colour: 'Rosso Corsa Red',
    description:
      "An icon of the supercar world. This F40 features factory Sabelt racing harnesses, a gated manual shifter and its twin-turbocharged V8 on show under the rear clamshell, finished in the marque's signature Rosso Corsa red.",
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