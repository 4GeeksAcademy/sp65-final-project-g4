import React, { useContext } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import mapImageUrl from "../../img/mapa-bcn.jpg";
import contactoImageUrl from "../../img/foto-contacto.png";
import "../../styles/home.css";


export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="container-custom">
			<div className="image-container section-custom">
				<img src={mapImageUrl} />
				<div className="title-container">
					<h1 className="red-color">Lorem ipsum</h1>
					<h2 className="red-color"> Dolor, sit amet consec</h2>
					<Link to="/map">
						<button className="btn-custom red-background">Ver Mapa</button>
					</Link>
				</div>
			</div>
			<div className="pisos-container section-custom">
				<h2 className="red-color">Pisos Recientes</h2>
				<div className="piso-container">
					<div className="piso">
						<img src={mapImageUrl} />
						<h3 className="red-color">Titulo</h3>
						<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
						<Link to="/map">
							<button className="btn-custom red-background">Ver Piso</button>
						</Link>
					</div>
					<div className="piso">
						<img src={mapImageUrl} />
						<h3 className="red-color">Titulo</h3>
						<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
						<Link to="/map">
							<button className="btn-custom red-background">Ver Piso</button>
						</Link>
					</div>
					<div className="piso">
						<img src={mapImageUrl} />
						<h3 className="red-color">Titulo</h3>
						<p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
						<Link to="/map">
							<button className="btn-custom red-background">Ver Piso</button>
						</Link>
					</div>
				</div>
			</div>
			<div className="section-custom contacto-container">
				<h2 className="red-color">Contacto</h2>
				<div className="form-container">
					<div className="w-50">
						<form></form>
					</div>
					<div className="w-50">
					<img src={contactoImageUrl} />
					</div>
				</div>
			</div>
		</div>
	);
};
