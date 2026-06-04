// pages/api/vehicle-lookup.js
export default async function handler(req, res) {
  const { plate } = req.query;

  if (!plate) {
    return res.status(400).json({ error: 'Registration plate required' });
  }

  try {
    const cleanPlate = plate.replace(/\s/g, '').toUpperCase();

    // Free UK MOT API - no auth needed
    const response = await fetch(
      `https://beta.check-mot.service.gov.uk/trade/vehicles/mot-tests?registration=${cleanPlate}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      }
    );

    const data = await response.json();

    if (!Array.isArray(data) || data.length === 0) {
      return res.status(404).json({ 
        error: 'Vehicle not found' 
      });
    }

    const vehicle = data[0];

    return res.status(200).json({
      registrationNumber: vehicle.registration,
      make: vehicle.make || 'Unknown',
      model: vehicle.model || 'Unknown',
      colour: vehicle.primaryColour || 'Unknown',
      fuelType: vehicle.fuelType || 'Unknown',
      motStatus: vehicle.motTestResult,
      motExpiry: vehicle.expiryDate || 'N/A',
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ 
      error: 'Unable to lookup vehicle' 
    });
  }
}