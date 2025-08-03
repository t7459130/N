import React, { useState } from 'react';

function CarForm({ onAddSuccess }) {
  const [carData, setCarData] = useState({
    make: '', model: '', variant: '', year: '', price: '',
    transmission: '', fuelType: '', mileage: '', bodyStyle: '',
    colour: '', engineSize: '', fuelEconomy: '', images: [],
    description: '',
  });

  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileInput = async (e) => {
    const files = e.target.files;
    setUploading(true);

    try {
      const uploadedUrls = [];

      for (let file of files) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'carscars'); // your preset
        formData.append('cloud_name', 'dgwbnya5f');   // your cloud name

        const res = await fetch('https://api.cloudinary.com/v1_1/dgwbnya5f/image/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();

        if (!data.secure_url) {
          throw new Error('Upload failed');
        }

        uploadedUrls.push(data.secure_url);
      }

      setCarData((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls],
      }));
    } catch (error) {
      alert('Image upload failed: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const onFormSubmit = async (e) => {
    e.preventDefault();

    if (!carData.make || !carData.model || !carData.year || !carData.price) {
      alert("Please fill in required fields.");
      return;
    }
    if (carData.images.length === 0) {
      alert('Please upload at least one image');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/cars', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(carData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to add car');
      }

      alert('Car added successfully!');
      setCarData({
        make: '', model: '', variant: '', year: '', price: '',
        transmission: '', fuelType: '', mileage: '', bodyStyle: '',
        colour: '', engineSize: '', fuelEconomy: '', images: [],
        description: '',
      });

      if (typeof onAddSuccess === 'function') {
        onAddSuccess();
      }
    } catch (error) {
      alert('Error: ' + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={onFormSubmit} style={{ maxWidth: 600, margin: 'auto' }}>
      <input name="make" value={carData.make} onChange={handleChange} placeholder="Make" required />
      <input name="model" value={carData.model} onChange={handleChange} placeholder="Model" required />
      <input name="variant" value={carData.variant} onChange={handleChange} placeholder="Variant" />
      <input name="year" type="number" value={carData.year} onChange={handleChange} placeholder="Year" required />
      <input name="price" type="number" value={carData.price} onChange={handleChange} placeholder="Price" required />
      <input name="transmission" value={carData.transmission} onChange={handleChange} placeholder="Transmission" />
      <input name="fuelType" value={carData.fuelType} onChange={handleChange} placeholder="Fuel Type" />
      <input name="mileage" value={carData.mileage} onChange={handleChange} placeholder="Mileage" />
      <input name="bodyStyle" value={carData.bodyStyle} onChange={handleChange} placeholder="Body Style" />
      <input name="colour" value={carData.colour} onChange={handleChange} placeholder="Colour" />
      <input name="engineSize" value={carData.engineSize} onChange={handleChange} placeholder="Engine Size" />
      <input name="fuelEconomy" value={carData.fuelEconomy} onChange={handleChange} placeholder="Fuel Economy" />
      <textarea
        name="description"
        value={carData.description}
        onChange={handleChange}
        placeholder="Description"
        rows={3}
      />

      <label>Upload Images</label>
      <input type="file" accept="image/*" multiple onChange={handleFileInput} disabled={uploading} />
      {uploading && <p>Uploading images...</p>}

      <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: 10 }}>
        {carData.images.map((url, idx) => (
          <img key={idx} src={url} alt={`Car ${idx}`} style={{ width: 100, marginRight: 10, borderRadius: 6 }} />
        ))}
      </div>

      <button type="submit" disabled={uploading || submitting}>
        {submitting ? 'Adding...' : 'Add Car'}
      </button>
    </form>
  );
}

export default CarForm;
