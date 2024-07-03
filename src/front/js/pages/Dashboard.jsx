import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext.js";
import "../../styles/sidebar.css";
import getState from "../store/flux.js";
import { useNavigate } from "react-router-dom";


export const Dashboard = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	const handleLogout = () => {
		actions.userLogout()
	}

	if (store.isLogedIn != true) {
		navigate('/signup')
	}

	return (
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
			<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
				<div class="modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
						</div>
						<div class="modal-body">
							...
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
							<button type="button" class="btn btn-primary">Save changes</button>
						</div>
					</div>
				</div>
			</div>
			<div className="col-9 d-flex">
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
					<button className="btn-custom red-background" data-bs-toggle="modal" data-bs-target="#exampleModal"> <i class="fas fa-edit"></i> Editar mi perfil</button>
				</div>
			</div>

		</div>
	);
};
