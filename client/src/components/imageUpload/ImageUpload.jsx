import React, { useState } from 'react';


const ImageUpload = (onImageSelected) => {

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  return (
    <div>
      <input type="file" accept="image/*" capture="environment" onChange={onImageSelected} />
    </div>
  );
};

export default ImageUpload;
