// pages/api/vehicle-lookup.js
import axios from 'axios';

export default async function handler(req, res) {
  const { plate } = req.query;

  if (!plate) {
    return res.status(400).json({ error: 'Registration plate required' });
  }

  try {
    const cleanPlate = plate.replace(/\s/g, '').toUpperCase();

    // Using the public MOT API through our server (bypasses CORS)
    const response = await axios.get(
      `https://beta.check-mot.service.gov.uk/trade/vehicles/mot-tests?registration=${cleanPlate}`,
      {
        headers: {
          'Accept': 'application/json',
        },
        timeout: 10000,
      }
    );

    if (response.data && response.data.length > 0) {
      const vehicle = response.data[0];
      return res.status(200).json({
        registrationNumber: vehicle.registration,
        make: vehicle.make || 'Unknown',
        model: vehicle.model || 'Unknown',
        colour: vehicle.primaryColour || 'Unknown',
        fuelType: vehicle.fuelType || 'Unknown',
        motStatus: vehicle.motTestResult || 'Unknown',
        motExpiry: vehicle.expiryDate || 'N/A',
      });
    } else {
      return res.status(404).json({ error: 'Vehicle not found' });
    }
  } catch (error) {
    console.error('Vehicle lookup error:', error.message);
    return res.status(500).json({ 
      error: 'Unable to lookup vehicle. Please try again.' 
    });
  }
}