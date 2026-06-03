import Layout from '../components/Layout';

export default function Testimonials() {
  return (
    <Layout>
      <div className="page">

        <h1>Testimonials</h1>

        <div className="grid">
          {["Great service", "Amazing cars", "Highly recommend"].map((t, i) => (
            <div className="card" key={i}>
              <p>"{t}"</p>
            </div>
          ))}
        </div>

      </div>
    </Layout>
  );
}