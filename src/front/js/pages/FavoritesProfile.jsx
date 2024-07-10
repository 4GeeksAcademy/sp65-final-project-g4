import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import "../../styles/flatProfile.css";
import { PhotoGallery } from "../component/PhotoGallery.jsx";
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export const FavoritesProfile = () => {
    const { t, i18n } = useTranslation();
    const { store, actions } = useContext(Context);

    const handleRoom = (id) => {
        actions.setRoomId(id)
    }

    useEffect(() => {

    }, [])

    return (
        
        <motion.div 
		initial={{opacity: 0}}
		animate={{opacity: 1, transition: {duration: 0.5, delay: 0.5}}}
		exit={{opacity: 0, transition: {duration: 1}}}
        className="flat-profile-container">
            <div className="row justify-content-evenly">
                {store.favorites.filter(obj => obj.id_student == store.userData.id).map(item =>
                    <>
                        {store.rooms.filter(obj => obj.id == item.id_room).map((item2, key) =>
                            <div key={key} className="col-lg-4 col-md-6 col-sm-12 mt-4">
                                <div className="rooms-container">
                                    <div className="photo-container">
                                        <PhotoGallery userId={item2.id} />
                                    </div>
                                    <div className="room">
                                        <h3 className="red-color">{item2.title}</h3>
                                        <p>{item2.description}</p>
                                        <div className='d-flex justify-content-evenly'>
                                            <p className='price'><strong>{t('traduccion14')}:</strong> {item2.price}€</p>
                                            <p className='price'><strong>{t('traduccion15')}:</strong> {item2.square_meters}m2</p>
                                        </div>
                                        <Link className="detalles mt-1 mb-4" to={`/RoomProfile/${item2.id}`} onClick={() => handleRoom(item2.id)}>
                                            <strong>{t('traduccion27')}</strong>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </motion.div>
    )
}
