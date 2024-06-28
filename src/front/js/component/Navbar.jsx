import React from "react";
import { Link } from "react-router-dom";
import "../../styles/navbar.css";

export const Navbar = () => {
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
				<Link to="/demo">
					<span>Lorem</span>
				</Link>
				<Link to="/login">
					<button className="btn-custom red-background">Login</button>
				</Link>
				<Link to="/Signup" >
					<span className="red-color">Sign Up</span>
				</Link>
			</div>
		</nav>
	);
};
