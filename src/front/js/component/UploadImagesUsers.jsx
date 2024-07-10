import React, { useState, useContext } from "react";
import { Context } from "../store/appContext.js";
import { useTranslation } from 'react-i18next';

export const UploadImagesUsers = () => {
  const { t, i18n } = useTranslation();
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const { store, actions } = useContext(Context);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (selectedFile) {
      const formData = new FormData();
      formData.append("img", selectedFile);
      const url = `${process.env.BACKEND_URL}/api/photo`
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
        actions.settingLastProfPicUrl(data.img_url)
        localStorage.setItem('profileImageUrl', data.img_url)
      } else {
        console.log("Error uploading picture", response.status, response.statusText)
        alert("Error! Tu imagen no se ha subido")
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
  }

  return (
    <div className="container mt-3 justify-content-center">
      <div className='col-12 justify-content-center'>
        <p className="mb-4 text-center red-color">{t('traduccion44')}</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="file"
              className="form-control-sm"
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>
          <button type="submit" className="btn-custom red-background justify-content-center">{t('traduccion45')}</button>
        </form>
        <img src={imageUrl}></img>
      </div>
    </div>
  );
};

