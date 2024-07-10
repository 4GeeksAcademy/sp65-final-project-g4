import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Transition, TransitionGroup } from 'react-transition-group';
import injectContext from "./store/appContext.js";
// Custom Components
import ScrollToTop from "./component/ScrollToTop.jsx";
import { BackendURL } from "./component/BackendURL.jsx";
import { Navbar } from "./component/Navbar.jsx";
import { Footer } from "./component/Footer.jsx";

import { AnimationRoutes } from "./AnimationRoutes.jsx";





// Create your first component
const Layout = () => {
    // The basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    return (
        <div>

            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <div className="page container-custom">
                    <AnimationRoutes />
                    </div>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div >
    );
};

export default injectContext(Layout);
