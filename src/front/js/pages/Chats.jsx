import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Messages } from "./Messages.jsx";
import { AllChats } from "./AllChats.jsx";


export const Chats = () => {

    const {store , actions} = useContext(Context)

return (
    <div className="container mt-5 pt-25"> 
    <div className="row ">
        <div className="col-4 ps-0 overflow-auto">
        <h3>Chats</h3>
            <AllChats />        
        </div>
        <div className="col-8 pr-0 ">
        <h3> Conversation</h3>
            < Messages/>
        </div>
      {/*   
        <div className="col-3 overflow-auto">
            <h3>Room details</h3>
      </div> */}
    </div>
    </div>
  );

}