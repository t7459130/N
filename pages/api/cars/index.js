import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: ServerApiVersion.v1,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  tls: true,
});

export default async function handler(req, res) {
  if (!uri) {
    console.error('❌ MONGODB_URI is not defined in environment variables.');
    return res.status(500).json({ error: 'Database connection string missing' });
  }

  try {
    await client.connect();
    const db = client.db();
    const collection = db.collection('cars');

    if (req.method === 'GET') {
      const cars = await collection.find().toArray();
      return res.status(200).json(cars);
    }

    if (req.method === 'POST') {
      const newCar = req.body;
      console.log('📦 Received POST data:', newCar);

      if (!newCar || typeof newCar !== 'object') {
        return res.status(400).json({ error: 'Invalid car data' });
      }

      const result = await collection.insertOne(newCar);
      return res.status(201).json({ message: 'Car added', id: result.insertedId });
    }

    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  } catch (err) {
    console.error('❌ API error:', err);
    return res.status(500).json({ error: 'Internal server error', details: err.message });
  } finally {
    await client.close();
  }
}
