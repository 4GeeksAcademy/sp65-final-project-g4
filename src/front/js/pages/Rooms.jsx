import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { PhotoGallery } from "../component/PhotoGallery.jsx";
import { Link } from "react-router-dom";
import { PhotoGalleryRooms } from "./PhotoGalleryRooms.jsx";
import "../../styles/cardsviews.css";
import { useTranslation } from 'react-i18next';


export const AllRooms = () => {
    const { t, i18n } = useTranslation();
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
            <h3 className="red-color text-center mb-4">{t('traduccion72')}</h3>
            {!store.rooms ?
                "Pantalla de carga"
                :
                <div>
                    <div className="row">
                        <div className="col-md-2 col-lg-3 col-sm-3 col-xs-12">
                            <div className="sort-buttons justify-content-left">
                                <p><strong>{t('traduccion73')}</strong></p>
                                <button className="sort-btn-custom" onClick={() => handleSort('price')}><i className="fa-solid fa-sort sort-btn-custom"></i>{t('traduccion14')}</button>
                                <button className="sort-btn-custom" onClick={() => handleSort('square_meters')}><i className="fa-solid fa-sort sort-btn-custom"></i>{t('traduccion15')}</button>
                                <button className="sort-btn-custom" onClick={() => handleSort('publication_date')}><i className="fa-solid fa-sort sort-btn-custom"></i>{t('traduccion75')}</button>
                            </div>
                            <div className="filter-inputs mt-3">
                                <p><strong>{t('traduccion74')}</strong></p>
                                <div>
                                    <label>{t('traduccion9')}</label>
                                    <input type="number" name="min" value={priceFilter.min} onChange={handlePriceFilterChange} />
                                    <label>{t('traduccion10')}</label>
                                    <input type="number" name="max" value={priceFilter.max} onChange={handlePriceFilterChange} />
                                </div>
                                <div>
                                    <label>{t('traduccion76')}</label>
                                    <input type="number" name="min" value={squareMetersFilter.min} onChange={handleSquareMetersFilterChange} />
                                    <label>{t('traduccion77')}</label>
                                    <input type="number" name="max" value={squareMetersFilter.max} onChange={handleSquareMetersFilterChange} />
                                </div>
                            </div>
                        </div>
                        {filteredAndSortedRooms.map((item, index) => (
                            <div className="col-md-5 col-lg-3 col-sm-6 col-xs-12 view-container" key={index}>
                                <div className="photo-container">
                                    <PhotoGalleryRooms roomId={item.id} />
                                </div>
                                <div className="view-text">
                                    <h5>{item.title}</h5>
                                    <p>{item.price} €</p>
                                    <p className="description">{item.description}</p>
                                    <p>{item.square_meters}m²</p>
                                    <p>{t('traduccion78')} {item.publication_date}</p>
                                </div>
                                <div className="d-flex justify-content-between ml-0 pl-0">
                                    <Link to={`/roomprofile/${item.id}`} className="send-button action-btn-custom mt-1" onClick={() => handleRoom(item.id)}>
                                        <strong>{t('traduccion68')}</strong>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                    )
                </div>
            }
        </div>
    );
};