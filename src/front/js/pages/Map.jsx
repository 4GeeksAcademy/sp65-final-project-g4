import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import "../../styles/map.css";
import { Flats } from "../component/Flats.jsx";
import { Universities } from "../component/Universities.jsx";
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next';
export const Map = () => {
    const { t, i18n } = useTranslation();
    const { store, actions } = useContext(Context);
    const [lat, setLat] = useState(0);
    const [lon, setLon] = useState(0);
    const [distance, setDistance] = useState(100);
    const [price, setPrice] = useState({ min: 0, max: 1000 });
    const [surface, setSurface] = useState(false);

    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });

    const handleUniversity = (coords) => {
        var str_array = coords.split(',');
        for (var i = 0; i < str_array.length; i++) {
            // Trim the excess whitespace.
            str_array[i] = str_array[i].replace(/^\s*/, "").replace(/\s*$/, "");
        }
        setLat(str_array[0])
        setLon(str_array[1])
    };

    const handleRadio = (distanceValue) => {
        setDistance(distanceValue)
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

    useEffect(() => {
        actions.getUniversities()
    }, []);


    return (
        <motion.div 
		initial={{opacity: 0}}
        animate={{opacity: 1, transition: {duration: 0.5, delay: 0.5}}}
		exit={{opacity: 0, transition: {duration: 1}}}
         className="map-container">
            <div className="filter-menu">
                <form>
                    <div className="filter-item">
                        <label className="legend">{t('traduccion6')}</label>
                        <div>
                            <select name="university" onChange={(event) => handleUniversity(event.target.value)}>
                                <option>{t('traduccion7')}</option>
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
                            <select name="radio" onChange={(event) => handleRadio(event.target.value)}>
                                <option value={100}>{t('traduccion8')}</option>
                                <option value={1}>1km</option>
                                <option value={5}>5km</option>
                                <option value={10}>10km</option>
                            </select>
                        </div>
                    </div>
                    <div className="filter-item">
                        <div>
                            <label className="legend">
                            {t('traduccion9')}: {price.min}
                                <input
                                    type="range"
                                    min="0"
                                    max="1000"
                                    value={price.min}
                                    onChange={handleMinChange}
                                />
                            </label>
                            <label className="legend">
                            {t('traduccion10')}: {price.max}
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
                        <label className="legend">{t('traduccion11')}</label>
                        <div>
                            <select name="" id="" onChange={(event) => handleSurface(event.target.value)}>
                                <option value={0}>{t('traduccion12')}</option>
                                <option value={5}>5m²</option>
                                <option value={10}>10m²</option>
                                <option value={15}>15m²</option>
                            </select>
                        </div>
                    </div>
                </form>
            </div>
            <MapContainer center={[41.3851, 2.1734]} position="topright" zoom={14} style={{ height: "100%", width: "100%" }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {!store.flats ?
                    ""
                    :
                    <>
                        {store.flats.map((item, key) =>
                            <Flats key={key} item={item} filters={{ lat, lon, distance, price, surface }} />
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
        </motion.div>
    );
};
