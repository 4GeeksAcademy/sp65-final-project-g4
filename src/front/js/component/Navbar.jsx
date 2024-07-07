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
		<nav className="navbar-custom">
			<div className="navbar-custom-logo">
				<Link to="/">
					<span className="navbar-brand mb-0 h1 red-color">RentUni</span>
				</Link>
			</div>
			<div className="d-flex align-items-center">
				<Link to="/demo">
					<span>Lorem</span>
				</Link>
				<Link to="/uploadimg">
					<span>Upload</span>
				</Link>
				<Link to="/uploadflat">
					<span>Upload Flat</span>
				</Link>
				<Link to="/chats/1">
					<span>Chats</span>
				</Link>
				{store.isLogedIn ?
					<div className="dropdown">
						<button className="btn btn-custom red-background dropdown-toggle d-flex align-items-center" type="button" data-bs-toggle="dropdown" aria-expanded="false">
							Menú
							<span className="square-container ms-2"><img src={store.userData.profile_picture != null ? store.userData.profile_picture : profilePicture} /></span>
						</button>
						<ul className="dropdown-menu">
							<li>
								<Link className="dropdown-item m-0" to="/dashboard">
									<span className="red-color">Perfil</span>
								</Link>
							</li>
							<li>
								{store.userData.is_student ?
									<Link className="dropdown-item m-0" to="/favorites">
										<span className="red-color">Favoritos</span>
									</Link>
									:
									<Link className="dropdown-item m-0" to="/myflats">
										<span className="red-color">Mis pisos</span>
									</Link>
								}
							</li>
							<li>
								<Link className="dropdown-item m-0" to="/chats/1">
									<span className="red-color">Mensajes</span>
								</Link>
							</li>
							<li className="d-flex justify-content-center mt-2">
								
									<button className="btn-custom red-background m-0" onClick={handleLogout}> <i className="fas fa-sign-out-alt"></i> Desconectar</button>
								
							</li>
						</ul>
					</div>

					:
					<>
						<Link to="/login">
							<button className="btn-custom red-background">Login</button>
						</Link>
						<Link to="/Signup" >
							<span className="red-color">Sign Up</span>
						</Link>
					</>}
			</div>
		</nav>
	);
};
