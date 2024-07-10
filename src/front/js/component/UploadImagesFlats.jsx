import React, { useState, useContext } from "react";
import { Context } from "../store/appContext.js";
import { useTranslation } from 'react-i18next';

export const UploadImagesFlats = () => {
  const { t, i18n } = useTranslation();
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const { store, actions } = useContext(Context);
  


  const handleAlbumId = (id) => {
    actions.setAlbumId(id)
  }

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const flatID = store.currentFlat.id; 
    if (selectedFile && flatID) {
      /* const formData = new FormData();
      formData.append("img", selectedFile); */
      actions.uploadToCloudinary();
      setImageUrl(albumCloudinary.img_url);
      actions.createAlbum();
    }
  };

  

  const updateFlatAlbumID = async (dataTosend) => {
    const currentFlatID = store.currentFlat.id;
    const newAlbumID = handleAlbumId();
    const response = await fetch(`${process.env.BACKEND_URL}/api/flats/${currentFlatID}`, {
      method: "PUT",
      body: JSON.stringify({ dataTosend }), 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${store.accessToken}` 
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Flat updated successfully", data);
      actions.setAlbumId(data.albumID)
    } else {
      console.log("Error updating flat", response.status, response.statusText);
    }
  };

  const handleImageUpload = (imageUrl) => {
    setFormData({ ...formData, images: [...formData.images, imageUrl] });
  };

  const handleAddImg = () => {
    actions.createAlbum();
  };

 

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className='col-12'>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <input
              type="file"
              className="form-control form-control-sm"
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>
          <button type="submit" className="btn action-btn-center mt-0"><strong>{t('traduccion88')}</strong></button>
        </form>
        {imageUrl && ( 
          <button className="send-button btn-custom red-background mt-1" onClick={() => handleAddImg()}><strong>{t('traduccion89')}</strong></button>
        )}
      </div>
    </div>
  );
};