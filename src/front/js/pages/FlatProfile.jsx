import React, { useEffect, useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import "../../styles/flatProfile.css";
import { PhotoGallery } from "../component/PhotoGallery.jsx";
import { NoAccess } from "./NoAccess.jsx";
import { PhotoGalleryRooms } from "./PhotoGalleryRooms.jsx";

export const FlatProfile = () => {
    const { store, actions } = useContext(Context);

    const handleRoom = (id) => {
        actions.setRoomId(id)
    }

    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [postcode, setPostcode] = useState('');
    const [city, setCity] = useState('');

    const handleDescription = (event) => {
        setDescription(event.target.value)
    }
    const handleAddress = (event) => {
        setAddress(event.target.value)
    }
    const handlePostcode = (event) => {
        setPostcode(event.target.value)
    }
    const handleCity = (event) => {
        setCity(event.target.value)
    }

    const initializeModal = () => {
        setDescription(store.currentFlat.description);
        setAddress(store.currentFlat.address);
        setPostcode(store.currentFlat.postal_code);
        setCity(store.currentFlat.city);
    }

    const handleModalReset = () => {
        setDescription('');
        setAddress('');
        setPostcode('');
        setCity('');
    }

    const handleModalSubmit = (event) => {
        event.preventDefault();
        const dataToSend = {
            description: description,
            address: address,
            postal_code: postcode,
            city: city,
            id_landlord: store.userData.id_landlord
        }
       
        actions.putFlat(dataToSend, store.accessToken, store.currentFlat.id);
        handleModalReset();
    }
    useEffect(() => {
        actions.getFlatsId()
    }, [])

    return (
        <>
            {store.currentFlat.id == undefined ?
                <NoAccess/>
                :
                <>
                <div className="flat-profile-container">
                    <div className="container">
                    <div className="modal fade" id="flatModal" tabIndex="-1" aria-labelledby="flatModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5" id="flatModalLabel">Editar mi piso</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                        <div className="mb-3">
                                            <div className="mb-2">
                                                <label htmlFor="FormControlFlatDescription" className="form-label">Descripción:</label>
                                                <input type="string" className="form-control" id="FormControlFlatDescription" onChange={handleDescription} placeholder={store.currentFlat.description} />
                                            </div>
                                            <div className="mb-2">
                                                <label htmlFor="FormControlFlatAddress" className="form-label">Dirección:</label>
                                                <input type="string" className="form-control" id="FormControlFlatAddress" onChange={handleAddress} placeholder={store.currentFlat.address} />
                                            </div>
                                            <div className="mb-2">
                                                <label htmlFor="FormControlFlatPostcode" className="form-label">Código postal:</label>
                                                <input type="float" className="form-control" id="FormControlFlatPostcode" onChange={handlePostcode} placeholder={store.currentFlat.postal_code} />
                                            </div>
                                            <div className="mb-2">
                                                <label htmlFor="FormControlFlatCity" className="form-label">Ciudad:</label>
                                                <input type="float" className="form-control" id="FormControlFlatCity" onChange={handleCity} placeholder={store.currentFlat.city} />
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

                    <div className="header-custom container-flex row">
                    <h3 className="red-color col-8">{store.currentFlat.address} </h3>
                    {store.userData.is_landlord && store.userData.id_landlord == store.currentFlat.id_landlord ?
                    <Link to={`/editimg/${store.currentFlat.id}`} className="fotos-add-custom col-4">Añadir fotos</Link>
                    :
                     "" }
                    </div>
                    </div>
                    <div className="photo-container">
                        
                            <PhotoGallery userId={store.currentFlat.id} />
                        
                                                    
                    </div>
                    <p>{store.currentFlat.description}</p>
                    <div className="row">
                        {store.userData.is_landlord && store.userData.id_landlord == store.currentFlat.id_landlord ?
                            <div>
                            <button className="btn-custom red-background mx-2 mb-2" data-bs-toggle="modal" data-bs-target="#flatModal" onClick={initializeModal}> <i className="fas fa-edit"></i> Editar</button>
                               
                                <Link to={`/uploadroom/${store.currentFlat.id}`} className="btn-custom send-button red-background mb-2">Añadir habitacion</Link>
                             
                            </div>      
                          :
                          ""

                        }
                    </div>

                    <div className="row justify-content-evenly">
                        {!store.rooms.length > 0 ?
                            ""
                            :
                            <>
                                {store.rooms.map((item, key) =>
                                    <>
                                        {item.id_flat === store.currentFlat.id ?
                                            <div key={key} className="col-4">
                                                <div className="rooms-container">
                                                    <div className="photo-container">
                                                        <PhotoGalleryRooms roomId={item.id} />
                                                    </div>
                                                    <div className="room">
                                                        <h3 className="red-color">{item.title}</h3>
                                                        <p>{item.description}</p>
                                                        <div className='d-flex justify-content-evenly'>
                                                            <p className='price'><strong>Precio:</strong> {item.price}€</p>
                                                            <p className='price'><strong>Superficie:</strong> {item.square_meters}m2</p>
                                                        </div>
                                                        <Link className="detalles mt-1 mb-4" to={`/RoomProfile/${item.id}`} onClick={() => handleRoom(item.id)}>
                                                            <strong>Ver Habitacion</strong>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            ""
                                        }
                                    </>
                                )}
                            </>
                        }
                    </div>
                </div>
            </>
            }
        </>
    );
};
