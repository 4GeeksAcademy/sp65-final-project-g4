import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/flatProfile.css";
import { PhotoGallery } from "../component/PhotoGallery.jsx";
import { PhotoGalleryRooms } from "./PhotoGalleryRooms.jsx";

export const RoomProfile = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getRoomId();
        actions.getRooms();
    }, [])

    return (
        <>
            {store.currentRoom.id == undefined ?
                "Vacio"
                :
                <div className="flat-profile-container">
                    <h3 className="red-color mb-6 pb-6">{store.currentRoom.title}</h3>
                    <div className="photo-container">
                    {store.currentRoom.image_url_1 || store.currentRoom.image_url_2  ? (
                            <PhotoGalleryRooms roomId={store.currentRoom.id} />
                        ) : (
                            <div className="upload-first-photo container d-flex justify-content-center mt-6 pt-6">
                                <Link to={`/uploadflatimg/${store.currentFlat.id}`} className="btn-custom send-button red-background mb-2">Sube fotos de tu piso</Link>
                            </div>
                        )}
                    </div>
                    <p className="mt-5"><strong>Descripción: </strong>{store.currentRoom.description}</p>
                    <p className='price'><strong>Precio:</strong> {store.currentRoom.price}€</p>
                    <p className='price'><strong>Superficie:</strong> {store.currentRoom.square_meters}m2</p>
                    <p><strong>Publicado el: </strong>{store.currentRoom.publication_date}</p>
                    {store.userData.is_landlord && store.userData.id_landlord == store.currentFlat.id_landlord ?
                        <div>
                            <button className="btn-custom red-background mx-2 mb-2">Editar</button>
                        </div>
                        :
                        ""
                    }
                    {store.userData.is_student ?
                        <div>
                            <button className="btn-custom red-background mx-2 mb-2">Añadir a favoritos</button>
                        </div>
                        :
                        ""
                    }
                </div>
            }
        </>
    );

};

