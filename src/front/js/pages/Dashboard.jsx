import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";
import "../../styles/sidebar.css";
import getState from "../store/flux.js";
import { useNavigate } from "react-router-dom";
import { Login } from "./Login.jsx";
import { Signup } from "./Signup.jsx";
import { UploadImagesUsers } from "../component/UploadImagesUsers.jsx";

import profilePicture from "../../img/placeholder-profile-picture.jpg";


export const Dashboard = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();

	const [university, setUniversity] = useState('');
	const [name, setName] = useState('');
	const [lastname, setLastname] = useState('');
	const [birthDate, setBirthDate] = useState('');
	const [dni, setDni] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [selectedFile, setSelectedFile] = useState(null);
	const [urlImage, setUrlImage] = useState('');


	const handleUniversity = (event) => {
		setUniversity(event.target.value)
	}
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
	const handleFileChange = (event) => {
		setSelectedFile(event.target.files[0]);
	};

	const handleImgSubmit = async (event) => {
		event.preventDefault();
		if (selectedFile) {
			const formData = new FormData();
			formData.append("img", selectedFile);
			const url = `${process.env.BACKEND_URL}/api/photo`
			const options = {
				method: "POST",
				headers: {
					'Authorization': `Bearer ${store.accessToken}`
				},
				body: formData,
			}
			const response = await fetch(url, options);

			if (response.ok) {
				const data = await response.json();
				setUrlImage(data.img_url);
				console.log("Sucessful uploading", data.img_url)
				localStorage.setItem('profileImageUrl', data.img_url)
			} else {
				console.log("Error uploading picture", response.status, response.statusText)
				alert("Error! Tu imagen no se ha subido")
			}
		} else {
			alert('Please, select a file to upload');
		}
	};

	const handleModalReset = () => {
		setUniversity('');
		setName('');
		setLastname('');
		setBirthDate('');
		setDni('');
		setPhoneNumber('');
		setUrlImage('');
	}


	const initializeStudentModal = () => {
		setUniversity(store.userData.id_university);
		setName(store.userData.student_name);
		setLastname(store.userData.student_lastname);
		setBirthDate(store.userData.birth_date);
		setDni(store.userData.dni);
		setPhoneNumber(store.userData.phone_number);
		setUrlImage(store.userData.profile_picture)
	}

	const initializeLandlordModal = () => {
		setName(store.userData.landlord_name);
		setLastname(store.userData.landlord_lastname);
		setBirthDate(store.userData.birth_date);
		setDni(store.userData.dni);
		setPhoneNumber(store.userData.phone_number);
		setUrlImage(store.userData.profile_picture)
	}

	const handleStudentModalSubmit = (event) => {
		event.preventDefault();
		const dataToSend = {
			id_university: university,
			name: name,
			lastname: lastname,
			birth_date: birthDate,
			dni: dni,
			phone_number: phoneNumber,
			profile_picture: urlImage
		}
		actions.putStudent(dataToSend, store.accessToken, store.userData.id_student);
		handleModalReset();
	}

	const handleLandlordModalSubmit = (event) => {
		event.preventDefault();
		const dataToSend = {
			name: name,
			lastname: lastname,
			birth_date: birthDate,
			dni: dni,
			phone_number: phoneNumber,
			profile_picture: urlImage
		}
		actions.putLandlord(dataToSend, store.accessToken, store.userData.id_landlord);
		handleModalReset();
	}

	return (
		<>
			{!store.isLogedIn ?
				<Login />
				:
				store.userData.is_student ?
					<div className="row gx-0 overflow justify-content-center">
						<div className="modal fade" id="profileStudentModal" tabIndex="-1" aria-labelledby="profileModalLabel" aria-hidden="true">
							<div className="modal-dialog">
								<div className="modal-content">
									<div className="modal-header">
										<h1 className="modal-title fs-5" id="profileStudentModalLabel">Editar mi perfil</h1>
										<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
									</div>
									<div className="modal-body">
										<div className="mb-3">
											<select className="form-select" aria-label="Default select example" onChange={handleUniversity} placeholder={store.userData.id_university}>
												<option selected>Seleccionar la universidad</option>
												{!store.universities ?
													""
													:
													<>
														{store.universities.map((item, key) =>
															<option value={item.id} key={key}>{item.name}</option>)}
													</>
												}
											</select>
											<div className="mb-2">
												<label htmlFor="FormControlStudentName" className="form-label">Nombre:</label>
												<input type="string" className="form-control" id="FormControlStudentName" onChange={handleName} placeholder={store.userData.student_name} />
											</div>
											<div className="mb-2">
												<label htmlFor="FormControlStudentLastName" className="form-label">Apellidos:</label>
												<input type="string" className="form-control" id="FormControlStudentLastName" onChange={handleLastname} placeholder={store.userData.student_lastname} />
											</div>
											<div className="mb-2">
												<label htmlFor="FormControlStudentBirthDate" className="form-label">Fecha de nacimiento (DD/MM/YYYY):</label>
												<input type="string" className="form-control" id="FormControlStudentBirthDate" onChange={handleBirthDate} placeholder={store.userData.birth_date} />
											</div>
											<div className="mb-2">
												<label htmlFor="FormControlStudentDni" className="form-label">DNI:</label>
												<input type="string" className="form-control" id="FormControlStudentDni" onChange={handleDni} placeholder={store.userData.dni} />
											</div>
											<div className="mb-2">
												<label htmlFor="FormControlStudentPhoneNumber" className="form-label">Teléfono:</label>
												<input type="int" className="form-control" id="FormControlStudentPhoneNumber" onChange={handlePhoneNumber} placeholder={store.userData.phone_number} />
											</div>
											<div className='col-12 justify-content-center'>
												<p className="mb-4 text-center red-color">¡Sube tu foto de perfil!</p>
												<form onSubmit={handleImgSubmit}>
													<div className="mb-3">
														<input
															type="file"
															className="form-control-sm"
															onChange={handleFileChange}
															accept="image/*"
														/>
													</div>
													<button type="submit" className="btn-custom red-background justify-content-center">Upload picture</button>
												</form>
												<img src={urlImage}></img>
											</div>
										</div>
									</div>
									<div className="modal-footer">
										<button type="button" className="btn-custom btn-secondary" data-bs-dismiss="modal" onClick={handleModalReset}>Close</button>
										<button type="submit" className="btn-custom red-background" data-bs-dismiss="modal" onClick={handleStudentModalSubmit}>Save changes</button>
									</div>
								</div>
							</div>
						</div>
						<div className="col-3">
							<div className="d-flex flex-column flex-shrink-0 p-2">
								<ul className="list-group list-group-flush">
									<li className="list-group-item">Universidad: {store.userData.university_name ? store.userData.university_name : 'Pendiente de cumplimentar'}</li>
									<li className="list-group-item">E-mail: {store.userData.email ? store.userData.email : 'Pendiente de cumplimentar'}</li>
									<li className="list-group-item">Nombre: {store.userData.student_name != ' ' ? store.userData.student_name : 'Pendiente de cumplimentar'}</li>
									<li className="list-group-item">Apellidos: {store.userData.student_lastname != ' ' ? store.userData.student_lastname : 'Pendiente de cumplimentar'}</li>
									<li className="list-group-item">Fecha de nacimiento: {store.userData.birth_date ? store.userData.birth_date : 'Pendiente de cumplimentar'}</li>
									<li className="list-group-item">DNI: {store.userData.dni != ' ' ? store.userData.dni : 'Pendiente de cumplimentar'}</li>
									<li className="list-group-item">Teléfono: {store.userData.phone_number ? store.userData.phone_number : 'Pendiente de cumplimentar'}</li>
								</ul>
								<button className="btn-custom red-background" data-bs-toggle="modal" data-bs-target="#profileStudentModal" onClick={initializeStudentModal}> <i className="fas fa-edit"></i> Editar mi perfil</button>
							</div>
						</div>
						<div className="col-3">
							<div className="profile-pic-container m-3">
								<img src={store.userData.profile_picture != null ? store.userData.profile_picture : profilePicture} />
							</div>
						</div>
					</div>
					:
					<div className="row gx-0 overflow justify-content-center">
						<div className="modal fade" id="profileLandlordModal" tabIndex="-1" aria-labelledby="profileLandlordModalLabel" aria-hidden="true">
							<div className="modal-dialog">
								<div className="modal-content">
									<div className="modal-header">
										<h1 className="modal-title fs-5" id="profileLandlordModalLabel">Editar mi perfil</h1>
										<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
									</div>
									<div className="modal-body">
										<div className="mb-3">
											<div className="mb-2">
												<label htmlFor="FormControlLandlordName" className="form-label">Nombre:</label>
												<input type="string" className="form-control" id="FormControlLandlordName" onChange={handleName} placeholder={store.userData.landlord_name} />
											</div>
											<div className="mb-2">
												<label htmlFor="FormControlLandlordLastName" className="form-label">Apellidos:</label>
												<input type="string" className="form-control" id="FormControlLandlordLastName" onChange={handleLastname} placeholder={store.userData.landlord_lastname} />
											</div>
											<div className="mb-2">
												<label htmlFor="FormControlLandlordBirthDate" className="form-label">Fecha de nacimiento (DD/MM/YYYY):</label>
												<input type="string" className="form-control" id="FormControlLandlordBirthDate" onChange={handleBirthDate} placeholder={store.userData.birth_date} />
											</div>
											<div className="mb-2">
												<label htmlFor="FormControlLandlordDni" className="form-label">DNI:</label>
												<input type="string" className="form-control" id="FormControlLandlordDni" onChange={handleDni} placeholder={store.userData.dni} />
											</div>
											<div className="mb-2">
												<label htmlFor="FormControlLandlordPhoneNumber" className="form-label">Teléfono:</label>
												<input type="int" className="form-control" id="FormControlLandlordPhoneNumber" onChange={handlePhoneNumber} placeholder={store.userData.phone_number} />
											</div>
											<div className='col-12 justify-content-center'>
												<p className="mb-4 text-center red-color">¡Sube tu foto de perfil!</p>
												<form onSubmit={handleImgSubmit}>
													<div className="mb-3">
														<input
															type="file"
															className="form-control-sm"
															onChange={handleFileChange}
															accept="image/*"
														/>
													</div>
													<button type="submit" className="btn-custom red-background justify-content-center">Upload picture</button>
												</form>
												<img src={urlImage}></img>
											</div>
										</div>
									</div>
									<div className="modal-footer">
										<button type="button" className="btn-custom btn-secondary" data-bs-dismiss="modal" onClick={handleModalReset}>Close</button>
										<button type="submit" className="btn-custom red-background" data-bs-dismiss="modal" onClick={handleLandlordModalSubmit}>Save changes</button>
									</div>
								</div>
							</div>
						</div>
						<div className="col-3">
							<div className="d-flex flex-column flex-shrink-0 p-2">
								<ul className="list-group list-group-flush">
									<li className="list-group-item">E-mail: {store.userData.email ? store.userData.email : 'Pendiente de cumplimentar'}</li>
									<li className="list-group-item">Nombre: {store.userData.landlord_name != ' ' ? store.userData.landlord_name : 'Pendiente de cumplimentar'}</li>
									<li className="list-group-item">Apellidos: {store.userData.landlord_lastname != ' ' ? store.userData.landlord_lastname : 'Pendiente de cumplimentar'}</li>
									<li className="list-group-item">Fecha de nacimiento: {store.userData.birth_date ? store.userData.birth_date : 'Pendiente de cumplimentar'}</li>
									<li className="list-group-item">DNI: {store.userData.dni != ' ' ? store.userData.dni : 'Pendiente de cumplimentar'}</li>
									<li className="list-group-item">Teléfono: {store.userData.phone_number ? store.userData.phone_number : 'Pendiente de cumplimentar'}</li>
								</ul>
								<button className="btn-custom red-background" data-bs-toggle="modal" data-bs-target="#profileLandlordModal" onClick={initializeLandlordModal}> <i className="fas fa-edit"></i> Editar mi perfil</button>
							</div>
						</div>
						<div className="col-3">
							<div className="profile-pic-container m-3">
								<img src={store.userData.profile_picture != null ? store.userData.profile_picture : profilePicture} />
							</div>
						</div>
					</div>
			}
		</>

	);
};






/* {!store.universities ?
	""
	:
	<>
		{store.universities.map((item, key) =>
			<Universities key={key} item={item} />
		)}
	</>
} */