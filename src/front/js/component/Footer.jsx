import React from "react";
import { Link } from "react-router-dom";
import "../../styles/footer.css";

export const Footer = () => (
	<footer className="footer-custom">
		<div className="w-50 footer-custom-menu-left">
			<div>
				<Link to="/">
					<span className="navbar-brand mb-0 h1 red-color">React Boilerplate</span>
				</Link>
			</div>
			<div className="social-menu">
				<i class="bi bi-instagram"></i>
				<i class="bi bi-facebook"></i>
				<i class="bi bi-twitter-x"></i>
			</div>
			<div className="language-selector">
				<Link to="/">
					<span className="navbar-brand mb-0 h1 red-color">React Boilerplate</span>
				</Link>
			</div>
		</div>
		<div className="w-50 footer-custom-menu-right">
			<div>
				<h3 className="red-color">a</h3>
				<Link to="/">
					React Boilerplate
				</Link>
			</div>
			<div>
				<h3 className="red-color">a</h3>
				<Link to="/">
					React Boilerplate
				</Link>
			</div>
		</div>
	</footer>
);
