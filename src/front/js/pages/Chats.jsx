import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Messages } from "./Messages.jsx";
import { AllChats } from "./AllChats.jsx";
import { useTranslation } from 'react-i18next';


export const Chats = () => {
  const { t, i18n } = useTranslation();
    const {store , actions} = useContext(Context)

return (
    <div className="container mt-5 pt-25 "> 
    <div className="row ">
        <div className="col-lg-4 col-md-4 col-sm-12 ps-0 chat-cont overflow-auto">
        <h3 className="red-color">{t('traduccion32')}</h3>
            <AllChats />        
        </div>
        <div className="col-lg-8 col-md-8 col-sm-12 pr-0 overflow-auto">

        <h3 className="red-color"> Mensajes </h3>
       
            < Messages/>

        </div>
      
    </div>
    </div>
  );

}