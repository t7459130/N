import Layout from '../components/Layout';

const CookiePolicy = () => (
  <Layout>
    <div className="legal-page">
      <h1>Cookie Policy</h1>
      <p>
        This Cookie Policy explains how we use cookies and similar tracking technologies on our website.
      </p>

      <h2>What Are Cookies?</h2>
      <p>
        Cookies are small data files stored on your device when you visit a website. They help improve functionality, personalize content, and analyze site usage.
      </p>

      <h2>Types of Cookies We Use</h2>
      <ul>
        <li><strong>Essential Cookies:</strong> Required for the website to function properly.</li>
        <li><strong>Performance Cookies:</strong> Help us understand how visitors interact with the site.</li>
        <li><strong>Functionality Cookies:</strong> Allow the site to remember your preferences.</li>
      </ul>

      <h2>Managing Cookies</h2>
      <p>
        You can control or delete cookies through your browser settings. Disabling cookies may affect your experience on our site.
      </p>
    </div>
  </Layout>
);

export default CookiePolicy;
