import { MongoClient, ObjectId } from 'mongodb';

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
      // Extract filters & search params from query
      const {
        search,
        sortBy,
        transmission,
        fuelType,
        bodyStyle,
        colour,
        year,
        make,
        model,
      } = req.query;

      // Build MongoDB filter object
      const filter = {};

      if (transmission) filter.transmission = { $in: transmission.split(',') };
      if (fuelType) filter.fuelType = { $in: fuelType.split(',') };
      if (bodyStyle) filter.bodyStyle = { $in: bodyStyle.split(',') };
      if (colour) filter.colour = { $in: colour.split(',') };

      if (year) {
        // convert to numbers
        const years = year.split(',').map((y) => Number(y));
        filter.year = { $in: years };
      }

      if (make) filter.make = { $in: make.split(',') };
      if (model) filter.model = { $in: model.split(',') };

      if (search) {
        filter.$or = [
          { make: { $regex: search, $options: 'i' } },
          { model: { $regex: search, $options: 'i' } },
        ];
      }

      // Sorting
      let sort = {};
      if (sortBy === 'year') sort.year = -1;
      else if (sortBy === 'price') sort.price = 1;
      else sort.createdAt = -1; // latest arrivals by default

      const allCars = await cars.find(filter).sort(sort).limit(50).toArray();

      await client.close();
      return res.status(200).json({ cars: allCars });
    } catch (err) {
      console.error(err);
      await client.close();
      return res.status(500).json({ error: 'Failed to fetch cars' });
    }
  }

  if (req.method === 'POST') {
    try {
      const {
        make,
        model,
        variant,
        year,
        price,
        transmission,
        fuelType,
        mileage,
        bodyStyle,
        colour,
        engineSize,
        fuelEconomy,
        description,
        images,
      } = req.body;

      if (!make || !model || !year || !price || !Array.isArray(images) || images.length === 0) {
        await client.close();
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
