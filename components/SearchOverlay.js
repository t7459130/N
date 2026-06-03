import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function SearchOverlay({ isOpen, onClose }) {
  const [reg, setReg] = useState("");
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(false);

  const searchVRN = async () => {
    if (!reg) return;

    setLoading(true);
    setVehicle(null);

    try {
      const res = await fetch(`/api/vrn?reg=${reg}`);
      const data = await res.json();
      setVehicle(data);
    } catch (e) {
      setVehicle(null);
    }

    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="search-overlay">
      <button className="close-btn" onClick={onClose}>
        <FaTimes />
      </button>

      <h2>UK Plate Search</h2>

      <div className="search-box">
        <input
          value={reg}
          onChange={(e) => setReg(e.target.value)}
          placeholder="Enter registration (e.g. BMW M3 / AB12CDE)"
        />

        <button onClick={searchVRN}>Search</button>
      </div>

      {loading && <p>Searching DVLA database...</p>}

      {vehicle && vehicle.registrationNumber && (
        <div className="car-result">
          <h3>
            {vehicle.make} {vehicle.model}
          </h3>

          <p>Reg: {vehicle.registrationNumber}</p>
          <p>Fuel: {vehicle.fuelType}</p>
          <p>Colour: {vehicle.colour}</p>
          <p>Year: {vehicle.yearOfManufacture}</p>
          <p>Status: {vehicle.taxStatus}</p>
        </div>
      )}

      <style jsx>{`
        .search-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.95);
          color: white;
          padding: 30px;
          overflow-y: auto;
          z-index: 9999;
        }

        .close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          background: none;
          border: none;
          color: white;
          font-size: 24px;
        }

        h2 {
          text-align: center;
          margin-bottom: 20px;
        }

        .search-box {
          display: flex;
          gap: 10px;
          justify-content: center;
        }

        input {
          padding: 12px;
          width: 300px;
          border-radius: 6px;
          border: none;
        }

        button {
          padding: 12px 18px;
          background: white;
          color: black;
          border: none;
          cursor: pointer;
          border-radius: 6px;
        }

        .car-result {
          margin-top: 30px;
          max-width: 500px;
          margin-left: auto;
          margin-right: auto;
          background: #111;
          padding: 20px;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}