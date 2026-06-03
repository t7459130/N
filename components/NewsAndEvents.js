import Layout from '../components/Layout';

export default function NewsAndEvents() {
  return (
    <Layout>
      <div className="page">

        <h1>News & Events</h1>

        <div className="grid">
          {[1,2,3,4].map(i => (
            <div className="card" key={i}>
              <h3>Event {i}</h3>
              <p>Details coming soon...</p>
            </div>
          ))}
        </div>

      </div>
    </Layout>
  );
}