const handleFileInput = async (e) => {
  const files = Array.from(e.target.files);
  const uploadedUrls = [];

  for (const file of files) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'carscars');

    const res = await fetch('https://api.cloudinary.com/v1_1/dgwbnya5f/image/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();
    uploadedUrls.push(data.secure_url);
  }

  setCarData((prev) => ({
    ...prev,
    images: [...prev.images, ...uploadedUrls],
  }));
};
