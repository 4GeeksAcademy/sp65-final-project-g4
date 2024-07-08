import React, { useEffect, useState, useContext } from 'react';
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import axios from 'axios';
import { Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { PhotoGallery } from "../component/PhotoGallery.jsx";

export const Flats = (props) => {
    const { store, actions } = useContext(Context);
    const [address, setAddress] = useState(`${props.item.address}, ${props.item.postal_code}, ${props.item.city}`);
    const [isVisible, setIsVisible] = useState(true);
    const [coordinates, setCoordinates] = useState({ lat: 0, lon: 0 });
    const [error, setError] = useState(null);
    const [contents, setContents] = useState([]);

    const getCoordinates = async (address) => {
        try {
            const response = await axios.get('https://nominatim.openstreetmap.org/search', {
                params: {
                    q: address,
                    format: 'json',
                    addressdetails: 1,
                    limit: 1
                }
            });
            if (response.data.length > 0) {
                const location = response.data[0];
                setCoordinates({ lat: location.lat, lon: location.lon });
                setError(null);
            } else {
                setError('No results found.');
            }
        } catch (error) {
            setError('Error retrieving data.');
        }

    };

    const filterHandle = (filterOptions) => {
        console.log("hi")
        if (filterOptions.lat !== 0 && filterOptions.lon !== 0 && coordinates.lon !== 0 && coordinates.lat !== 0) {
            const toRadians = (degrees) => degrees * (Math.PI / 180);
            let lat1 = toRadians(coordinates.lat);
            let lon1 = toRadians(coordinates.lon);
            let lat2 = toRadians(filterOptions.lat);
            let lon2 = toRadians(filterOptions.lon);
            const dLat = lat2 - lat1;
            const dLon = lon2 - lon1;
            const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

            const R = 6371; // Radio de la Tierra en kilómetros
            const calcDistance = R * c;
            if (calcDistance > filterOptions.distance) setIsVisible(false)
        }
        if (filterOptions.price) {
            const rooms = store.rooms.filter(room => room.id_flat === props.item.id);
            let i = 0

            rooms.map(item => {
                if ((filterOptions.price.max < item.price) || (filterOptions.price.min > item.price)) i++
            })
            if (i == rooms.length) setIsVisible(false)
        }
        if (filterOptions.surface) {
            const rooms = store.rooms.filter(room => room.id_flat === props.item.id);
            let i = 0
            rooms.map(item => {
                if (filterOptions.surface > item.square_meters) i++
            })
            if (i == rooms.length) setIsVisible(false)
        }
    }

    const handleFlat = (id) => {
        actions.setFlatId(id)
    }

    useEffect(() => {
        getCoordinates(address);
    }, [])

    useEffect(() => {
        setIsVisible(true)
        filterHandle(props.filters)
    }, [coordinates, props])

    return (
        <>
            {!isVisible ?
                ""
                :
                <Marker position={[coordinates.lat, coordinates.lon]}>
                    <Popup>
                        <div className="photo-container">
                            <PhotoGallery userId={props.item.id} />
                        </div>
                        <Link id={props.item.id} to={`/FlatProfile/${props.item.id}`} onClick={() => handleFlat(props.item.id)}>

                            <h3 className='red-color mt-2'>{props.item.address}</h3>
                            <p>{props.item.description.substring(0, 50)}...</p>
                            {!store.rooms.length > 0 ?
                                ""
                                :
                                <>
                                    <p>Habitaciones disponibles: {store.rooms.filter(room => room.id_flat === props.item.id).length}</p>
                                    <div className='d-flex justify-content-evenly room-info-container'>
                                        <span>
                                            <p><strong>Habitacion:</strong></p>
                                            <p><strong>Precio:</strong></p>
                                            <p><strong>Superficie:</strong></p>
                                        </span>
                                        {store.rooms.filter(room => room.id_flat === props.item.id).map((item, key) =>
                                            <span>
                                                <p><strong>{key+1}</strong></p>
                                                <p className='price'>{item.price}€</p>
                                                <p className='price'>{item.square_meters}m2</p>
                                            </span>
                                        )}
                                    </div>
                                </>
                            }
                        </Link>
                    </Popup>
                </Marker>
            }

        </>

    );
};