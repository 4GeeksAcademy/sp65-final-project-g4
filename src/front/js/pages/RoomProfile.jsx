import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/flatProfile.css";
import { Favorites } from "../component/Favorites.jsx";
import { PhotoGalleryRooms } from "./PhotoGalleryRooms.jsx";
import { Link, useNavigate } from "react-router-dom";
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next';

export const RoomProfile = () => {
    const { t, i18n } = useTranslation();
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [squareMeters, setSquareMeters] = useState('');

    const handleTitle = (event) => {
        setTitle(event.target.value)
    }
    const handleDescription = (event) => {
        setDescription(event.target.value)
    }
    const handlePrice = (event) => {
        setPrice(event.target.value)
    }
    const handleSquareMeters = (event) => {
        setSquareMeters(event.target.value)
    }

    const initializeModal = () => {
        setTitle(store.currentRoom.title);
        setDescription(store.currentRoom.description);
        setPrice(store.currentRoom.price);
        setSquareMeters(store.currentRoom.square_meters);
    }

    const handleModalReset = () => {
        setTitle('');
        setDescription('');
        setPrice('');
        setSquareMeters('');
    }

    const handleModalSubmit = (event) => {
        event.preventDefault();
        const dataToSend = {
            title: title,
            description: description,
            price: price,
            square_meters: squareMeters,
            id_flat: store.currentRoom.id_flat
        }
       
        actions.putRoom(dataToSend, store.accessToken, store.currentRoom.id);
        handleModalReset();
    }

    const createChat = async () => {
        const currentFlat = store.flats.find(flat => flat.id === store.currentRoom.id_flat)
        if (!currentFlat) {
            console.error("Current flat not found");
            return;
        }
    
        const chat = {
            room_id: store.currentRoom.id,
            landlord_id: currentFlat.landlord_user_id  
        };
    
        const url = `${process.env.BACKEND_URL}/api/chats`;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${store.accessToken}`
            },
            body: JSON.stringify(chat)
        };

        const response = await fetch(url, options);
        if (!response.ok) {
            console.log("Error creating chat:", response.statusText);
            return;
        }

        const newChat = await response.json();
        actions.setChatId(newChat.redirect)
        if (newChat.redirect) {
            navigate(`/chats/${newChat.redirect}`)
        }

        await actions.getAllChats();
        actions.createNewChat(newChat)
    };

    const handleCreateChat = () => {
        createChat()
            .then(() => console.log("Chat created successfully"))
            .catch(error => console.error("Failed to create chat:", error));
    };

    useEffect(() => {
        actions.getRoomId();
        actions.getRooms();
    }, []);
    

    return (
        <motion.div 
		initial={{opacity: 0}}
        animate={{opacity: 1, transition: {duration: 0.5, delay: 0.5}}}
		exit={{opacity: 0, transition: {duration: 1}}}>
            {store.currentRoom.id == undefined ?
                "Habitación no encontrada"
                :
                <div className="flat-profile-container">
                    <div className="row">
                        <div className="modal fade" id="roomModal" tabIndex="-1" aria-labelledby="roomModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="roomModalLabel">{t('traduccion28')}</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="mb-3">
                                            <div className="mb-2">
                                                <label htmlFor="FormControlRoomTitle" className="form-label">{t('traduccion29')}:</label>
                                                <input type="string" className="form-control" id="FormControlRoomTitle" onChange={handleTitle} placeholder={store.currentRoom.title} />
                                            </div>
                                            <div className="mb-2">
                                                <label htmlFor="FormControlRoomDescription" className="form-label">{t('traduccion18')}:</label>
                                                <input type="string" className="form-control" id="FormControlRoomDescription" onChange={handleDescription} placeholder={store.currentRoom.description} />
                                            </div>
                                            <div className="mb-2">
                                                <label htmlFor="FormControlRoomPrice" className="form-label">{t('traduccion14')}:</label>
                                                <input type="float" className="form-control" id="FormControlRoomPrice" onChange={handlePrice} placeholder={store.currentRoom.price} />
                                            </div>
                                            <div className="mb-2">
                                                <label htmlFor="FormControlRoomSquareMeters" className="form-label">{t('traduccion30')}:</label>
                                                <input type="float" className="form-control" id="FormControlRoomSquareMeters" onChange={handleSquareMeters} placeholder={store.currentRoom.square_meters} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn-custom btn-secondary" data-bs-dismiss="modal" onClick={handleModalReset}>{t('traduccion22')}</button>
                                        <button type="submit" className="btn-custom red-background" data-bs-dismiss="modal" onClick={handleModalSubmit}>{t('traduccion23')}</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h3 className="red-color mb-6 pb-6 col-8">{store.currentRoom.title}</h3>
                        {store.userData.is_landlord && store.userData.id_landlord == store.currentFlat.id_landlord ?
                            <Link to={`/uploadroomimg/${store.currentRoom.id}`} className="fotos-add-custom mb-2 col-4">{t('traduccion24')}</Link>
                            :
                            <Link to={`/FlatProfile/${store.currentRoom.id_flat}`} className="fotos-add-custom mb-2 col-4">{t('traduccion5')}</Link>
                        }

                    </div>


                    <div className="photo-container">
                        <PhotoGalleryRooms roomId={store.currentRoom.id} />
                    </div>
                    <p className="mt-5"><strong>{t('traduccion18')}: </strong>{store.currentRoom.description}</p>
                    <p className='price'><strong>{t('traduccion14')}:</strong> {store.currentRoom.price}€</p>
                    <p className='price'><strong>{t('traduccion15')}:</strong> {store.currentRoom.square_meters}m²</p>
                    <p><strong>Publicado el: </strong>{store.currentRoom.publication_date}</p>
                    {store.userData.is_landlord && store.userData.id_landlord == store.currentFlat.id_landlord ?
                        <button className="btn-custom red-background mx-2 mb-2" data-bs-toggle="modal" data-bs-target="#roomModal" onClick={initializeModal}> <i className="fas fa-edit"></i> {t('traduccion25')}</button>
                        :
                        <button className="btn-custom send-button red-background mb-2" onClick={handleCreateChat}>{t('traduccion31')}</button>

                    }
                    {store.userData.is_student ?
                        <div>
                            <Favorites id={store.currentRoom.id} />
                        </div>
                        :
                        ""
                    }
                </div>
            }
        </motion.div>
    );
};

