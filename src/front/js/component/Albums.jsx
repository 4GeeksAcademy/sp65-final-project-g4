import React, { useState, useContext } from "react";
import { Context } from "../store/appContext.js";

export const UploadImage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const { store, actions } = useContext(Context);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleFileChange2 = (event) => {
    setSelectedFile2(event.target.files[0]);
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
        alert("Your picture has been sucessfully uploaded")
      } else {
        console.log("Error uploading picture", response.status, response.statusText)
        alert("Error! Your picture has not been uploaded")
      }
    } else {
      alert('Please, select a file to upload');
    }
  };

  const handleSubmit2 = async (event) => {
    event.preventDefault();
    if (selectedFile2) {
      const formData = new FormData();
      formData.append("img", selectedFile2);
      const url = `${process.env.BACKEND_URL}/api/photoflats`
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
  }

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className='col-12'>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <input
              type="file"
              className="form-control"
              onChange={handleFileChange}
              accept="image/*"
            />
          </div>
          <button type="submit" className="btn btn-primary">Subir tus fotos</button>
        </form>
        <img src={imageUrl}></img>
      </div>

      <div className='col-5'>
        <h2 className="mb-4 display-6 text-center">Upload user pictures</h2>
        <form onSubmit={handleSubmit2}>
          <div className="form-group mb-3">
            <input
              type="file"
              className="form-control"
              onChange={handleFileChange2}
              accept="image/*"
            />
          </div>
          <button type="submit" className="btn btn-primary">Upload picture</button>
        </form>
        <img src={imageUrl}></img>
      </div>

    </div>
  );
};

