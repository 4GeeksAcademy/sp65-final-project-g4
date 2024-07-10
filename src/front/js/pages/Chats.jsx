import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Messages } from "./Messages.jsx";
import { AllChats } from "./AllChats.jsx";


export const Chats = () => {

    const {store , actions} = useContext(Context)

return (
    <div className="container mt-5 pt-25"> 
    <div className="row ">
        <div className="col-lg-4 col-md-4 col-sm-12 ps-0 overflow-auto">
        <h3 className="red-color">Conversaciones</h3>
            <AllChats />        
        </div>
        <div className="col-lg-8 col-md-8 col-sm-12 pr-0 ">
        <h3 className="red-color"> Mensajes </h3>
       
            < Messages/>
        </div>
      
    </div>
    </div>
  );

}