import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import "../../styles/map.css";
import { Flats } from "../component/Flats.jsx";
import { Universities } from "../component/Universities.jsx";

export const Map = () => {
    const { store, actions } = useContext(Context);

    const [radio, setRadio] = useState({
        lat: 0,
        lon: 0,
        distance: 100
    });
    const [price, setPrice] = useState({ min: 0, max: 1000 });
    const [surface, setSurface] = useState(false);

    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;

    };

    const handleUniversity = (coords) => {
        var str_array = coords.split(',');

        for (var i = 0; i < str_array.length; i++) {
            // Trim the excess whitespace.
            str_array[i] = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
        }
        let temp = radio
        temp.lat = str_array[0]
        temp.lon = str_array[1]
        setRadio(temp)
    };

    const handleRadio = (distanceValue) => {
        let temp = radio
        temp.distance = distanceValue
        setRadio(temp)
    };

    const handleMinChange = (e) => {
        const newMin = parseInt(e.target.value, 10);
        if (newMin <= price.max) {
            setPrice({ ...price, min: newMin });
        }
    };
    const handleMaxChange = (e) => {
        const newMax = parseInt(e.target.value, 10);
        if (newMax >= price.min) {
            setPrice({ ...price, max: newMax });
        }
    };

    const handleSurface = (surfaceValue) => {
        setSurface(surfaceValue)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes manejar el envío del formulario, como enviar los datos a un servidor
        console.log('Formulario enviado:', formData);
    };

    useEffect(() => {
        actions.getUniversities()
    }, []);


    return (
        <div className="map-container">
            <div className="filter-menu">
                <form onSubmit={handleSubmit}>
                    <div className="filter-item">
                        <label className="legend">Universidades</label>
                        <div>
                            <select name="" id="" onChange={(event) => handleUniversity(event.target.value)}>
                                <option>Todas las universidades</option>
                                {!store.universities ?
                                    ""
                                    :
                                    <>
                                        {store.universities.map((item, key) =>
                                            <option key={key} value={[item.latitude, item.longitude]}>{item.name}</option>
                                        )}
                                    </>
                                }
                            </select>
                        </div>
                    </div>
                    <div className="filter-item">
                        <label className="legend">Radio de busqueda</label>
                        <div>
                            <select name="" id="" onChange={(event) => handleRadio(event.target.value)}>
                                <option value={100}>Todas las distancias</option>
                                <option value={1}>1km</option>
                                <option value={5}>5km</option>
                                <option value={10}>10km</option>
                            </select>
                        </div>
                    </div>
                    <div className="filter-item">
                        <div>
                            <label className="legend">
                                Min Price: {price.min}
                                <input
                                    type="range"
                                    min="0"
                                    max="1000"
                                    value={price.min}
                                    onChange={handleMinChange}
                                />
                            </label>
                            <label className="legend">
                                Max Price: {price.max}
                                <input
                                    type="range"
                                    min="0"
                                    max="1000"
                                    value={price.max}
                                    onChange={handleMaxChange}
                                />
                            </label>
                        </div>
                    </div>
                    <div className="filter-item">
                        <label className="legend">Superfície Minima</label>
                        <div>
                            <select name="" id="" onChange={(event) => handleSurface(event.target.value)}>
                                <option value={0}>Todas</option>
                                <option value={30}>30m2</option>
                                <option value={60}>60m2</option>
                                <option value={90}>90m2</option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>
            <MapContainer center={[41.3851, 2.1734]} zoom={14} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {!store.flats ?
                    ""
                    :
                    <>
                        {store.flats.map((item, key) =>
                            <Flats key={key} item={item} filters={{ radio, price, surface }} />
                        )}
                    </>
                }
                {!store.universities ?
                    ""
                    :
                    <>
                        {store.universities.map((item, key) =>
                            <Universities key={key} item={item} />
                        )}
                    </>
                }
            </MapContainer>
        </div>
    );
};
