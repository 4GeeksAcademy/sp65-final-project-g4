import React, { useState, useContext } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import mapImageUrl from "../../img/mapa-bcn.jpg";
import "../../styles/home.css";
import { useTranslation } from 'react-i18next';
import { PhotoGallery } from "../component/PhotoGallery.jsx";
import { Contacto } from "./Contacto.jsx";
import { motion } from 'framer-motion'

export const Home = () => {
	const { store, actions } = useContext(Context);
	const { t, i18n } = useTranslation();

	const handleFlat = (id) => {
		actions.setFlatId(id)
	}

	return (
		<motion.div 
		initial={{opacity: 0}}
		animate={{opacity: 1, transition: {duration: 0.5, delay: 0.5}}}
		exit={{opacity: 0, transition: {duration: 1}}}
		className="home-container"
		>
			<div className="row justify-content-center">
				<div className="col-12">
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
				</div>
			</div>


			{!store.flats.length > 0 ?
				""
				:
				<div className="row justify-content-between section-custom">
					<h2 className="red-color">Pisos Recientes</h2>
					{store.flats.slice(0, 3).map((item, key) =>
						<div key={key} className="col-lg-4 col-md-6 col-sm-12 mt-4">
							<div className="piso-container">
								<div className="photo-container">
									<PhotoGallery userId={item.id} />
								</div>
								<div className="piso">
									<h3 className="red-color">{item.address}</h3>
									<p>{item.description.substring(0, 50)}...</p>
									<Link className="detalles mt-1 mb-4" to={`/FlatProfile/${item.id}`} onClick={() => handleFlat(item.id)}>
										<strong>Ver Piso</strong>
									</Link>
								</div>
							</div>
						</div>
					)}
				</div>

			}

			<div className="section-custom justify-content-center">
				<Contacto />
			</div>
		</motion.div>
	);
};
