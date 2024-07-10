import React, { useState, useContext, startTransition } from "react";
import { Link } from "react-router-dom";
import "../../styles/footer.css";
import banderaIng from "../../img/bandera-ing.png";
import banderaEsp from "../../img/bandera-esp.png";
import { useTranslation } from 'react-i18next';

export const Footer = () => {

	const { t, i18n } = useTranslation();
	const changeLanguage = (lng) => {
		startTransition(() => {
			i18n.changeLanguage(lng);
		});
	};

	return (
		<footer className="footer-custom">
			<div className="container">
				<div className="row">
					<div className="footer-custom-menu-left px-0 col-4">
						<div>
							<Link to="/">
								<span className="navbar-brand mb-0 h1 red-color">RentUni</span>
							</Link>
						</div>
						{/* <div className="social-menu">
							<i className="fa-brands fa-instagram"></i>
							<i className="fa-brands fa-facebook"></i>
							<i className="fa-brands fa-twitter"></i>
						</div> */}
						<div className="language-selector">
							<a href="#"><img src={banderaEsp} onClick={() => changeLanguage('es')} /></a>
							<a href="#"><img src={banderaIng} onClick={() => changeLanguage('en')} /></a>
						</div>
					</div>
					<div className="col-4">
						<h5 className="red-color">{t('traduccion94')}</h5>
						<Link to="/LPD">
						{t('traduccion95')}
						</Link>
					</div>
					<div className="col-4">
						<h5 className="red-color">{t('traduccion96')}</h5>
						<Link to="contact">
						{t('traduccion97')}
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
};
