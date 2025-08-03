// pages/car/[id].js
import { MongoClient, ObjectId } from 'mongodb';
import Layout from '../../components/Layout';
import ImageCarousel from '../../components/ImageCarousel';

export async function getServerSideProps(context) {
  const { id } = context.params;
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();

  const db = client.db();
  const car = await db.collection('cars').findOne({ _id: new ObjectId(id) });
  client.close();

  if (!car) {
    return { notFound: true };
  }

  return {
    props: {
      car: {
        ...car,
        _id: car._id.toString(), // serialize ObjectId
      },
    },
  };
}

export default function CarPage({ car }) {
  return (
    <Layout>
      <div style={{ maxWidth: 1000, margin: 'auto', padding: '2rem' }}>
        <h1>{car.year} {car.make} {car.model}</h1>
        <ImageCarousel images={car.images} />

        <div style={{ marginTop: '2rem' }}>
          <p><strong>Variant:</strong> {car.variant}</p>
          <p><strong>Price:</strong> £{car.price}</p>
          <p><strong>Transmission:</strong> {car.transmission}</p>
          <p><strong>Fuel Type:</strong> {car.fuelType}</p>
          <p><strong>Mileage:</strong> {car.mileage}</p>
          <p><strong>Body Style:</strong> {car.bodyStyle}</p>
          <p><strong>Colour:</strong> {car.colour}</p>
          <p><strong>Engine Size:</strong> {car.engineSize}</p>
          <p><strong>Fuel Economy:</strong> {car.fuelEconomy}</p>
          <p><strong>Description:</strong> {car.description}</p>
        </div>
      </div>
    </Layout>
  );
}
