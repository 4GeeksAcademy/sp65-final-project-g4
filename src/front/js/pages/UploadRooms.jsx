import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { NoAccess } from "./NoAccess.jsx";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export const UploadRooms = () => {
    const { t, i18n } = useTranslation();
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        square_meters: "",
        id_flat: store.currentFlat?.id || "",
        flat_img: store.currentFlat?.id_album || "",
    });

    const handleRoomId = (id) => {
        actions.setRoomId(id)
    }

    const handleSubmit = () => {
        console.log("Saving data...", formData);
        createNewRoom(formData);
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const createNewRoom = async (dataToSend) => {
        const url = `${process.env.BACKEND_URL}/api/rooms`;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${store.accessToken}`					
            },
            body: JSON.stringify(dataToSend)
        }

        const response = await fetch(url, options);
    
        if (!response.ok) {
            console.log("Error");
            return;
        }
        const newRoom = await response.json();
        actions.setRoomId(newRoom.redirect)
        if (newRoom.redirect) { 
            navigate(`/roomprofile/${newRoom.redirect}`)
         }  
        await actions.getRooms();
        actions.createNewRoom(newRoom)
    };

    useEffect(() => {
        setFormData((prevData) => ({
            ...prevData,
            flat_img: store.currentFlat?.id_album || "",
            room_id: store.currentFlat?.id || ""
        }));
    }, [store.currentFlat]);


    return (
        <motion.div 
		initial={{opacity: 0}}
		animate={{opacity: 1, transition: {duration: 0.5, delay: 0.5}}}
		exit={{opacity: 0, transition: {duration: 1}}}>
            {store.userData.is_student ? <NoAccess />
                :
                <>
                    <div className="container mt-3 mb-2">
                        <div className="row d-flex justify-content-center ">
                            <div className="col-xsm-12 col-sm-11 col-md-10 col-lg-8 ">
                                <h3 className="red-color mb-2 mt-2 text-center">{t('traduccion91')}</h3>
                                <div className="card-body">
                                    <h6> {t('traduccion29')} </h6>
                                    <input className="form-control mb-3"
                                        type="text"
                                        name="title"
                                        placeholder="ej.habitación doble, exterior"
                                        value={formData.title}
                                        onChange={handleChange}
                                    />
                                    <h6 >{t('traduccion18')}</h6>
                                    <textarea
                                        className="form-control"
                                        rows="2"
                                        type="text"
                                        name="description"
                                        placeholder="ej. Con armario, escritorio... "
                                        value={formData.description}
                                        onChange={handleChange}>
                                    </textarea>
                                    <h6 className="mt-4 mb-4"> {t('traduccion14')} </h6>
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
                                    <h6>{t('traduccion30')}</h6>
                                    <input className="form-control mb-3"
                                        type="text"
                                        name="square_meters"
                                        placeholder="20"
                                        value={formData.square_meters}
                                        onChange={handleChange}
                                        aria-label="default input example"
                                    />
                                    <button className="send-button btn-custom red-background mt-1 mb-4" onClick={() => { handleSubmit(); handleRoomId() }}>{t('traduccion90')}</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </motion.div>
    )
}