import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { PhotoGallery } from "../component/PhotoGallery.jsx";
import { Link } from "react-router-dom";

export const AllRooms = () => {
    const { store, actions } = useContext(Context);
    const [sortCriteria, setSortCriteria] = useState('publication_date');
    const [sortOrder, setSortOrder] = useState('asc');
    const [priceFilter, setPriceFilter] = useState({ min: 0, max: Infinity });
    const [squareMetersFilter, setSquareMetersFilter] = useState({ min: 0, max: Infinity });


    const handleRoom = (id) => {
        actions.setRoomId(id);
    };

    useEffect(() => {
        actions.getRooms();
    }, []);

    const handleSort = (criteria) => {
        const order = (sortCriteria === criteria && sortOrder === 'asc') ? 'desc' : 'asc';
        setSortCriteria(criteria);
        setSortOrder(order);
    };

    const sortRooms = (rooms) => {
        return rooms.sort((a, b) => {
            let comparison = 0;

            if (a[sortCriteria] > b[sortCriteria]) {
                comparison = 1;
            } else if (a[sortCriteria] < b[sortCriteria]) {
                comparison = -1;
            }

            return sortOrder === 'asc' ? comparison : -comparison;
        });
    };

    const filterRooms = (rooms) => {
        return rooms.filter((room) => {
            return room.price >= priceFilter.min && room.price <= priceFilter.max &&
                room.square_meters >= squareMetersFilter.min && room.square_meters <= squareMetersFilter.max;
        });
    };

    const handlePriceFilterChange = (e) => {
        const { name, value } = e.target;
        setPriceFilter((prevFilter) => ({ ...prevFilter, [name]: Number(value) }));
    };

    const handleSquareMetersFilterChange = (e) => {
        const { name, value } = e.target;
        setSquareMetersFilter((prevFilter) => ({ ...prevFilter, [name]: Number(value) }));
    };

    const filteredAndSortedRooms = store.rooms ? sortRooms(filterRooms([...store.rooms])) : [];


    return (
        <div className="container mt-4">
            <h3 className="red-color text-center mb-4">Habitaciones publicadas</h3>
            {!store.rooms ? (
                "Pantalla de carga"
            ) : (
                <div>
                    <div className="row">
                        <div className="col-md-3 col-lg-3 col-sm-3 col-xs-12">
                            <div className="sort-buttons justify-content-left">
                                <p><strong>Ordenar por:</strong></p>
                                <button className="sort-btn-custom" onClick={() => handleSort('price')}><i class="fa-solid fa-sort sort-btn-custom"></i>Precio</button>
                                <button className="sort-btn-custom" onClick={() => handleSort('square_meters')}><i class="fa-solid fa-sort sort-btn-custom"></i>Tamaño</button>
                                <button className="sort-btn-custom" onClick={() => handleSort('publication_date')}><i class="fa-solid fa-sort sort-btn-custom"></i>Fecha de publicación</button>
                            </div>
                            <div className="filter-inputs mt-3">
                            <p><strong>Filtrar por:</strong></p>
                            <div>
                                <label>Precio mínimo</label>
                                <input type="number" name="min" value={priceFilter.min} onChange={handlePriceFilterChange} />
                                <label>Precio máximo</label>
                                <input type="number" name="max" value={priceFilter.max} onChange={handlePriceFilterChange} />
                            </div>
                            <div>
                                <label>Mínimo m²</label>
                                <input type="number" name="min" value={squareMetersFilter.min} onChange={handleSquareMetersFilterChange} />
                                <label>Máximo m²</label>
                                <input type="number" name="max" value={squareMetersFilter.max} onChange={handleSquareMetersFilterChange} />
                            </div>
                        </div>
                    </div>
                        {filteredAndSortedRooms.map((item, index) => (
                            <div className="col-md-3 col-lg-3 col-sm-6 col-xs-12" key={index}>
                                <div className="card">
                                    <img src="https://cdn.autonomous.ai/static/upload/images/common/upload/20220507/Where-To-Put-A-Desk-In-Bedroom-6-Options_27391ab6a55.jpg" alt="Room picture" />
                                    <div className="card-body">
                                        <h5>{item.title}</h5>
                                        <p>{item.price} €</p>
                                        <p>{item.description}</p>
                                        <p>{item.square_meters}m²</p>
                                        <p>Publicado el {item.publication_date}</p>
                                        <div className="d-flex justify-content-between ml-0 pl-0">
                                        <Link to={`/roomprofile/${item.id}`} className="send-button action-btn-custom mt-1" onClick={() => handleRoom(item.id)}>
                                                <strong>Ver detalle</strong>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};