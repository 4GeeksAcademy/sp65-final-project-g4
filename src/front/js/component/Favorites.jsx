import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext.js";
import { useTranslation } from 'react-i18next';

export const Favorites = (props) => {
  const { t, i18n } = useTranslation();
    const { store, actions } = useContext(Context);

    const handleFavorites = async (event) => {
        event.preventDefault();
        if (!store.favorites.some(obj => obj.id_room === props.id)) {
          const dataToSend = {
            "id_student": store.userData.id_student,
            "id_room": props.id
          };
          const url = `${process.env.BACKEND_URL}/api/favorites`;
          const options = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + store.accessToken 
            },
            body: JSON.stringify(dataToSend)
          };
          const response = await fetch(url, options)
          if (!response.ok) {
            console.log('Error: ', response.status, response.statusText)
            return
          }
          actions.getFavorites()
        }
    
      };

    const deleteFavorites = async (event) => {
        event.preventDefault();
        if (store.favorites.some(obj => obj.id_room === props.id)) {
          const url = `${process.env.BACKEND_URL}/api/favorites/${store.favorites.filter(obj => obj.id_room === props.id )[0].id}`;
          const options = {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + store.accessToken 
            }
          };
          const response = await fetch(url, options)
          if (!response.ok) {
            console.log('Error: ', response.status, response.statusText)
            return
          }
          actions.getFavorites()
        }
    }

    useEffect(() => {
        
    }, [])

    return (
        <>
            {store.favorites.some(obj => obj.id_room === props.id) ?
                <button onClick={deleteFavorites} id={props.id} className="btn-custom red-background">{t('traduccion92')}</button>
                :
                <button onClick={handleFavorites} id={props.id} className="btn-custom red-background">{t('traduccion93')}</button>
            }
        </>
    )
}