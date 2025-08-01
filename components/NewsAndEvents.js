// src/NewsAndEvents.js
import React from 'react';

const eventsData = [
  {
    id: 1,
    title: "Grand Opening Event",
    date: "January 15, 2024",
    description: "Join us for the grand opening of our new dealership location with exclusive offers and refreshments.",
  },
  {
    id: 2,
    title: "Test Drive Weekend",
    date: "February 10-12, 2024",
    description: "Experience our latest models during our Test Drive Weekend. Book your slot today!",
  },
  {
    id: 3,
    title: "Seasonal Sales Event",
    date: "March 1-31, 2024",
    description: "Take advantage of our seasonal sales event with great discounts on selected vehicles.",
  },
  {
    id: 4,
    title: "Community Car Show",
    date: "April 20, 2024",
    description: "Participate in our community car show featuring classic and luxury vehicles. Prizes for top entries!",
  },
  {
    id: 5,
    title: "Car Maintenance Workshop",
    date: "May 15, 2024",
    description: "Learn basic car maintenance tips and tricks from our experienced technicians.",
  },
];

const NewsAndEvents = () => {
  return (
    <div className="news-and-events">
      <h2>News and Events</h2>
      <div className="events-list">
        {eventsData.map((event) => (
          <div key={event.id} className="event-card">
            <h3>{event.title}</h3>
            <p><strong>Date:</strong> {event.date}</p>
            <p>{event.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsAndEvents;
