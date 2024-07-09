import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import injectContext from "./store/appContext.js";
// Custom Components
import ScrollToTop from "./component/ScrollToTop.jsx";
import { BackendURL } from "./component/BackendURL.jsx";
import { Navbar } from "./component/Navbar.jsx";
import { Footer } from "./component/Footer.jsx";
// Custom Pages
import { Login } from "./pages/Login.jsx";
import { Single } from "./pages/Single.jsx";
import { Demo } from "./pages/Demo.jsx";
import { Home } from "./pages/Home.jsx";
import { Signup } from "./pages/Signup.jsx";
import { Map } from "./pages/Map.jsx";

import { UploadImagesFlats } from "./component/UploadImagesFlats.jsx";
import { Chats } from "./pages/Chats.jsx";
import { Dashboard } from "./pages/Dashboard.jsx";
import { FlatProfile } from "./pages/FlatProfile.jsx";
import { LOPDPG } from "./pages/LOPDPG.jsx";
import { Contacto } from "./pages/Contacto.jsx";
import { UploadRooms } from "./pages/UploadRooms.jsx";
import { RoomProfile } from "./pages/RoomProfile.jsx";
import { FavoritesProfile } from "./pages/FavoritesProfile.jsx";
import { MyFlats } from "./pages/myFlats.jsx";
import { NoAccess } from "./pages/NoAccess.jsx";
import { AllRooms } from "./pages/Rooms.jsx";
import { PostFlatImg } from "./pages/UploadFlatImg.jsx";
import { UploadImagesUsers } from "./component/UploadImagesUsers.jsx";
import { EditImg } from "./pages/SubirFotos.jsx";
import { UploadFlats } from "./pages/UploadFlats.jsx";





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
                    <div className="container-custom">
                        <Routes>
                            <Route element={<Home />} path="/" />
                            <Route element={<Demo />} path="/demo" />
                            <Route element={<Login />} path="/login" />
                            <Route element={<Map />} path="/map" />
                            <Route element={<Single />} path="/single/:theid" />
                            <Route element={<NoAccess/>} path="*" />
                            <Route element={<Signup />} path="/signup" />
                            <Route element={<UploadImagesFlats />} path="/uploadimg" />
                            <Route element={<Chats />} path="/chats/:id" />
                            <Route element={<Dashboard />} path="/dashboard" />
                            <Route element={<RoomProfile />} path="/RoomProfile/:theid" />
                            <Route element={<FlatProfile />} path="/FlatProfile/:theid" />
                            <Route element={<FavoritesProfile />} path="/FavoritesProfile/" />
                            <Route element={<LOPDPG />} path="/LPD" />
                            <Route element={<Contacto />} path="/contact" />
                            <Route element= {<UploadFlats/>} path="/uploadflat" />
                            <Route element= {<UploadRooms/>} path="/uploadroom/:theid" />
                            <Route element= {<RoomProfile/>} path="/roomprofile/:theid"/>
                            <Route element= {<MyFlats/>} path="/myflats"/>
                            <Route element= {<AllRooms/>} path="/rooms"/>
                            <Route element= {<PostFlatImg />} path="/uploadflatimg/:theid"/>
                            <Route element= {<UploadImagesUsers />} path="/imgusers"/>
                            <Route element= {<EditImg />} path="/editimg/:theid"/>

                        </Routes>
                    </div>

                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
