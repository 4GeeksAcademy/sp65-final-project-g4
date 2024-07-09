import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/flatProfile.css";
import { PhotoGallery } from "../component/PhotoGallery.jsx";
import { Favorites } from "../component/Favorites.jsx";

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
                        <PhotoGallery userId={store.currentRoom.id} />
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

