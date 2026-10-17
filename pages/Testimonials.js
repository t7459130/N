import React from 'react';
import Layout from '../components/Layout';

/* ==========================================================================
   SAMPLE REVIEWS - PLACEHOLDERS ONLY.
   These are made-up examples so you can see the layout. Replace every entry
   below with genuine reviews from real customers (with their permission)
   before the site goes live: publishing invented reviews as real ones is
   illegal in the UK. While SHOW_SAMPLE_LABEL is true each card shows a small
   "Sample review" tag; set it to false once the reviews are real.
========================================================================== */
const SHOW_SAMPLE_LABEL = false;

const testimonials = [
  {
    id: 1,
    name: 'James T.',
    location: 'Guildford',
    text: 'From the first phone call to collecting the keys, the whole experience was smooth and completely hassle-free. The car was exactly as described and presented immaculately. I could not recommend Titan Global Auto Group highly enough.',
  },
  {
    id: 2,
    name: 'Sophie R.',
    location: 'Manchester',
    text: 'I was nervous about buying a performance car, but the team took the time to explain everything and never once pushed me. Honest, friendly and really knowledgeable. Five stars all round.',
  },
  {
    id: 3,
    name: 'Mark D.',
    location: 'Leeds',
    text: 'Brilliant service. Every question I had was answered quickly and the car arrived in better condition than I had hoped. Genuinely the best dealership experience I have had.',
  },
  {
    id: 4,
    name: 'Hannah P.',
    location: 'Bristol',
    text: 'Professional from start to finish. The handover was thorough, the paperwork was sorted without any fuss, and they even got in touch a week later to check everything was perfect.',
  },
  {
    id: 5,
    name: 'Oliver W.',
    location: 'Edinburgh',
    text: 'Bought from a distance and still felt completely looked after. Plenty of photos, honest answers and delivery arranged without any drama. Superb.',
  },
  {
    id: 6,
    name: 'Priya K.',
    location: 'Birmingham',
    text: 'Fantastic team who clearly love their cars. No pressure, no games, just straight talking. The car is a joy to drive and I would happily buy from them again.',
  },
  {
    id: 7,
    name: 'Daniel H.',
    location: 'Newcastle',
    text: 'Clear on every detail and a very smooth process from beginning to end. Nothing was too much trouble, and I drove away delighted. A first-class dealership.',
  },
  {
    id: 8,
    name: 'Emma L.',
    location: 'Brighton',
    text: 'Such a refreshing change from the usual car-buying experience. Warm, helpful and completely transparent. They went above and beyond to make sure I was happy.',
  },
  {
    id: 9,
    name: 'Callum M.',
    location: 'Cardiff',
    text: 'Stunning cars and even better people. Everything was explained clearly, the car was prepared beautifully and I drove away with a huge smile. Highly recommended.',
  },
  {
    id: 10,
    name: 'Rebecca S.',
    location: 'Norwich',
    text: 'Could not fault them. Communication was excellent throughout and the whole thing felt effortless. Five stars without hesitation.',
  },
];

export default function Testimonials() {
  return (
    <Layout>
      <div className="services-page">
        <div className="services-header">
          <h1>Testimonials</h1>
          <p>What our customers say about Titan Global Auto Group</p>
        </div>

        <section className="testimonials">
          <div className="testimonial-list">
            {testimonials.map((t) => (
              <div key={t.id} className="testimonial-card">
                <div
                  className="testimonial-stars"
                  role="img"
                  aria-label="5 out of 5 stars"
                >
                  &#9733;&#9733;&#9733;&#9733;&#9733;
                </div>
                <p className="quote">&ldquo;{t.text}&rdquo;</p>
                <p className="author">
                  {t.name}{' '}
                  <span className="testimonial-location">&middot; {t.location}</span>
                </p>
                {SHOW_SAMPLE_LABEL && (
                  <span className="testimonial-sample">Sample review</span>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
