import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import mapImageUrl from "../../img/mapa-bcn.jpg";

export const Flats = (props) => {
    const [address, setAddress] = useState(`${props.item.address}, ${props.item.postal_code}, ${props.item.city}`);
    const [isVisible, setIsVisible] = useState(true);
    const [coordinates, setCoordinates] = useState({ lat: 0, lon: 0 });
    const [error, setError] = useState(null);

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
        if(filterOptions.radio.lat !== 0 && filterOptions.radio.lon !== 0 && coordinates.lon !== 0 && coordinates.lat !== 0) {
            const toRadians = (degrees) => degrees * (Math.PI / 180);
            let lat1 = toRadians(coordinates.lat);
            let lon1 = toRadians(coordinates.lon);
            let lat2 = toRadians(filterOptions.radio.lat);
            let lon2 = toRadians(filterOptions.radio.lon);
            const dLat = lat2 - lat1;
            const dLon = lon2 - lon1;
            const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
            const R = 6371; // Radio de la Tierra en kilómetros
            const calcDistance = R * c;
            if(calcDistance > filterOptions.radio.distance) setIsVisible(false)
            return
        }
        if(filterOptions.price){
            console.log("price")
        }
        if(filterOptions.rooms){
            console.log("rooms")
        }
        if(filterOptions.surface){
            console.log("surface")
        }
        if(filterOptions.date){
            console.log("date")
        }
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
        { !isVisible ?
                    ""
                    :
                    <Marker position={[coordinates.lat, coordinates.lon]}>
                    <Popup>
                        <Link to={`/FlatProfile/${props.item.id}`} onClick={() => handleFlat(props.item.id)}>
                            <img src={mapImageUrl} style={{ marginBottom: "20px" }} />
                            <h3 className='red-color'>{props.item.address}</h3>
                            <p>{props.item.description.substring(0, 50)}...</p>
                        </Link>
                    </Popup>
                </Marker>
                }
        
        </>
        
    );
};