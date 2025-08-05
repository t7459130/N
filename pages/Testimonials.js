// pages/Testimonials.js (move to /pages if it's currently in /src)

import React from 'react';
import Layout from '../components/Layout';

const testimonialsData = [
  {
    id: 1,
    quote: "I had a fantastic experience buying my car! The staff was so helpful and friendly.",
    author: "John Doe",
    location: "Los Angeles, CA",
  },
  {
    id: 2,
    quote: "The selection of luxury cars is unmatched. I found my dream car here!",
    author: "Sarah Smith",
    location: "New York, NY",
  },
  {
    id: 3,
    quote: "Excellent customer service! They made the buying process so easy.",
    author: "Mike Johnson",
    location: "Chicago, IL",
  },
  {
    id: 4,
    quote: "I love my new car! Great prices and a very smooth transaction.",
    author: "Emily Davis",
    location: "Miami, FL",
  },
  {
    id: 5,
    quote: "Highly recommend this dealership! They truly care about their customers.",
    author: "David Brown",
    location: "San Francisco, CA",
  },
];

const Testimonials = () => {
  return (
    <div className="testimonials">
      <h2>What Our Customers Say</h2>
      <div className="testimonial-list">
        {testimonialsData.map((testimonial) => (
          <div key={testimonial.id} className="testimonial-card">
            <p className="quote">"{testimonial.quote}"</p>
            <p className="author">- {testimonial.author}, {testimonial.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// 👇 Wrap with Layout
export default function TestimonialsPage() {
  return (
    <Layout>
      <Testimonials />
    </Layout>
  );
}
