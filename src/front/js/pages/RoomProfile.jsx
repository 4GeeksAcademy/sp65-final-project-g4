import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/flatProfile.css";
import { Favorites } from "../component/Favorites.jsx";
import { PhotoGalleryRooms } from "./PhotoGalleryRooms.jsx";
import { Link, useNavigate } from "react-router-dom";
import { PhotoGallery } from "../component/PhotoGallery.jsx";

export const RoomProfile = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const handleCreateChat = () =>{
        actions.createChat();
       /*  const newChatId = 
        navigate('/chats/${newChatId}') */
    }

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

    useEffect(() => {
        actions.getRoomId();
        actions.getRooms();
    }, [])
    

    return (
        <>
            {store.currentRoom.id == undefined ?
                "Habitación no encontrada"
                :
                <div className="flat-profile-container">
                    <div className="row">
                        <div className="modal fade" id="roomModal" tabIndex="-1" aria-labelledby="roomModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="roomModalLabel">Editar mi habitación</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="mb-3">
                                            <div className="mb-2">
                                                <label htmlFor="FormControlRoomTitle" className="form-label">Título:</label>
                                                <input type="string" className="form-control" id="FormControlRoomTitle" onChange={handleTitle} placeholder={store.currentRoom.title} />
                                            </div>
                                            <div className="mb-2">
                                                <label htmlFor="FormControlRoomDescription" className="form-label">Descripción:</label>
                                                <input type="string" className="form-control" id="FormControlRoomDescription" onChange={handleDescription} placeholder={store.currentRoom.description} />
                                            </div>
                                            <div className="mb-2">
                                                <label htmlFor="FormControlRoomPrice" className="form-label">Precio:</label>
                                                <input type="float" className="form-control" id="FormControlRoomPrice" onChange={handlePrice} placeholder={store.currentRoom.price} />
                                            </div>
                                            <div className="mb-2">
                                                <label htmlFor="FormControlRoomSquareMeters" className="form-label">Metros cuadrados:</label>
                                                <input type="float" className="form-control" id="FormControlRoomSquareMeters" onChange={handleSquareMeters} placeholder={store.currentRoom.square_meters} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn-custom btn-secondary" data-bs-dismiss="modal" onClick={handleModalReset}>Close</button>
                                        <button type="submit" className="btn-custom red-background" data-bs-dismiss="modal" onClick={handleModalSubmit}>Save changes</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h3 className="red-color mb-6 pb-6 col-8">{store.currentRoom.title}</h3>
                        {store.userData.is_landlord && store.userData.id_landlord == store.currentFlat.id_landlord ?
                            <Link to={`/uploadroomimg/${store.currentRoom.id}`} className="fotos-add-custom mb-2 col-4">Añadir fotos</Link>
                            :
                            <Link to={`/FlatProfile/${store.currentRoom.id_flat}`} className="fotos-add-custom mb-2 col-4">Ver piso</Link>
                        }

                    </div>


                    <div className="photo-container">
                        <PhotoGalleryRooms roomId={store.currentRoom.id} />
                    </div>
                    <p className="mt-5"><strong>Descripción: </strong>{store.currentRoom.description}</p>
                    <p className='price'><strong>Precio:</strong> {store.currentRoom.price}€</p>
                    <p className='price'><strong>Superficie:</strong> {store.currentRoom.square_meters}m2</p>
                    <p><strong>Publicado el: </strong>{store.currentRoom.publication_date}</p>
                    {store.userData.is_landlord && store.userData.id_landlord == store.currentFlat.id_landlord ?
                        <div>
                            <button className="btn-custom red-background mx-2 mb-2" data-bs-toggle="modal" data-bs-target="#roomModal" onClick={initializeModal}> <i className="fas fa-edit"></i> Editar</button>
                        </div>
                        :
                        <button className="btn-custom red-background mx-2 mb-2" onClick={handleCreateChat()}>Contacta</button>

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
        </>
    );
};

