import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import { NoAccess } from "./NoAccess.jsx";
import { useNavigate } from "react-router-dom";

export const UploadFlats = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        description: "",
        address: "",
        postal_code: "",
        city: "",
        
    });

   /*  const handleNewFlatId = (id) => {
        actions.setFlatId(id)
    } */

   /*  const handleNewFlatId = () => store.flats.id */
    const handleNewFlatId = () => {
    if (store.flats.length > 0) {
        return store.flats[store.flats.length - 1].id;
      }
    }

    const handleSubmit = () => {
        console.log("Saving data...", formData);
        actions.createNewFlat(formData);
        actions.setEditingFlat(formData);
        console.log(store.editingFlat);
        const newFlatId = handleNewFlatId();
            navigate(`/FlatProfile/${newFlatId}`);
        }

    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return(
        <>
        {store.userData.is_student ? <NoAccess/>
        :
        <div className="container mt-3 mb-2">
            <div className="row d-flex justify-content-center ">
                <div className="col-xsm-12 col-sm-11 col-md-10 col-lg-8 ">
                        <h3 className="red-color mb-2 mt-2 text-center">Publica tu piso</h3>
                    <div className="card-body">
                        <h6> Paso 1: Describe tu piso</h6>
                        <p>Describe como es tu piso, cuantas habitaciones tiene, requisitos de entrada y cualqueir informacion que consideres relevante para tus futuros inquilinos</p>
                        <textarea 
                            className="form-control"
                            rows="2"
                            type="text"
                            name="description"
                            placeholder="Descripción"
                            value={formData.description}
                            onChange={handleChange}>
                        </textarea>
                        <h6 className="mt-4 mb-4"> Paso 2: ¿En dónde está ubicado?</h6>
                        <p className="mb-0 pb-0">Calle y número</p>
                            <input className="form-control mb-3"
                            type="text"
                            name="address"
                            placeholder="Calle, XY"
                            value={formData.address}
                            onChange={handleChange}
                            />
                        <p className="mb-0 pb-0">Código postal</p>
                        <input className="form-control mb-3"
                                                type="text"
                                                name="postal_code"
                                                placeholder="08000"
                                                value={formData.postal_code}
                                                onChange={handleChange}
                                                aria-label="default input example"
                                            />
                        <p className="mb-0 pb-0">Ciudad</p>
                        <input className="form-control mb-3"
                                                type="text"
                                                name="city"
                                                placeholder="Barcelona"
                                                value={formData.city}
                                                onChange={handleChange}
                                                aria-label="default input example"
                                            />
                        <button className="send-button btn-custom red-background mt-1 mb-4" onClick={() => handleSubmit()}>Publicar y subir fotos</button>
                        </div>
                </div>
            </div>
        </div>
}
        </>
    )
}