import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

export default async function handler(req, res) {
  const client = new MongoClient(uri);

  if (req.method === 'GET') {
    try {
      await client.connect();
      const db = client.db();
      const cars = await db.collection('cars').find().toArray();
      await client.close();
      res.status(200).json(cars);
    } catch (err) {
      console.error('❌ GET /api/cars error:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === 'POST') {
    try {
      const newCar = req.body;

      console.log('📦 Received POST data:', JSON.stringify(newCar, null, 2));

      if (!newCar || typeof newCar !== 'object') {
        console.error('⚠️ Invalid car data received');
        return res.status(400).json({ error: 'Invalid car data' });
      }

      await client.connect();
      const db = client.db();

      const result = await db.collection('cars').insertOne(newCar);
      await client.close();

      console.log('✅ Car added with ID:', result.insertedId);

      res.status(201).json({ message: 'Car added', id: result.insertedId });
    } catch (err) {
      console.error('❌ POST /api/cars error:', err);
      res.status(500).json({ error: err.message || 'Failed to add car' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
