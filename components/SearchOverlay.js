import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

export default function SearchOverlay({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="search-overlay">
      <button className="close-btn" onClick={onClose}>
        <FaTimes size={22} />
      </button>

      <div className="search-container">
        <h2>Check Vehicle MOT</h2>
        <p className="search-subtitle">Official UK Government MOT Checker</p>

        {/* Embed Check MOT service */}
        <iframe
          src="https://www.check-mot.service.gov.uk/"
          title="Check MOT"
          style={{
            width: '100%',
            height: '700px',
            border: 'none',
            borderRadius: '8px',
          }}
        />
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
          max-width: 900px;
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
          margin-bottom: 20px;
          font-size: 0.95rem;
        }

        @media (max-width: 600px) {
          .search-container {
            padding: 20px;
            margin-top: 20px;
          }

          h2 {
            font-size: 1.5rem;
          }

          iframe {
            height: 500px !important;
          }
        }
      `}</style>
    </div>
  );
}