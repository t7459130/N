import Layout from '../components/Layout';

export default function About() {
  return (
    <Layout>
      <div className="page">
        <h1>About Us</h1>

        <img
          src="/IMG_6403.jpg"
          style={{ width: '100%', borderRadius: 10, margin: '20px 0' }}
        />

        <p>
          Hello, and welcome to our dealership. We specialise in luxury and performance vehicles...
        </p>

        <p>
          Every car is hand selected and prepared to showroom standard.
        </p>
      </div>
    </Layout>
  );
}