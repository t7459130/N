// CarForm.js
import React, { useState } from 'react';
import { upload } from '@vercel/blob';

function CarForm({ onAddCar }) {
  const [carData, setCarData] = useState({
    make: '', model: '', variant: '', year: '', price: '',
    transmission: '', fuelType: '', mileage: '', bodyStyle: '',
    colour: '', engineSize: '', fuelEconomy: '', images: [],
    description: '',
  });

  const [uploading, setUploading] = useState(false);

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
        const blob = await upload(file.name, file, { access: 'public' });
        uploadedUrls.push(blob.url);
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

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (!carData.make || !carData.model || !carData.year || !carData.price) {
      alert("Please fill in required fields.");
      return;
    }
    if (carData.images.length === 0) {
      alert('Please upload at least one image');
      return;
    }

    onAddCar(carData);
    setCarData({
      make: '', model: '', variant: '', year: '', price: '',
      transmission: '', fuelType: '', mileage: '', bodyStyle: '',
      colour: '', engineSize: '', fuelEconomy: '', images: [],
      description: '',
    });
  };

  return (
    <form onSubmit={onFormSubmit}>
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
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {carData.images.map((url, idx) => (
          <img key={idx} src={url} alt={`Car ${idx}`} style={{ width: 100, marginRight: 10 }} />
        ))}
      </div>

      <button type="submit" disabled={uploading}>Add Car</button>
    </form>
  );
}

export default CarForm;
