// src/PhotoGallery.js
import React, { useState, useEffect, useContext } from 'react';
import { Context } from "../store/appContext.js";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import "../../styles/photoGallery.css";
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export const PhotoGalleryRooms = ({ userId }) => {
  const [photos, setPhotos] = useState([]);
  const { store, actions } = useContext(Context);

  
  return (
    <div className="photo-gallery">
      <Swiper  
        modules={[Navigation, Pagination]} 
        spaceBetween={10} 
        slidesPerView={1} 
        navigation 
      >
        
          <SwiperSlide>
            <div className="photo-item">
              <img src={store.currentRoom.image_url_1} alt={store.currentRoom.title} />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="photo-item">
              <img src={store.currentRoom.image_url_2} alt={store.currentRoom.title} />
            </div>
          </SwiperSlide>
       
      </Swiper>
    </div>
  );
};