import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import profilePicture from "../../img/placeholder-profile-picture.jpg";
import "../../styles/navbar.css";
import { useNavigate } from "react-router-dom";


export const Navbar = () => {
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
								<span>Mapa</span>
							</Link>
							<Link to="/rooms">
								<span>Listado de habitaciones</span>
							</Link>
						</> :
						<>
							<Link to="/uploadflat">
							<span>Publicar un piso</span>
						</Link>
						<Link to="/myflats">
							<span>Mis pisos</span>
						</Link>
						</>
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
											<span>Perfil</span>
										</Link>
									</li>
									<li>
										{store.userData.is_student ?
											<Link className="dropdown-item" to="/FavoritesProfile">
												<span>Favoritos</span>
											</Link>
											:
											<Link className="dropdown-item" to="/myflats">
												<span>Mis pisos</span>
											</Link>
										}
									</li>
									<li>
										<Link className="dropdown-item" to="/chats/1">
											<span>Mensajes</span>
										</Link>
									</li>
									<li><hr className="dropdown-divider" /></li>
									<li>
										<Link className="dropdown-item" to="/">
											<span className="red-color" onClick={handleLogout}> <i className="fas fa-sign-out-alt"></i> Desconectar</span>
										</Link>
									</li>
								</ul>
							</div>
						</>
						:
						<>
							<Link to="/login">
								<button className="btn-custom red-background">Login</button>
							</Link>
							<Link to="/Signup" >
								<span className="red-color">Sign Up</span>
							</Link>
						</>
					}
				</div>
			</div>
		</nav>
	);
};
