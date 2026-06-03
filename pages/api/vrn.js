export default async function handler(req, res) {
  const { reg } = req.query;

  if (!reg) {
    return res.status(400).json({ error: "Missing registration" });
  }

  try {
    const response = await fetch(
      "https://driver-vehicle-licensing.api.gov.uk/vehicle-enquiry/v1/vehicles",
      {
        method: "POST",
        headers: {
          "x-api-key": process.env.DVLA_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          registrationNumber: reg.replace(/\s/g, "").toUpperCase(),
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(404).json({ error: "Vehicle not found" });
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
}