import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/flatProfile.css";
import { Favorites } from "../component/Favorites.jsx";
import { PhotoGalleryRooms } from "./PhotoGalleryRooms.jsx";
import { Link } from "react-router-dom";

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
                    <div className="row">
                    <h3 className="red-color mb-6 pb-6 col-8">{store.currentRoom.title}</h3>
                    {store.userData.is_landlord && store.userData.id_landlord == store.currentFlat.id_landlord ?
                    <Link to={`/uploadroomimg/${store.currentRoom.id}`} className="fotos-add-custom mb-2 col-4">Añadir fotos</Link>
                    : ""}
                    </div>
                    <div className="photo-container">
                    
                            <PhotoGalleryRooms userId={store.currentRoom.id} />
                  
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

