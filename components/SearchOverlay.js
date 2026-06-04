import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function SearchOverlay({ isOpen, onClose }) {
  const [plate, setPlate] = useState("");
  const [loading, setLoading] = useState(false);
  const [vehicle, setVehicle] = useState(null);
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const searchPlate = async () => {
    setLoading(true);
    setError("");
    setVehicle(null);

    try {
      const cleanPlate = plate.replace(/\s/g, "").toUpperCase();
      
      // Using public DVLA MOT API endpoint
      const response = await fetch(
        `https://beta.check-mot.service.gov.uk/trade/vehicles/mot-tests?registration=${cleanPlate}`,
        {
          method: "GET",
          headers: {
            "Accept": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Vehicle not found");
      }

      const data = await response.json();

      if (data && data.length > 0) {
        const latestMot = data[0];
        setVehicle({
          registrationNumber: latestMot.registration,
          make: latestMot.make || "Unknown",
          model: latestMot.model || "Unknown",
          colour: latestMot.primaryColour || "Unknown",
          fuelType: latestMot.fuelType || "Unknown",
          motStatus: latestMot.motTestResult || "Unknown",
          motExpiry: latestMot.expiryDate || "N/A",
          year: latestMot.registeredKeeper || "N/A",
        });
      } else {
        setError("No vehicle found. Check your registration number.");
      }
    } catch (err) {
      setError("Vehicle not found or invalid registration. Try another number.");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="search-overlay">
      <button className="close-btn" onClick={onClose}>
        <FaTimes size={22} />
      </button>

      <div className="search-container">
        <h2>UK Vehicle Lookup</h2>
        <p className="search-subtitle">Check MOT status and vehicle details</p>

        <div className="search-input-group">
          <input
            value={plate}
            onChange={(e) => setPlate(e.target.value.toUpperCase())}
            placeholder="e.g. AB12CDE"
            maxLength="7"
            onKeyPress={(e) => e.key === "Enter" && searchPlate()}
          />
          <button onClick={searchPlate} disabled={!plate || loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </div>

        {loading && <p className="status loading">Loading vehicle data...</p>}
        {error && <p className="status error">⚠️ {error}</p>}

        {vehicle && (
          <div className="vehicle-result">
            <h3>{vehicle.make} {vehicle.model}</h3>
            <div className="result-grid">
              <div className="result-item">
                <span className="label">Registration:</span>
                <span className="value">{vehicle.registrationNumber}</span>
              </div>
              <div className="result-item">
                <span className="label">MOT Status:</span>
                <span className={`value ${vehicle.motStatus?.toLowerCase().replace(/\s/g, '-')}`}>
                  {vehicle.motStatus}
                </span>
              </div>
              <div className="result-item">
                <span className="label">MOT Expires:</span>
                <span className="value">{vehicle.motExpiry}</span>
              </div>
              <div className="result-item">
                <span className="label">Colour:</span>
                <span className="value">{vehicle.colour}</span>
              </div>
              <div className="result-item">
                <span className="label">Fuel Type:</span>
                <span className="value">{vehicle.fuelType}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .search-overlay {
          position: fixed;
          inset: 0;
          background: linear-gradient(135deg, rgba(10, 14, 39, 0.95) 0%, rgba(26, 31, 58, 0.95) 100%);
          z-index: 9999;
          padding: 40px 20px;
          overflow-y: auto;
          display: flex;
          align-items: flex-start;
          justify-content: center;
        }

        .search-container {
          background: #1a1f3a;
          border: 1px solid #2a2f4a;
          border-radius: 12px;
          padding: 40px;
          max-width: 600px;
          width: 100%;
          color: #f5f5f5;
          margin-top: 50px;
        }

        .close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          background: none;
          border: none;
          color: #c9a961;
          cursor: pointer;
          font-size: 28px;
          z-index: 10000;
          transition: color 0.3s ease;
        }

        .close-btn:hover {
          color: #f5f5f5;
        }

        h2 {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          color: #c9a961;
          margin-bottom: 10px;
        }

        .search-subtitle {
          color: #b0b0b0;
          margin-bottom: 25px;
          font-size: 0.95rem;
        }

        .search-input-group {
          display: flex;
          gap: 10px;
          margin-bottom: 25px;
        }

        input {
          flex: 1;
          padding: 12px 16px;
          background: #0a0e27;
          border: 1px solid #2a2f4a;
          border-radius: 6px;
          color: #f5f5f5;
          font-size: 16px;
          font-family: inherit;
        }

        input::placeholder {
          color: #b0b0b0;
        }

        input:focus {
          outline: none;
          border-color: #c9a961;
        }

        button {
          padding: 12px 24px;
          background: #c9a961;
          color: #0a0e27;
          border: none;
          border-radius: 6px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.3s ease;
        }

        button:hover:not(:disabled) {
          background: #d4b87a;
        }

        button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .status {
          padding: 12px 16px;
          border-radius: 6px;
          margin-bottom: 20px;
          text-align: center;
        }

        .status.loading {
          background: rgba(201, 169, 97, 0.1);
          color: #c9a961;
        }

        .status.error {
          background: rgba(196, 0, 0, 0.1);
          color: #ff6b6b;
        }

        .vehicle-result {
          background: #0a0e27;
          padding: 20px;
          border-radius: 8px;
          border: 1px solid #2a2f4a;
        }

        .vehicle-result h3 {
          color: #c9a961;
          font-size: 1.5rem;
          margin-bottom: 20px;
        }

        .result-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 15px;
        }

        .result-item {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          border-bottom: 1px solid #2a2f4a;
        }

        .result-item:last-child {
          border-bottom: none;
        }

        .label {
          color: #b0b0b0;
          font-weight: 500;
        }

        .value {
          color: #f5f5f5;
          font-weight: 600;
        }

        @media (max-width: 600px) {
          .search-container {
            padding: 30px 20px;
            margin-top: 20px;
          }

          h2 {
            font-size: 1.5rem;
          }

          .search-input-group {
            flex-direction: column;
          }

          button {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}