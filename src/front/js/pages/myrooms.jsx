import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { PhotoGallery } from "../component/PhotoGallery.jsx";
import { NoAccess } from "./NoAccess.jsx";
import { PhotoGalleryRooms } from "./PhotoGalleryRooms.jsx";
import "../../styles/cardsviews.css";


export const MyRooms = () => {
    const {store, actions } = useContext(Context);

    const currentUser = store.userData;
    if (!currentUser || !currentUser.id_landlord) {
        return <div className="container mt-4 red-color">
            <NoAccess/>
        </div>;
    }

    const myFlats = store.flats.filter(flat => flat.id_landlord === currentUser.id_landlord);
    const myFlatIds = myFlats.map(flat => flat.id);
    // Filter rooms by flat IDs
    const mrooms = store.rooms.filter(room => myFlatIds.includes(room.id_flat));
    console.log(myFlats);
    console.log(mrooms);

    useEffect(() => {
        actions.getFlats();
        actions.getRooms();
    }, []);

    return (
        <>
         <div className="container mt-4">
            <h3 className="red-color mb-4 text-center">Mis habitaciones publicadas</h3>
            {mrooms.length === 0 ? (
                <h3 className="mb-4 text-center">No tienes habitaciones publicadas</h3>
            ) : (
                <div className="row ">
                    {mrooms.map((item, index) => (
                        <div className="col-lg-3 col-md-4 col-sm-6 col-xsm-12 view-container" key={item.id}>
                            <div className="photo-container">
                                <PhotoGalleryRooms roomId={item.id} />
                            </div>
                            <div className="view-text">
                                    <h5>{item.address}</h5>
                                    <p>{item.city}</p>
                                    <p className="description">{item.description}</p>
                                </div>
                                <div className="red-color float-end">
                                    <Link to={`/roomprofile/${item.id}`} className="red-color link-custom mt-1 mb-4" onClick={() => handleFlat(item.id)}><strong>Ver detalles</strong></Link>
                                </div>
                            </div>
                        
                    ))}
                </div>
            )}
        </div>
        </>
    )
}