import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
  tls: true,
});

export default async function handler(req, res) {
  if (!uri) {
    console.error('❌ MONGODB_URI not defined');
    return res.status(500).json({ error: 'Database connection string missing' });
  }

  try {
    await client.connect();
    const collection = client.db().collection('cars');

    if (req.method === 'GET') {
      const cars = await collection.find().toArray();
      return res.status(200).json(cars);
    }

    if (req.method === 'POST') {
      const newCar = req.body;
      console.log('📦 POST data:', newCar);
      const result = await collection.insertOne(newCar);
      return res.status(201).json({ message: 'Car added', id: result.insertedId });
    }

    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  } catch (err) {
    console.error('❌ API error:', err);
    return res.status(500).json({ error: err.message });
  } finally {
    await client.close();
  }
}
