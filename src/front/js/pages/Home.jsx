import React, { useState, useContext } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import mapImageUrl from "../../img/mapa-bcn.jpg";
import "../../styles/home.css";
import { useTranslation } from 'react-i18next';
import { PhotoGallery } from "../component/PhotoGallery.jsx";
import { Contacto } from "./Contacto.jsx";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const { t, i18n } = useTranslation();

	

	const handleFlat = (id) => {
        actions.setFlatId(id)
    }

	return (
		<div className="container-custom">
			<div className="image-container">
				<img src={mapImageUrl} />
				<div className="title-container">
					<h1 className="red-color">{t('title')}</h1>
					<h2 className="red-color"> {t('description')}</h2>
					<Link to="/map">
						<button className="btn-custom red-background">Ver Mapa</button>
					</Link>
				</div>
			</div>

			{!store.flats.length>0 ?
				""
				:
				<div className="pisos-container section-custom">
					<h2 className="red-color">Pisos Recientes</h2>
					<div className="piso-container">
						{store.flats.map((item, key) =>
							<div key={key} className="piso">
								<div className="photo-container">
									<PhotoGallery userId={item.id}/>
								</div>
								<h3 className="red-color">{item.address}</h3>
								<p>{item.description.substring(0, 50)}...</p>
								<Link to={`/FlatProfile/${item.id}`} onClick={() => handleFlat(item.id)}>
									<button className="btn-custom red-background">Ver Piso</button>
								</Link>
							</div>
						)}
					</div>
				</div>
			}


			<div className="section-custom justify-content-center">
				<Contacto/>
			</div>
		</div>
	);
};
