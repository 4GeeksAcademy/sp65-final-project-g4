import React, { useState, useContext } from "react";
import { Context } from "../store/appContext.js";

export const UploadImagesFlats = () => {
  const [selectedFile, setselectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const { store, actions } = useContext(Context);

  
  const handleFileChange = (event) => {
    setselectedFile(event.target.files[0]);
  };

  actions.getFlatsId();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedFile) {
      const formData = new FormData();
      formData.append("img", selectedFile);
      const url = `${process.env.BACKEND_URL}/api/photoflats/${store.flatId}`
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
        console.log("Sucessful uploading", data.img_url)
        alert("Your picture has been sucessfully uploaded")
      } else {
        console.log("Error uploading picture", response.status, response.statusText)
        alert("Error! Your picture has not been uploaded")
      }
    } else {
      alert('Please, select a file to upload');
    }
  };

  const storePicture = async () => {

    const response = await fetch(`${process.env.BACKEND_URL}/api/albums`, {
      method: "POST",
      body: {
        "img_url": imageUrl
      },
      headers: {
        'Content-Type': 'application/json'
      },

    });

    
    const handleImageUpload = (imageUrl) => {
      setFormData({ ...formData, images: [...formData.images, imageUrl] });
    };

    const handleAddImg = () => {
      actions.createAlbum()
    };
  }

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
        <button className="send-button btn-custom red-background mt-1" >Publicar</button>
      </div>
    </div>
  );
};

