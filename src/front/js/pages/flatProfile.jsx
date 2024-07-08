import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import "../../styles/flatProfile.css";
import { PhotoGallery } from "../component/PhotoGallery.jsx";

export const FlatProfile = () => {
    const { store, actions } = useContext(Context);

    const handleRoom = (id) => {
        actions.setRoomId(id)
    }

    useEffect(() => {
        actions.getFlatsId()
    }, [])

    return (
        <>
            {store.currentFlat.id == undefined ?
                ""
                :
                <div className="flat-profile-container">
                    <div className="photo-container">
                        <PhotoGallery userId={store.currentFlat.id} />
                    </div>
                    <h2 className="red-color">{store.currentFlat.address}</h2>
                    <p>{store.currentFlat.description}</p>
                    <Link to={`/uploadroom/${store.currentFlat.id}`}> Añadir habitación </Link>    
                                   
                    <div className="row justify-content-evenly">
                        {!store.rooms.length > 0 ?
                            ""
                            :
                            <>
                                {store.rooms.map((item, key) =>
                                    <>
                                        {item.id_flat === store.currentFlat.id ?
                                            <div className="col-4">
                                                <div className="rooms-container">
                                                    <div className="photo-container">
                                                        <PhotoGallery userId={item.id} />
                                                    </div>
                                                    <div key={key} className="room">
                                                        <h3>{item.title}</h3>
                                                        <p>{item.description}</p>
                                                        
                                                        <Link to={`/RoomProfile/${item.id}`} onClick={() => handleRoom(item.id)}>
                                                            <button className="btn-custom red-background">Ver Habitacion</button>
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
            }
        </>
    );
};
