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
                    // logica para saber si es el Landlord de este Room para abrir modal de upload
                    {!item.image_url_1 || !item.image_url_2 ? 

                          "Upload img button send to modal"
                         : 
                        <PhotoGallery userId={store.currentRoom.id} />}
                    </div>
                    // logica para saber si es el Landlord de este Room para abrir modal de edit
                    <h2 className="red-color">{store.currentRoom.title}</h2>
                    <p>{store.currentRoom.description}</p>
                    <p>{store.currentRoom.price}</p>
                    <p>{store.currentRoom.square_meters}</p>
                    <p>{store.currentRoom.publication_date}</p>
                </div>
            }
        </>
    );
};