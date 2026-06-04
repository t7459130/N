import React from "react";
import { FaTimes } from "react-icons/fa";

export default function SearchOverlay({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="search-overlay">
      <button className="close-btn" onClick={onClose}>
        <FaTimes size={22} />
      </button>

      <div className="search-container">
        <h2>Vehicle Lookup</h2>
        <p className="search-subtitle">Check your vehicle details instantly</p>

        <div className="search-input-group">
          <input
            type="text"
            placeholder="Enter registration (e.g. AB12CDE)"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                const plate = e.target.value.trim();
                if (plate) {
                  window.open(`https://www.check-mot.service.gov.uk/`, '_blank');
                }
              }
            }}
          />
          <button 
            onClick={(e) => {
              const input = e.target.parentElement.querySelector('input');
              if (input.value.trim()) {
                window.open(`https://www.check-mot.service.gov.uk/`, '_blank');
              }
            }}
          >
            Search
          </button>
        </div>

        <div className="services-grid">
          <a 
            href="https://www.check-mot.service.gov.uk/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="service-card"
          >
            <h3>Check MOT Status</h3>
            <p>Official UK Government MOT checker</p>
            <span className="arrow">→</span>
          </a>

          <a 
            href="https://www.autotrader.co.uk/cars" 
            target="_blank" 
            rel="noopener noreferrer"
            className="service-card"
          >
            <h3>AutoTrader</h3>
            <p>Browse and search UK vehicles</p>
            <span className="arrow">→</span>
          </a>
        </div>
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
          margin-bottom: 30px;
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

        button:hover {
          background: #d4b87a;
        }

        .services-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 15px;
        }

        .service-card {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 25px;
          background: #0a0e27;
          border: 1px solid #2a2f4a;
          border-radius: 8px;
          text-decoration: none;
          color: inherit;
          transition: all 0.3s ease;
          position: relative;
        }

        .service-card:hover {
          border-color: #c9a961;
          background: #151a32;
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(201, 169, 97, 0.15);
        }

        .service-card h3 {
          color: #c9a961;
          font-family: 'Playfair Display', serif;
          font-size: 1.3rem;
          margin: 0;
        }

        .service-card p {
          color: #b0b0b0;
          font-size: 0.9rem;
          margin: 0;
        }

        .arrow {
          color: #c9a961;
          font-size: 1.5rem;
          position: absolute;
          top: 25px;
          right: 25px;
        }

        @media (max-width: 600px) {
          .search-container {
            padding: 20px;
            margin-top: 20px;
          }

          h2 {
            font-size: 1.5rem;
          }

          .service-card {
            padding: 20px;
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