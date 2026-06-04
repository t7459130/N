import React from 'react';
import Layout from '../components/Layout';

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
    <div className="news-page">
      <div className="news-header">
        <h1>News & Events</h1>
        <p>Stay informed about our latest updates and exclusive events</p>
      </div>

      <div className="events-container">
        <div className="events-list">
          {eventsData.map((event) => (
            <div key={event.id} className="event-card">
              <div className="event-date">
                <span className="date-text">{event.date.split(' ')[0]}</span>
              </div>
              <div className="event-content">
                <h3>{event.title}</h3>
                <p className="event-date-full">{event.date}</p>
                <p className="event-description">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function NewsAndEventsPage() {
  return (
    <Layout>
      <NewsAndEvents />
    </Layout>
  );
}