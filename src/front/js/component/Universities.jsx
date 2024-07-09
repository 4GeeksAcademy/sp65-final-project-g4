import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import uniMapPointer from "../../img/uni-map-pointer.png";

export const Universities = (props) => {
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
    const customIcon = new L.Icon({
        iconUrl: uniMapPointer,
        iconSize: [50, 50], // Tamaño del icono
        iconAnchor: [16, 32], // Punto del icono que estará anclado a la coordenada (centrado inferior)
        popupAnchor: [0, -32] // Punto desde donde se abrirá el popup
      });

    return (
        <Marker position={[props.item.latitude, props.item.longitude]} icon={customIcon}>
            <Popup>
                 <h3 className='red-color'>{props.item.name}</h3>
            </Popup>
        </Marker>
    );
};