import { MongoClient } from 'mongodb';

export const config = {
  api: {
    bodyParser: true,
  },
};

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'car_dealership';

export default async function handler(req, res) {
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);
  const cars = db.collection('cars');

  if (req.method === 'GET') {
    try {
      const allCars = await cars.find().sort({ createdAt: -1 }).toArray();
      await client.close();
      return res.status(200).json(allCars);
    } catch (err) {
      console.error(err);
      await client.close();
      return res.status(500).json({ error: 'Failed to fetch cars' });
    }
  }

  if (req.method === 'POST') {
    try {
      const {
        make, model, variant, year, price, transmission, fuelType,
        mileage, bodyStyle, colour, engineSize, fuelEconomy,
        description, images
      } = req.body;

      if (!make || !model || !year || !price || !Array.isArray(images) || images.length === 0) {
        return res.status(400).json({ error: 'Missing required fields or images' });
      }

      const newCar = {
        make,
        model,
        variant: variant || '',
        year: Number(year),
        price: Number(price),
        transmission: transmission || '',
        fuelType: fuelType || '',
        mileage: mileage || '',
        bodyStyle: bodyStyle || '',
        colour: colour || '',
        engineSize: engineSize || '',
        fuelEconomy: fuelEconomy || '',
        description: description || '',
        images,
        createdAt: new Date(),
      };

      const result = await cars.insertOne(newCar);
      await client.close();

      return res.status(201).json({ message: 'Car saved', id: result.insertedId });
    } catch (error) {
      console.error('DB error:', error);
      await client.close();
      return res.status(500).json({ error: 'Database error' });
    }
  }

  await client.close();
  return res.status(405).json({ message: 'Method Not Allowed' });
}
