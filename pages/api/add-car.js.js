import { MongoClient } from 'mongodb';

// Enable built-in JSON parsing
export const config = {
  api: {
    bodyParser: true,
  },
};

const uri = process.env.MONGODB_URI;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST allowed' });
  }

  try {
    const {
      make, model, variant, year, price, transmission, fuelType,
      mileage, bodyStyle, colour, engineSize, fuelEconomy,
      description, images
    } = req.body;

    if (!make || !model || !year || !price || !images?.length) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db();
    const cars = db.collection('cars');

    const newCar = {
      make,
      model,
      variant,
      year: parseInt(year, 10),
      price: parseFloat(price),
      transmission,
      fuelType,
      mileage,
      bodyStyle,
      colour,
      engineSize,
      fuelEconomy,
      description,
      images, // These are already Blob URLs from Vercel
      createdAt: new Date(),
    };

    const result = await cars.insertOne(newCar);
    await client.close();

    res.status(201).json({ message: 'Car saved', id: result.insertedId });
  } catch (err) {
    console.error('DB error:', err);
    res.status(500).json({ error: 'Database error' });
  }
}
