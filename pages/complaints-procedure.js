import Layout from '../components/Layout';

const ComplaintsProcedure = () => (
  <Layout>
    <div className="legal-page">
      <h1>Complaints Procedure</h1>
      <p>
        We are committed to providing excellent customer service. If you are dissatisfied with any part of our service, we want to know.
      </p>

      <h2>How to Make a Complaint</h2>
      <p>
        Please email us at <strong>complaints@cardealership.com</strong> or call us at <strong>0123 456 789</strong>. Provide as much detail as possible, including your name, contact information, and a description of the issue.
      </p>

      <h2>What Happens Next?</h2>
      <ul>
        <li>We will acknowledge your complaint within 3 working days.</li>
        <li>A member of our team will investigate the issue.</li>
        <li>We aim to resolve all complaints within 14 days.</li>
      </ul>

      <h2>Unresolved Complaints</h2>
      <p>
        If you remain unhappy, you may escalate your complaint to the Financial Ombudsman Service.
      </p>
    </div>
  </Layout>
);

export default ComplaintsProcedure;
