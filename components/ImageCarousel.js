import React, { useState } from 'react';

export default function ImageCarousel({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ position: 'relative' }}>
        <img
          src={images[currentIndex]}
          alt="Car"
          style={{ width: '100%', maxHeight: 500, objectFit: 'cover', borderRadius: 10 }}
        />
        {images.length > 1 && (
          <>
            <button onClick={prev} style={arrowStyle('left')}>&lt;</button>
            <button onClick={next} style={arrowStyle('right')}>&gt;</button>
          </>
        )}
      </div>
      <div style={{ marginTop: 10 }}>
        {images.map((url, idx) => (
          <img
            key={idx}
            src={url}
            alt={`thumb-${idx}`}
            style={{
              width: 60,
              height: 60,
              objectFit: 'cover',
              margin: '0 5px',
              border: currentIndex === idx ? '2px solid red' : '1px solid #ccc',
              borderRadius: 6,
              cursor: 'pointer',
            }}
            onClick={() => setCurrentIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
}

const arrowStyle = (side) => ({
  position: 'absolute',
  top: '50%',
  [side]: 10,
  transform: 'translateY(-50%)',
  background: 'rgba(0,0,0,0.5)',
  color: 'white',
  border: 'none',
  padding: '10px',
  cursor: 'pointer',
  fontSize: 18,
});
