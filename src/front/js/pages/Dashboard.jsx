import React, { useState, useContext } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/sidebar.css";
import { useNavigate } from "react-router-dom";
import { Login } from "./Login.jsx";
import { motion } from 'framer-motion';

import profilePicture from "../../img/placeholder-profile-picture.jpg";
import { useTranslation } from 'react-i18next';


export const Dashboard = () => {
	const { t, i18n } = useTranslation();
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
		<motion.div 
		initial={{opacity: 0}}
		animate={{opacity: 1, transition: {duration: 0.5, delay: 0.5}}}
		exit={{opacity: 0, transition: {duration: 1}}}
		className="home-container mt-5"
		>
			{!store.isLogedIn ?
				<Login />
				:
				store.userData.is_student ?
					<div className="row gx-0 overflow justify-content-center">
						<div className="modal fade" id="profileStudentModal" tabIndex="-1" aria-labelledby="profileModalLabel" aria-hidden="true">
							<div className="modal-dialog">
								<div className="modal-content">
									<div className="modal-header">
										<h1 className="modal-title fs-5" id="profileStudentModalLabel">{t('traduccion39')}</h1>
										<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="{t('traduccion22')}"></button>
									</div>
									<div className="modal-body">
										<div className="mb-3">
											<select className="form-select" aria-label="Default select example" onChange={handleUniversity} placeholder={store.userData.id_university}>
												<option selected>{t('traduccion7')}</option>
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
												<label htmlFor="FormControlStudentName" className="form-label">{t('traduccion35')}:</label>
												<input type="string" className="form-control" id="FormControlStudentName" onChange={handleName} placeholder={store.userData.student_name} />
											</div>
											<div className="mb-2">
												<label htmlFor="FormControlStudentLastName" className="form-label">{t('traduccion40')}:</label>
												<input type="string" className="form-control" id="FormControlStudentLastName" onChange={handleLastname} placeholder={store.userData.student_lastname} />
											</div>
											<div className="mb-2">
												<label htmlFor="FormControlStudentBirthDate" className="form-label">{t('traduccion41')} (DD/MM/YYYY):</label>
												<input type="string" className="form-control" id="FormControlStudentBirthDate" onChange={handleBirthDate} placeholder={store.userData.birth_date} />
											</div>
											<div className="mb-2">
												<label htmlFor="FormControlStudentDni" className="form-label">{t('traduccion42')}:</label>
												<input type="string" className="form-control" id="FormControlStudentDni" onChange={handleDni} placeholder={store.userData.dni} />
											</div>
											<div className="mb-2">
												<label htmlFor="FormControlStudentPhoneNumber" className="form-label">{t('traduccion43')}:</label>
												<input type="int" className="form-control" id="FormControlStudentPhoneNumber" onChange={handlePhoneNumber} placeholder={store.userData.phone_number} />
											</div>
											<div className='col-12 justify-content-center'>
												<p className="mb-4 text-center red-color">{t('traduccion44')}</p>
												<form onSubmit={handleImgSubmit}>
													<div className="mb-3">
														<input
															type="file"
															className="form-control-sm"
															onChange={handleFileChange}
															accept="image/*"
														/>
													</div>
													<button type="submit" className="btn-custom red-background justify-content-center">{t('traduccion45')}</button>
												</form>
												<img src={urlImage}></img>
											</div>
										</div>
									</div>
									<div className="modal-footer">
										<button type="button" className="btn-custom btn-secondary" data-bs-dismiss="modal" onClick={handleModalReset}>{t('traduccion22')}</button>
										<button type="submit" className="btn-custom red-background" data-bs-dismiss="modal" onClick={handleStudentModalSubmit}>{t('traduccion23')}</button>
									</div>
								</div>
							</div>
						</div>
						<div className="col-3">
							<div className="d-flex flex-column flex-shrink-0 p-2">
								<ul className="list-group list-group-flush">
									<li className="list-group-item">{t('traduccion46')}: {store.userData.university_name ? store.userData.university_name : 'Pendiente de cumplimentar'}</li>
									<li className="list-group-item">{t('traduccion36')}: {store.userData.email ? store.userData.email : 'Pendiente de cumplimentar'}</li>
									<li className="list-group-item">{t('traduccion35')}: {store.userData.student_name != ' ' ? store.userData.student_name : 'Pendiente de cumplimentar'}</li>
									<li className="list-group-item">{t('traduccion40')}: {store.userData.student_lastname != ' ' ? store.userData.student_lastname : 'Pendiente de cumplimentar'}</li>
									<li className="list-group-item">{t('traduccion41')}: {store.userData.birth_date ? store.userData.birth_date : 'Pendiente de cumplimentar'}</li>
									<li className="list-group-item">{t('traduccion42')}: {store.userData.dni != ' ' ? store.userData.dni : 'Pendiente de cumplimentar'}</li>
									<li className="list-group-item">{t('traduccion43')}: {store.userData.phone_number ? store.userData.phone_number : 'Pendiente de cumplimentar'}</li>
								</ul>
								<button className="btn-custom red-background" data-bs-toggle="modal" data-bs-target="#profileStudentModal" onClick={initializeStudentModal}> <i className="fas fa-edit"></i> {t('traduccion25')}</button>
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
										<h1 className="modal-title fs-5" id="profileLandlordModalLabel">{t('traduccion39')}</h1>
										<button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="{t('traduccion22')}"></button>
									</div>
									<div className="modal-body">
										<div className="mb-3">
											<div className="mb-2">
												<label htmlFor="FormControlLandlordName" className="form-label">{t('traduccion35')}:</label>
												<input type="string" className="form-control" id="FormControlLandlordName" onChange={handleName} placeholder={store.userData.landlord_name} />
											</div>
											<div className="mb-2">
												<label htmlFor="FormControlLandlordLastName" className="form-label">{t('traduccion40')}:</label>
												<input type="string" className="form-control" id="FormControlLandlordLastName" onChange={handleLastname} placeholder={store.userData.landlord_lastname} />
											</div>
											<div className="mb-2">
												<label htmlFor="FormControlLandlordBirthDate" className="form-label">{t('traduccion41')} (DD/MM/YYYY):</label>
												<input type="string" className="form-control" id="FormControlLandlordBirthDate" onChange={handleBirthDate} placeholder={store.userData.birth_date} />
											</div>
											<div className="mb-2">
												<label htmlFor="FormControlLandlordDni" className="form-label">{t('traduccion42')}:</label>
												<input type="string" className="form-control" id="FormControlLandlordDni" onChange={handleDni} placeholder={store.userData.dni} />
											</div>
											<div className="mb-2">
												<label htmlFor="FormControlLandlordPhoneNumber" className="form-label">{t('traduccion43')}:</label>
												<input type="int" className="form-control" id="FormControlLandlordPhoneNumber" onChange={handlePhoneNumber} placeholder={store.userData.phone_number} />
											</div>
											<div className='col-12 justify-content-center'>
												<p className="mb-4 text-center red-color">{t('traduccion44')}</p>
												<form onSubmit={handleImgSubmit}>
													<div className="mb-3">
														<input
															type="file"
															className="form-control-sm"
															onChange={handleFileChange}
															accept="image/*"
														/>
													</div>
													<button type="submit" className="btn-custom red-background justify-content-center">{t('traduccion45')}</button>
												</form>
												<img src={urlImage}></img>
											</div>
										</div>
									</div>
									<div className="modal-footer">
										<button type="button" className="btn-custom btn-secondary" data-bs-dismiss="modal" onClick={handleModalReset}>{t('traduccion22')}</button>
										<button type="submit" className="btn-custom red-background" data-bs-dismiss="modal" onClick={handleLandlordModalSubmit}>{t('traduccion23')}</button>
									</div>
								</div>
							</div>
						</div>
						<div className="col-3">
							<div className="d-flex flex-column flex-shrink-0 p-2">
								<ul className="list-group list-group-flush">
									<li className="list-group-item">{t('traduccion36')}: {store.userData.email ? store.userData.email : 'Pendiente de cumplimentar'}</li>
									<li className="list-group-item">{t('traduccion35')}: {store.userData.landlord_name != ' ' ? store.userData.landlord_name : 'Pendiente de cumplimentar'}</li>
									<li className="list-group-item">{t('traduccion40')}: {store.userData.landlord_lastname != ' ' ? store.userData.landlord_lastname : 'Pendiente de cumplimentar'}</li>
									<li className="list-group-item">{t('traduccion41')}: {store.userData.birth_date ? store.userData.birth_date : 'Pendiente de cumplimentar'}</li>
									<li className="list-group-item">{t('traduccion42')}: {store.userData.dni != ' ' ? store.userData.dni : 'Pendiente de cumplimentar'}</li>
									<li className="list-group-item">{t('traduccion43')}: {store.userData.phone_number ? store.userData.phone_number : 'Pendiente de cumplimentar'}</li>
								</ul>
								<button className="btn-custom red-background" data-bs-toggle="modal" data-bs-target="#profileLandlordModal" onClick={initializeLandlordModal}> <i className="fas fa-edit"></i> {t('traduccion25')}</button>
							</div>
						</div>
						<div className="col-3">
							<div className="profile-pic-container m-3">
								<img src={store.userData.profile_picture != null ? store.userData.profile_picture : profilePicture} />
							</div>
						</div>
					</div>
			}
		</motion.div>

	);
};