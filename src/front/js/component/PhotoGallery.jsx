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

export const PhotoGallery = ({ userId }) => {
  const [photos, setPhotos] = useState([]);
  const { store, actions } = useContext(Context);

  const fetchImages = async () => {
    const response = await fetch(`${process.env.BACKEND_URL}/api/imagesflats/${userId}`);
    if (!response.ok) {
      console.log("Error loading message from backend", response.status, response.statusText)
      return
    }
    const data = await response.json()
    setPhotos(data.urls);
  };

  useEffect(() => {
    fetchImages()
  }, [])

  return (
    <div className="photo-gallery">
      <Swiper  
        modules={[Navigation, Pagination]} 
        spaceBetween={10} 
        slidesPerView={1} 
        navigation 
      >
        {photos.map((url, index) => (
          <SwiperSlide key={index}>
            <div className="photo-item">
              <img src={url} alt={`Uploaded ${index}`} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
