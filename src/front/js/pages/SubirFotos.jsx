import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Navigate, useNavigate } from "react-router-dom";


export const EditImg = () => {

    const {store, actions} = useContext(Context);
    const [selectedFile, setSelectedFile] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const navigate = useNavigate();

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };
    

    const handleSubmit = (event) => {
        event.preventDefault();
        uploadToCloudinary();
        
    }

    const uploadToCloudinary = async () => {
        if (selectedFile) {
            const formData = new FormData();
            formData.append("img", selectedFile);
            const flatID = store.currentFlat.id
            const url = `${process.env.BACKEND_URL}/api/photoflats/${flatID}`;
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
                /* actions.settingLastProfPicUrl(data.img_url) */
                alert("Tu foto se ha subido correctamente")
              } else {
                console.log("Error uploading picture", response.status, response.statusText)
                alert("Lo sentimos! Tu foto no se ha subido")
              }
            } else {
              alert('Por favor, selecciona un archivo para subir');
            }
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
        <img src={imageUrl}></img>
          <button className="send-button btn-custom red-background mt-1"><strong>Publicar</strong></button>
      </div>
    </div>
    )
}