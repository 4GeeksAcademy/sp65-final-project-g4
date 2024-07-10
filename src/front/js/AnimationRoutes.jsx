import React from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
// Custom Pages
import { Login } from "./pages/Login.jsx";
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
import { UploadRoomImg } from "./pages/UploadImgRooms.jsx";
import { PhotoGallery } from "./component/PhotoGallery.jsx";
import { MyRooms } from "./pages/myrooms.jsx";

import { AnimatePresence } from 'framer-motion'

export const AnimationRoutes = () => {
    const location = useLocation();
    return (
        <AnimatePresence>
            <Routes location={location}>
                <Route element={<Home />} path="/" />
                <Route element={<Login />} path="/login" />
                <Route element={<Map />} path="/map" />
                <Route element={<NoAccess />} path="*" />
                <Route element={<Signup />} path="/signup" />
                <Route element={<UploadImagesFlats />} path="/uploadimg" />
                <Route element={<Chats />} path="/chats/:id" />
                <Route element={<Dashboard />} path="/dashboard" />
                <Route element={<RoomProfile />} path="/RoomProfile/:theid" />
                <Route element={<FlatProfile />} path="/FlatProfile/:theid" />
                <Route element={<FavoritesProfile />} path="/FavoritesProfile/" />
                <Route element={<LOPDPG />} path="/LPD" />
                <Route element={<Contacto />} path="/contact" />
                <Route element={<UploadFlats />} path="/uploadflat" />
                <Route element={<UploadRooms />} path="/uploadroom/:theid" />
                <Route element={<RoomProfile />} path="/roomprofile/:theid" />
                <Route element={<MyFlats />} path="/myflats" />
                <Route element={<AllRooms />} path="/rooms" />
                <Route element={<PostFlatImg />} path="/uploadflatimg/:theid" />
                <Route element={<UploadImagesUsers />} path="/imgusers" />
                <Route element={<EditImg />} path="/editimg/:theid" />
                <Route element={<UploadRoomImg />} path="/uploadroomimg/:theid" />
                <Route element={<PhotoGallery />} path="/photosflat/:theid" />
                <Route element={<MyRooms />} path="/myrooms" />
            </Routes>
        </AnimatePresence>
    );
};

