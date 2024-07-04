import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import mapImageUrl from "../../img/mapa-bcn.jpg";

const Geocode = (props) => {
    const [address, setAddress] = useState(`${props.item.address}, ${props.item.postal_code}, ${props.item.city}`);
    const [coordinates, setCoordinates] = useState({ lat: 0, lon: 0 });
    const [error, setError] = useState(null);

    useEffect(() => {
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
        getCoordinates(address);
    }, [])

    return (
        <Marker position={[coordinates.lat, coordinates.lon]}>
            <Popup>
                <Link to={`/FlatProfile/${props.item.id}`} onClick={() => handleFlat(props.item.id)}>
                    <img src={mapImageUrl} style={{ marginBottom: "20px"}}/>
                    <h3 className='red-color'>{props.item.address}</h3>
                    <p>{props.item.description.substring(0, 50)}...</p>
                </Link>
            </Popup>
        </Marker>
    );
};

export default Geocode;