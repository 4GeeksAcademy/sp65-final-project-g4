import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { PhotoGallery } from "../component/PhotoGallery.jsx";
import { NoAccess } from "./NoAccess.jsx";
import "../../styles/cardsviews.css";


export const MyFlats = () => {
    const {store, actions } = useContext(Context);

    const currentUser = store.userData;
    console.log(currentUser);
    if (!currentUser || !currentUser.id_landlord) {
        return <div className="container mt-4 red-color">
            <NoAccess/>
        </div>;
    }

    const myFlats = store.flats.filter(flat => flat.id_landlord === currentUser.id_landlord);

    const handleFlat = (id) => {
		actions.setFlatId(id)
	}

    useEffect(() => {
        actions.getFlats();
    }, []);

    return (
        <>
         <div className="container mt-4">
            <h3 className="red-color mb-4 text-center">Mis pisos publicados</h3>
            {myFlats.length === 0 ? (
                <h3 className="mb-4 text-center">No tienes pisos publicados</h3>
            ) : (
                <div className="row">
                    {myFlats.map((item, index) => (
                        <div className="col-lg-3 col-md-4 col-sm-6 col-xsm-12 view-container" key={item.id}>
                          
                                <PhotoGallery userId={item.id} className="photo-container" />
                          
                                <div className="view-text">
                                    <h5>{item.address}</h5>
                                    <p>{item.city}</p>
                                    <p className="description">{item.description}</p>
                                </div>
                                <div className="red-color float-end">
                                    <Link to={`/FlatProfile/${item.id}`} className="red-color link-custom mt-1 mb-4" onClick={() => handleFlat(item.id)}><strong>Ver detalles</strong></Link>
                                </div>
                            </div>
                        
                    ))}
                </div>
            )}
        </div>
        </>
    )
}