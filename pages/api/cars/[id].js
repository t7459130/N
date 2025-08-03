import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db('your_db_name'); // change this!

  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      if (!ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid ID' });
      }

      const car = await db.collection('cars').findOne({ _id: new ObjectId(id) });

      if (!car) {
        return res.status(404).json({ error: 'Car not found' });
      }

      res.status(200).json(car);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
