import React, { useState, useContext } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import mapImageUrl from "../../img/mapa-bcn.jpg";
import contactoImageUrl from "../../img/foto-contacto.png";
import "../../styles/home.css";
import { useTranslation } from 'react-i18next';
import { PhotoGallery } from "../component/PhotoGallery.jsx";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [lastName, setLastname] = useState('');
	const [message, setMessage] = useState('');
	const { t, i18n } = useTranslation();

	const handleSubmit = (event) => {
		event.preventDefault();
		const dataToSend = {
			name: name,
			lastName: lastName,
			email: email,
			message: message
		}
	}
	if(store.flats.length>0){
		console.log(store.flats[store.flats.length-1].id)
	}

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


			<div className="section-custom contacto-container">
				<h2 className="red-color">Contacto</h2>
				<div className="form-container">
					<div className="w-40">
						<p>
							Subheading for description or instructions
						</p>
						<form onSubmit={handleSubmit}>
							<div className="mb-3">
								<label htmlFor="inputName" className="form-label red-color">First name</label>
								<input type="text" className="form-control" id="inputName"
									value={name} onChange={(event) => setName(event.target.value)} />
							</div>
							<div className="mb-3">
								<label htmlFor="inputLastame" className="form-label red-color">Last name</label>
								<input type="text" className="form-control" id="inputLastame"
									value={lastName} onChange={(event) => setLastname(event.target.value)} />
							</div>
							<div className="mb-3">
								<label htmlFor="inputContactEmail" className="form-label red-color">Email address</label>
								<input type="email" className="form-control" id="inputContactEmail" aria-describedby="emailHelp"
									value={email} onChange={(event) => setEmail(event.target.value)} />
							</div>
							<div className="mb-3">
								<label htmlFor="inputMessage" className="form-label red-color">Your message</label>
								<textarea type="text" className="form-control" id="inputMessage" aria-describedby="messageHelp"
									value={message} onChange={(event) => setMessage(event.target.value)} ></textarea>

							</div>
							<button type="submit" className="btn-custom red-background">Submit</button>
						</form>
					</div>
					<div className="w-60">
						<img src={contactoImageUrl} />
					</div>
				</div>
			</div>
		</div>
	);
};
