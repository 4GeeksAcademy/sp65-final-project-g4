import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/flatProfile.css";
import { PhotoGallery } from "../component/PhotoGallery.jsx";

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
                    <div className="photo-container">
                        {!store.currentRoom.image_url_1 || !store.currentRoom.image_url_2 ?

                            "Upload img button send to modal"
                            :
                            <PhotoGallery userId={store.currentRoom.id} />}
                    </div>
                    <h2 className="red-color">{store.currentRoom.title}</h2>
                    <p>{store.currentRoom.description}</p>
                    <p className='price'><strong>Precio:</strong> {store.currentRoom.price}€</p>
                    <p className='price'><strong>Superficie:</strong> {store.currentRoom.square_meters}m2</p>
                    <p>{store.currentRoom.publication_date}</p>
                    {store.userData.is_landlord && store.userData.id_landlord == store.currentFlat.id_landlord ?
                        <div>
                            <button className="btn-custom red-background mx-2 mb-2">Editar perfil</button>
                            <button className="btn-custom red-background mb-2">Añadir habitacion</button>
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

