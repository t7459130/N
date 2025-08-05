import Layout from '../components/Layout';

const PrivacyPolicy = () => (
  <Layout>
    <div className="legal-page">
      <h1>Privacy Policy</h1>
      <p>
        Your privacy is important to us. This policy outlines how we collect, use, and protect your personal data.
      </p>

      <h2>Information We Collect</h2>
      <ul>
        <li>Contact details (e.g., name, email, phone number)</li>
        <li>Vehicle information (for services like selling or trading cars)</li>
        <li>Website usage data via cookies and analytics</li>
      </ul>

      <h2>How We Use Your Information</h2>
      <p>
        We use your information to provide and improve our services, process inquiries, and communicate with you regarding your interests or transactions.
      </p>

      <h2>Your Rights</h2>
      <p>
        You have the right to access, update, or delete your personal information. To exercise your rights, please contact us at info@cardealership.com.
      </p>
    </div>
  </Layout>
);

export default PrivacyPolicy;
