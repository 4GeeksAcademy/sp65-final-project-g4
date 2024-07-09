import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { NoAccess } from "./NoAccess.jsx";
import { useNavigate } from "react-router-dom";

export const UploadRooms = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        square_meters: "",
        image_url_1: "",
        image_url_2: "",
        id_flat: store.currentFlat?.id || "",
        flat_img: store.currentFlat?.id_album || "",
    });

    const handleRoomId = (id) => {
        actions.setRoomId(id)
    }

    /* const newRoom = store.rooms[store.rooms.length - 1];
    if (newRoom) {
        const roomId = (newRoom.id)+1;
   
 } */

    const handleSubmit = () => {
        console.log("Saving data...", formData);
        actions.createNewRoom(formData);
        const newRoom = store.rooms[store.rooms.length - 1];
        if (newRoom) {
            const roomId = (newRoom.id) + 1;
            navigate(`/roomprofile/${roomId}`)
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            flat_img: store.currentFlat?.id_album || "",
            room_id: store.currentFlat?.id || ""
        }));
    }, [store.currentFlat]);


    return (
        <>
            {store.userData.is_student ? <NoAccess />
                :
                <>
                    <div className="container mt-3 mb-2">
                        <div className="row d-flex justify-content-center ">
                            <div className="col-xsm-12 col-sm-11 col-md-10 col-lg-8 ">
                                <h3 className="red-color mb-2 mt-2 text-center">Publica una habitación</h3>
                                <div className="card-body">
                                    <h6> Título </h6>
                                    <input className="form-control mb-3"
                                        type="text"
                                        name="title"
                                        placeholder="ej.habitación doble, exterior"
                                        value={formData.title}
                                        onChange={handleChange}
                                    />
                                    <h6 >Descripción</h6>
                                    <textarea
                                        className="form-control"
                                        rows="2"
                                        type="text"
                                        name="description"
                                        placeholder="ej. Con armario, escritorio... "
                                        value={formData.description}
                                        onChange={handleChange}>
                                    </textarea>
                                    <h6 className="mt-4 mb-4"> Precio </h6>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">€</span>
                                        <input type="text" className="form-control"
                                            aria-label="Amount (to the nearest dollar)"
                                            name="price"
                                            placeholder="000"
                                            value={formData.price}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <h6>Metros cuadrados</h6>
                                    <input className="form-control mb-3"
                                        type="text"
                                        name="square_meters"
                                        placeholder="20"
                                        value={formData.square_meters}
                                        onChange={handleChange}
                                        aria-label="default input example"
                                    />
                                    <button className="send-button btn-custom red-background mt-1 mb-4" onClick={() => { handleSubmit(); handleRoomId() }}>Publicar y subir fotos</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}