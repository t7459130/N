export default function handler(req, res) {
  const { plate } = req.query;

  if (!plate) {
    return res.status(400).json({ error: "No plate provided" });
  }

  // MOCK DATABASE (replace with real API later)
  const mockDB = {
    "AB12CDE": {
      registration: "AB12 CDE",
      make: "BMW",
      model: "M4",
      year: 2021,
      fuelType: "Petrol"
    },
    "XX11YYY": {
      registration: "XX11 YYY",
      make: "Audi",
      model: "RS6",
      year: 2022,
      fuelType: "Petrol"
    }
  };

  const key = plate.replace(/\s/g, '').toUpperCase();

  const result = mockDB[key];

  if (!result) {
    return res.status(404).json({ error: "No vehicle found" });
  }

  res.status(200).json(result);
}