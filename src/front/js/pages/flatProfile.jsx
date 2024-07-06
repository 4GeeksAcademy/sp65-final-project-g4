import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/flatProfile.css";
import { PhotoGallery } from "../component/PhotoGallery.jsx";

export const FlatProfile = () => {
    const { store, actions } = useContext(Context);
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
                </div>
            }
        </>
    );
};
