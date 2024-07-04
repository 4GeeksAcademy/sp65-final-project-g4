import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/flatProfile.css";


export const FlatProfile = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getFlatsId()
    }, [])

    return (
        <div className="flat-profile-container">
            <h2 className="red-color">{store.currentFlat.address}</h2>
            <p>{store.currentFlat.description}</p>
        </div>
    );
};
