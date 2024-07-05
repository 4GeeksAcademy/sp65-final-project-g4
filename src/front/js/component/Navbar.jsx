import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import profilePicture from "../../img/placeholder-profile-picture.jpg";
import "../../styles/navbar.css";


export const Navbar = () => {
	const { store, actions } = useContext(Context);

	return (
		<nav className="navbar-custom">
			<div className="navbar-custom-logo">
				<Link to="/">
					<span className="navbar-brand mb-0 h1 red-color">React Boilerplate</span>
				</Link>
			</div>
			<div>
				<Link to="/demo">
					<span>Lorem</span>
				</Link>
				<Link to="/demo">
					<span>Lorem</span>
				</Link>
				<Link to="/chats/1">
					<span>Chats</span>
				</Link>
				{store.isLogedIn ?
					<span>
						<Link to="/dashboard">
							<span className="red-color">Perfil</span>
							<span className="profile-picutre"><img src={profilePicture} /></span>
						</Link>
					</span> 
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
