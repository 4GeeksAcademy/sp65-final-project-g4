import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext from "./store/appContext.js";
// Custom Components
import ScrollToTop from "./component/ScrollToTop.jsx";
import { BackendURL } from "./component/BackendURL.jsx";
import { Navbar } from "./component/Navbar.jsx";
import { Footer } from "./component/Footer.jsx";
// Custom Pages
import {Login} from "./pages/Login.jsx";
import { Single } from "./pages/Single.jsx";
import { Demo } from "./pages/Demo.jsx";
import { Home } from "./pages/Home.jsx";
import { Signup } from "./pages/Signup.jsx";
import { Map } from "./pages/Map.jsx";

import { UploadImagesFlats } from "./component/UploadImagesFlats.jsx";
import { Chats } from "./pages/Chats.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";
import { FlatProfile } from "./pages/flatProfile.jsx";
import { UploadNewFlat } from "./pages/uploadNewFlat.jsx";
import { LOPDPG } from "./pages/LOPDPG.jsx";
import { Contacto } from "./pages/Contacto.jsx";




// Create your first component
const Layout = () => {
    // The basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL/ >;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route element={<Home />} path="/" />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Login />} path="/login" />
                        <Route element={<Map />} path="/map" />
                        <Route element={<Single />} path="/single/:theid" />
                        <Route element={<h1 style={{"textAlign":"center"}}>Not found!</h1>} path="*"/>
                        <Route element= {<Signup/>} path="/signup" />
                        <Route element= {<UploadImagesFlats/>} path="/uploadimg" />
                        <Route element= {<Chats/>} path="/chats/:id" />
                        <Route element= {<Dashboard/>} path="/dashboard" />
                        <Route element= {<FlatProfile/>} path="/FlatProfile/:theid" />
                        <Route element= {<UploadNewFlat/>} path="/uploadFlat" />
                        <Route element= {<LOPDPG/>} path="/LPD" />
                        <Route element= {<Contacto/>} path="/contact" />

                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
