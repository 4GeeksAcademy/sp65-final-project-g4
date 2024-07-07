import React, { useState, useContext } from "react";
import { Context } from "../store/appContext.js";

export const UploadImagesFlats = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const { store, actions } = useContext(Context);

  const getLastFlatID = () => {
    if (store.flats.length > 0) {
      return store.flats[store.flats.length - 1].results.id;
    }
    return null; // or any fallback value if there are no flats
  }


  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const flatID = getLastFlatID(); // Get the last flat ID
    if (selectedFile && flatID) {
      const formData = new FormData();
      formData.append("img", selectedFile);
      const url = `${process.env.BACKEND_URL}/api/photoflats/${flatID}`; // Use the flat ID in the URL
      const options = {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${store.accessToken}`
        },
        body: formData,
      }
      const response = await fetch(url, options);

      if (response.ok) {
        const data = await response.json();
        setImageUrl(data.img_url);
        console.log("Successful uploading", data.img_url);
        alert("Your picture has been successfully uploaded");
        const albumData = await storePicture(data.img_url); // Store the image URL in Albums
        await updateFlatAlbumID(flatID, albumData.id); // Update the flat's album_id
      } else {
        console.log("Error uploading picture", response.status, response.statusText);
        alert("Error! Your picture has not been uploaded");
      }
    } else {
      alert('Please, select a file to upload and ensure a flat ID is available');
    }
  };

  const storePicture = async (url) => {
    const response = await fetch(`${process.env.BACKEND_URL}/api/albums`, {
      method: "POST",
      body: JSON.stringify({ "url_album_cloudinary": url }), // Correct key
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${store.accessToken}` // Add authorization if required
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Picture stored successfully", data);
      return data.results; // Return the created album data
    } else {
      console.log("Error storing picture", response.status, response.statusText);
      return null;
    }
  };

  const getCurrentFlatID = () => {
    if (store.flats.length > 0) {
      return store.flats[store.flats.length - 1].id;
    }
    return null; 
  }

  const updateFlatAlbumID = async (flatID, albumID) => {
    const currentFlatID = getCurrentFlatID();
    const response = await fetch(`${process.env.BACKEND_URL}/api/flats/${currentFlatID}`, {
      method: "PUT",
      body: JSON.stringify({ album_id: albumID }), 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${store.accessToken}` 
      },
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Flat updated successfully", data);
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
          <button type="submit" className="btn action-btn-center mt-0"><strong>Cargar imágenes</strong></button>
        </form>
        {imageUrl && ( 
          <button className="send-button btn-custom red-background mt-1" onClick={() => handleAddImg()}><strong>Publicar</strong></button>
        )}
      </div>
    </div>
  );
};