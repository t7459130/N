// components/ThumbnailStrip.js
//
// Horizontal, scrollable thumbnail strip with left/right buttons.
// Shows a window of `visibleCount` images at a time and lets you page
// through the rest (built for cars with 50+ images).
//
// Fully self-contained (scoped styles via styled-jsx) so it can be
// dropped into any page/card without touching existing CSS.

import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export default function ThumbnailStrip({
  images,
  currentIndex,
  onSelect,
  visibleCount = 6,
  theme = 'dark', // 'dark' | 'light'
}) {
  const [start, setStart] = useState(0);

  if (!images || images.length <= 1) return null;

  const maxStart = Math.max(0, images.length - visibleCount);

  const ensureVisible = (index) => {
    setStart((s) => {
      if (index < s) return index;
      if (index > s + visibleCount - 1) return Math.max(0, index - visibleCount + 1);
      return s;
    });
  };

  const shiftLeft = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const nextIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    onSelect(nextIndex);
    ensureVisible(nextIndex);
  };

  const shiftRight = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const nextIndex = (currentIndex + 1) % images.length;
    onSelect(nextIndex);
    ensureVisible(nextIndex);
  };

  const handleSelect = (index) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    onSelect(index);
    ensureVisible(index);
  };

  const visible = images.slice(start, start + visibleCount);

  return (
    <div
      className={`thumb-strip thumb-strip-${theme}`}
      onClick={(e) => e.preventDefault()}
    >
      <button
        type="button"
        className="thumb-arrow"
        onClick={shiftLeft}
        aria-label="Previous image"
      >
        <FaChevronLeft size={12} />
      </button>

      <div className="thumb-track">
        {visible.map((img, i) => {
          const realIndex = start + i;
          return (
            <img
              key={realIndex}
              src={img}
              alt={`view ${realIndex + 1}`}
              className={`thumb-img${realIndex === currentIndex ? ' active' : ''}`}
              onClick={handleSelect(realIndex)}
            />
          );
        })}
      </div>

      <button
        type="button"
        className="thumb-arrow"
        onClick={shiftRight}
        aria-label="Next image"
      >
        <FaChevronRight size={12} />
      </button>

      <style jsx>{`
        .thumb-strip {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          width: 100%;
        }

        .thumb-track {
          display: flex;
          gap: 0.5rem;
          overflow: hidden;
          flex: 1;
          min-width: 0;
        }

        .thumb-img {
          width: 100%;
          aspect-ratio: 4 / 3;
          object-fit: cover;
          border-radius: 4px;
          cursor: pointer;
          flex: 1 1 0;
          min-width: 0;
          opacity: 0.6;
          border: 2px solid transparent;
          transition: opacity 0.2s ease, border-color 0.2s ease;
        }

        .thumb-img:hover {
          opacity: 0.9;
        }

        .thumb-img.active {
          opacity: 1;
        }

        .thumb-arrow {
          flex-shrink: 0;
          border: none;
          border-radius: 4px;
          width: 26px;
          height: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: opacity 0.2s ease, background 0.2s ease, color 0.2s ease, border-color 0.2s ease;
        }

        .thumb-arrow:disabled {
          opacity: 0.3;
          cursor: default;
        }

        /* Dark theme: matches the site's black/gold luxury styling */
        .thumb-strip-dark .thumb-img.active {
          border-color: #c9a961;
        }

        .thumb-strip-dark .thumb-arrow {
          background: #000;
          color: #f5f5f5;
          border: 1px solid #2a2f4a;
        }

        .thumb-strip-dark .thumb-arrow:not(:disabled):hover {
          color: #c9a961;
          border-color: #c9a961;
        }

        /* Light theme: matches the white inventory cards */
        .thumb-strip-light .thumb-img.active {
          border-color: #111;
        }

        .thumb-strip-light .thumb-arrow {
          background: #111;
          color: #fff;
          border: none;
        }

        .thumb-strip-light .thumb-arrow:not(:disabled):hover {
          background: #333;
        }
      `}</style>
    </div>
  );
}
