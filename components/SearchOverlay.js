import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import axios from "axios";

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
      const { data } = await axios.get(
        `/api/plate-lookup?plate=${plate}`
      );

      setVehicle(data);
    } catch (err) {
      setError(err.response?.data?.error || "Not found");
    }

    setLoading(false);
  };

  return (
    <div className="search-overlay">

      <button className="close-btn" onClick={onClose}>
        <FaTimes size={22} />
      </button>

      <h2>Vehicle Lookup</h2>

      <input
        value={plate}
        onChange={(e) => setPlate(e.target.value.toUpperCase())}
        placeholder="Enter registration (e.g. AB12CDE)"
        style={{ width: "100%", padding: 12 }}
      />

      <button onClick={searchPlate} style={{ marginTop: 10 }}>
        Search
      </button>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {vehicle && (
        <div style={{
          marginTop: 20,
          padding: 15,
          border: "1px solid #ddd",
          borderRadius: 8
        }}>
          <h3>{vehicle.make} {vehicle.model}</h3>

          <p><b>Registration:</b> {vehicle.registrationNumber}</p>
          <p><b>Year:</b> {vehicle.yearOfManufacture}</p>
          <p><b>Fuel:</b> {vehicle.fuelType}</p>
          <p><b>Colour:</b> {vehicle.colour}</p>
          <p><b>Engine:</b> {vehicle.engineCapacity}cc</p>
          <p><b>MOT:</b> {vehicle.motStatus}</p>
        </div>
      )}

      <style jsx>{`
        .search-overlay {
          position: fixed;
          inset: 0;
          background: white;
          z-index: 9999;
          padding: 20px;
          overflow-y: auto;
        }

        .close-btn {
          position: absolute;
          top: 10px;
          right: 10px;
          background: none;
          border: none;
        }
      `}</style>
    </div>
  );
}