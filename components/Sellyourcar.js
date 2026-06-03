import Layout from '../components/Layout';

export default function Sell() {
  return (
    <Layout>
      <div className="content">
        <h1>Sell Your Car</h1>

        <form className="form">
          <input placeholder="First Name" />
          <input placeholder="Make" />
          <input placeholder="Model" />
          <textarea placeholder="Description" />
          <button>Submit</button>
        </form>
      </div>
    </Layout>
  );
}