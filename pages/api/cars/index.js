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
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else if (req.method === 'POST') {
    try {
      const newCar = req.body;
      await client.connect();
      const db = client.db();
      const result = await db.collection('cars').insertOne(newCar);
      await client.close();
      res.status(201).json({ message: 'Car added', id: result.insertedId });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to add car' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
