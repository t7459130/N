import { MongoClient } from 'mongodb';

// Next.js built-in JSON parser enabled by default, but config is explicit here
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

    // Basic validation: required fields + images array must exist and have length
    if (!make || !model || !year || !price || !Array.isArray(images) || images.length === 0) {
      return res.status(400).json({ error: 'Missing required fields or images' });
    }

    const client = new MongoClient(uri);
    await client.connect();

    const db = client.db();
    const cars = db.collection('cars');

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
      images, // Should be array of Cloudinary URLs from frontend
      createdAt: new Date(),
    };

    const result = await cars.insertOne(newCar);
    await client.close();

    res.status(201).json({ message: 'Car saved', id: result.insertedId });
  } catch (error) {
    console.error('DB error:', error);
    res.status(500).json({ error: 'Database error' });
  }
}
