import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";


export const Messages = () => {
    const {store, actions} = useContext(Context);
    const [message, setMesssage] = useState();
    const [sentMessage, setSentMessage] = useState();
    const [receivedMessage, setReceivedMessage] = useState();

    actions.getAllChats();

    return (

        <div className="container">
            <h3> Conversation</h3>
            <ul className="list-group">
                <li className="list-group-item mb-4 rounded" id="sent-message"><p>Student 1</p> 
                    <p>Hola...</p>
                </li>
                <li className="list-group-item mb-4 rounded" id="received-message">Mesaje recibido </li>
                <li className="list-group-item mb-4 rounded" id="sent-message">Mesaje enviado </li>
                <li className="list-group-item mb-4 rounded" id="received-message">Mesaje recibido </li>
            </ul>
       
        <div className="input-container rounded">
        <div className="mb-3">
            <label htmlForfor="exampleFormControlTextarea1" className="form-label">Type your message</label>
        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
        </div>
          <button className="send-button btn-custom">Send</button>
          </div>
      </div>
    )
}