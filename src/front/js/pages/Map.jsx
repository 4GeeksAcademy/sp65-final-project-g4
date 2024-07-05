import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import "../../styles/map.css";
import Geocode from "../component/Geocode.jsx";


export const Map = () => {
    const { store, actions } = useContext(Context);

    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });

    return (
        <div className="map-container">
            <div className="filter-menu">
                <form>
                    <div className="filter-item">
                        <span className="legend">Universidades</span>
                        <div>
                            <select name="" id="">
                                <option>Todas las universidades</option>
                                <option>UB</option>
                                <option>UPC</option>
                                <option>Pompeu Fabra</option>
                            </select>
                        </div>
                    </div>
                    <div className="filter-item">
                        <span className="legend">Radio de busqueda</span>
                        <div>
                            <select name="" id="">
                                <option>Todas las distancias</option>
                                <option>1km</option>
                                <option>5km</option>
                                <option>10km</option>
                            </select>
                        </div>
                    </div>
                    <div className="filter-item">
                        <span className="legend">Precio</span>
                        <div>
                            <select name="" id="">
                                <option>Todos los precios</option>
                                <option>300</option>
                                <option>400</option>
                                <option>500</option>
                            </select>
                        </div>
                    </div>
                    <div className="filter-item">
                        <span className="legend">Habitaciones</span>
                        <div>
                            <select name="" id="">
                                <option>Todas las habitaciones</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3+</option>
                            </select>
                        </div>
                    </div>
                    <div className="filter-item">
                        <span className="legend">Superfície</span>
                        <div>
                            <select name="" id="">
                                <option>Todas</option>
                                <option>40m2</option>
                                <option>60m2</option>
                                <option>80m2</option>
                            </select>
                        </div>
                    </div>
                    <div className="filter-item">
                        <span className="legend">Fecha de publicación</span>
                        <div>
                            <select name="" id="">
                                <option>Todas las ofertas</option>
                                <option>1semana</option>
                                <option>1mes</option>
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
                            <Geocode key={key} item={item} />
                        )}
                    </>
                }
            </MapContainer>
        </div>
    );
};
