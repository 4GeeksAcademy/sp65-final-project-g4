import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import profilePicture from "../../img/placeholder-profile-picture.jpg";
import "../../styles/navbar.css";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';


export const Navbar = () => {
	const { t, i18n } = useTranslation();
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	const handleLogout = () => {
		actions.userLogout()
		navigate('/')
	}

	return (
		<nav className="navbar navbar-custom sticky-top">
			<div className="container-fluid">
				<Link to="/">
					<span className="navbar-brand mb-0 h1 red-color">RentUni</span>
				</Link>
				<div className="custom-link-container">
					{store.isLogedIn ?
						<>
						{store.userData.is_student ?
						<>
							<Link to="/map">
								<span>{t('navbar1')}</span>
							</Link>
							<Link to="/rooms">
								<span>{t('navbar2')}</span>
							</Link>
						</> 
						:
				
							<Link to="/uploadflat">
							<span>{t('navbar3')}</span>
						</Link>
	
							}
							<div className="dropdown mx-3">
								<span className="red-color dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
									{store.userData.is_landlord ?
										store.userData.landlord_name
										:
										store.userData.student_name
									}
									<span className="profile-picutre"><img src={store.userData.profile_picture != null ? store.userData.profile_picture : profilePicture} /></span>
								</span>
								<ul className="dropdown-menu dropdown-menu-end">
									<li>
										<Link className="dropdown-item" to="/dashboard">
											<span>{t('navbar4')}</span>
										</Link>
									</li>
									<li>
										{store.userData.is_student ?
											<Link className="dropdown-item" to="/FavoritesProfile">
												<span>{t('navbar6')}</span>
											</Link>
											:
											<>
											<Link className="dropdown-item" to="/myflats">
												<span>{t('navbar5')}</span>
											</Link>
											<Link className="dropdown-item" to="/myrooms">
												<span>{t('navbar7')}</span>
											</Link>
											</>

										}
									</li>
									<li>
										<Link className="dropdown-item" to="/chats/1">
											<span>{t('navbar8')}</span>
										</Link>
									</li>
									<li><hr className="dropdown-divider" /></li>
									<li>
										<Link className="dropdown-item" to="/">
											<span className="red-color" onClick={handleLogout}> <i className="fas fa-sign-out-alt"></i> {t('navbar9')}</span>
										</Link>
									</li>
								</ul>
							</div>
						</>
						:
						<>
							<Link to="/login">
								<button className="btn-custom red-background">{t('navbar10')}</button>
							</Link>
							<Link to="/Signup" >
								<span className="red-color">{t('navbar11')}</span>
							</Link>
						</>
					}
				</div>
			</div>
		</nav>
	);
};
