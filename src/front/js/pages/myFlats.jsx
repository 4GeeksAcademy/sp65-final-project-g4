import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { PhotoGallery } from "../component/PhotoGallery.jsx";


export const MyFlats = () => {
    const {store, actions } = useContext(Context);

    const currentUser = store.userData;
    console.log(currentUser);
    if (!currentUser || !currentUser.id_landlord) {
        return <div className="container mt-4 red-color">
            <h4 className="text-light mb-4">Mis pisos publicados</h4>
            <p>No tienes pisos publicados</p>
        </div>;
    }

    const myFlats = store.flats.filter(flat => flat.id_landlord === currentUser.id_landlord);

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
                        <div className="col-4" key={item.id}>
                            <div className="card">
                                <PhotoGallery userId={item.id} />
                                <div className="card-body">
                                    <h5>{item.address}</h5>
                                    <p>{item.city}</p>
                                    <p>{item.description}</p>
                                </div>
                                <Link to={`/FlatProfile/${item.id}`} className="detalles mt-1 mb-4"><strong>Ver detalles</strong></Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
        </>
    )
}