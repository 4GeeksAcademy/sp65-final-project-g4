import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/flatProfile.css";
import { PhotoGallery } from "../component/PhotoGallery.jsx";

export const RoomProfile = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getRoomId()
    }, [])

    return (
        <>
            {store.currentRoom.id == undefined ?
                ""
                :
                <div className="flat-profile-container">
                    <div className="photo-container">
                        <PhotoGallery userId={store.currentRoom.id} />
                    </div>
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
