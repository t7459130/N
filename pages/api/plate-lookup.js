export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Use GET" });
  }

  const { plate } = req.query;

  if (!plate) {
    return res.status(400).json({ error: "Plate required" });
  }

  const cleanPlate = plate.replace(/\s/g, "").toUpperCase();

  try {
    const response = await fetch(
      "https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles",
      {
        method: "POST",
        headers: {
          "x-api-key": process.env.VES_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          registrationNumber: cleanPlate,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: data?.errors?.[0]?.detail || "Vehicle not found",
      });
    }

    return res.status(200).json(data);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
}