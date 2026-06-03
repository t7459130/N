import { useEffect, useState } from "react";

export default function Sold() {
  const [images, setImages] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetch("/api/images")
      .then((res) => res.json())
      .then((data) => setImages(data));
  }, []);

  useEffect(() => {
    if (!images.length) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [images]);

  if (!images.length) {
    return (
      <div style={{ padding: 40, color: "white", background: "#111" }}>
        Loading...
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#111",
        minHeight: "100vh",
        padding: "40px",
        color: "white",
      }}
    >
      <h1 style={{ textAlign: "center" }}>🚗 Sold Vehicles</h1>

      <div
        style={{
          maxWidth: "1200px",
          margin: "30px auto",
          position: "relative",
        }}
      >
        <img
          src={images[current]}
          style={{
            width: "100%",
            height: "600px",
            objectFit: "cover",
            borderRadius: "15px",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            background: "red",
            padding: "10px 20px",
            borderRadius: "30px",
            fontWeight: "bold",
          }}
        >
          SOLD
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
          gap: "20px",
        }}
      >
        {images.map((img) => (
          <div key={img} style={{ position: "relative" }}>
            <img
              src={img}
              style={{
                width: "100%",
                height: "250px",
                objectFit: "cover",
                borderRadius: "12px",
              }}
            />

            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(255,0,0,0.6)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "12px",
                fontSize: "2rem",
                fontWeight: "bold",
              }}
            >
              SOLD
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}