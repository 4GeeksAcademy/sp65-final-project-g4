import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/flatProfile.css";


export const FlatProfile = () => {
    const { store, actions } = useContext(Context);
    const fetchImages = async () => {
        const response = await fetch(`${process.env.BACKEND_URL}/api/images/1`);
        if (!response.ok) {
            console.log("Error loading message from backend", response.status, response.statusText)
            return
        }
        const data = await response.json()
        console.log(data)
    };
    useEffect(() => {
        fetchImages()
        actions.getFlatsId()
    }, [])

    return (
        <div className="flat-profile-container">
            <h2 className="red-color">{store.currentFlat.address}</h2>
            <p>{store.currentFlat.description}</p>
        </div>
    );
};
