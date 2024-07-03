import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Messages } from "./Messages.jsx";


export const Chats = () => {

    const {store , actions} = useContext(Context)

    useEffect(() => {
        actions.getAllChats();
      }, []);


return (
    <div className="container mt-5 pt-25"> 
    <div className="row">

        <div className="col-3">
            <h3>Messages</h3>
            {store.allChats.map((item, index) => 
            <div className="card" id={index}>
                <div className="card-header" id="chat-header"> Receivers name
                
                </div>
                <div className="card-body">
                    <p className="card-text">{item.message} , {item.student_id} , {item.room_id}</p>
                </div>
            </div> 
            )} 
        
        </div>
        <div className="col-6">
            < Messages/>
        </div>
        
        <div className="col-3">
            <h3>Room details</h3>
      </div>
    </div>
    </div>
  );

}