import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";
import "../../styles/sidebar.css";
import getState from "../store/flux.js";
import { useNavigate } from "react-router-dom";
import { Login } from "./Login.jsx";



export const Dashboard = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	const [name, setName] = useState('');
	const [lastname, setLastname] = useState('');
	const [birthDate, setBirthDate] = useState('');
	const [dni, setDni] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [urlImage, setUrlImage] = useState('');

	const handleName = (event) => {
		setName(event.target.value)
	}
	const handleLastname = (event) => {
		setLastname(event.target.value)
	}
	const handleBirthDate = (event) => {
		setBirthDate(event.target.value)
	}
	const handleDni = (event) => {
		setDni(event.target.value)
	}
	const handlePhoneNumber = (event) => {
		setPhoneNumber(event.target.value)
	}
	const handleUrlImage = (event) => {
		setUrlImage(event.target.value)
	}

	const handleModalReset = () => {
		setName('');
		setLastname('');
		setBirthDate('');
		setDni('');
		setPhoneNumber('');
		setUrlImage('');
	}

	const handleModalSubmit = (event) => {
		event.preventDefault();
		const dataToSend = {
			id_university: 1,
			name: name,
			lastname: lastname,
			birth_date: birthDate,
			dni: dni,
			phone_number: phoneNumber,
			profile_picture: urlImage
		}
		actions.putStudent(dataToSend, store.accessToken, store.userData.id);
		handleModalReset();
	}

	const handleLogout = () => {
		actions.userLogout()
	}


	/* if (store.isLogedIn != true) {
		navigate('/signup')
	} */

	return (
		<>
			{!store.isLogedIn ?
				<Login />
				:
				<div className="row gx-0 overflow">
					<div className="col-3 d-flex sidebar-custom">
						<div className="d-flex flex-column flex-shrink-0 p-2">
							<ul className="nav nav-pills flex-column mb-auto">
								<li className="nav-item">
									<Link href="#" className="nav-link" aria-current="page">
										Perfil
									</Link>
								</li>
								<li>
									<Link href="#" className="nav-link">
										Favoritos
									</Link>
								</li>
								<li>
									<Link href="#" className="nav-link">
										Mensajes
									</Link>
								</li>
							</ul>
							<Link to="/">
								<button className="btn-custom red-background" onClick={handleLogout}> <i className="fas fa-sign-out-alt"></i> Desconectar</button>
							</Link>
						</div>
					</div>
					<div className="modal fade" id="profileModal" tabIndex="-1" aria-labelledby="profileModalLabel" aria-hidden="true">
						<div className="modal-dialog">
							<div className="modal-content">
								<div className="modal-header">
									<h1 className="modal-title fs-5" id="profileModalLabel">Editar mi perfil</h1>
									<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
								</div>
								<div className="modal-body">
									<div className="mb-3">
										<div className="mb-2">
											<label htmlFor="FormControlName" className="form-label">Nombre:</label>
											<input type="string" className="form-control" id="FormControlName" onChange={handleName} />
										</div>
										<div className="mb-2">
											<label htmlFor="FormControlLastName" className="form-label">Apellidos:</label>
											<input type="string" className="form-control" id="FormControlLastName" onChange={handleLastname} />
										</div>
										<div className="mb-2">
											<label htmlFor="FormControlBirthDate" className="form-label">Fecha de nacimiento:</label>
											<input type="date" className="form-control" id="FormControlBirthDate" onChange={handleBirthDate} />
										</div>
										<div className="mb-2">
											<label htmlFor="FormControlDni" className="form-label">DNI:</label>
											<input type="string" className="form-control" id="FormControlDni" onChange={handleDni} />
										</div>
										<div className="mb-2">
											<label htmlFor="FormControlPhoneNumber" className="form-label">Teléfono:</label>
											<input type="int" className="form-control" id="FormControlPhoneNumber" onChange={handlePhoneNumber} />
										</div>
										{/* input imagen preguntar Victoria */}
									</div>
								</div>
								<div className="modal-footer">
									<button type="button" className="btn-custom btn-secondary" data-bs-dismiss="modal" onClick={handleModalReset}>Close</button>
									<button type="submit" className="btn-custom red-background" data-bs-dismiss="modal" onClick={handleModalSubmit}>Save changes</button>
								</div>
							</div>
						</div>
					</div>
					<div className="col-9 d-flex">
						<div className="d-flex flex-column flex-shrink-0 p-2">
							<ul className="list-group list-group-flush">
								<li className="list-group-item">E-mail: {store.userData.email ? store.userData.email : 'Pendiente de cumplimentar'}</li>
								<li className="list-group-item">Nombre: {store.userData.student_name != ' ' ? store.userData.student_name : 'Pendiente de cumplimentar'}</li>
								<li className="list-group-item">Apellidos: {store.userData.student_lastname != ' ' ? store.userData.student_lastname : 'Pendiente de cumplimentar'}</li>
								<li className="list-group-item">Fecha de nacimiento: {store.userData.birth_date ? store.userData.birth_date : 'Pendiente de cumplimentar'}</li>
								<li className="list-group-item">DNI: {store.userData.dni != ' ' ? store.userData.dni : 'Pendiente de cumplimentar'}</li>
								<li className="list-group-item">Teléfono: {store.userData.phone_number ? store.userData.phone_number : 'Pendiente de cumplimentar'}</li>
								<li className="list-group-item">Foto de perfil: {store.userData.profile_picture ? store.userData.profile_picture : 'Pendiente de cumplimentar'}</li>
							</ul>
							<button className="btn-custom red-background" data-bs-toggle="modal" data-bs-target="#profileModal"> <i className="fas fa-edit"></i> Editar mi perfil</button>
						</div>
					</div>

				</div>
			}
		</>

	);
};
