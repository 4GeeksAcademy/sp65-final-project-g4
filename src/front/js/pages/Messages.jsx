import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Messages = () => {
    const { store, actions } = useContext(Context);
    const [message, setMessage] = useState("");
    const { id } = useParams();


    useEffect(() => {
        actions.setChatId(id);
        actions.getMessagesWithChatId();
    }, [id]);


    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSendMessage = () => {
        // Handle sending message logic here
        console.log('Send message:', message);
    };

    return (
        <>
            <ul className="list-group">
                {store.currentChat.map((item, index) => (
                    <li key={index} className="list-group-item mb-4 rounded" id="sent-message">
                        <p id="timestamp">{item.timestamp}</p>
                        <p id="sendername">{item.sender_name} {item.sender_lastname}</p>
                        <p>{item.message}</p>
                    </li>
                ))}
            </ul>
            <div className="input-container rounded">
                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Type your message</label>
                    <textarea 
                        className="form-control" 
                        id="exampleFormControlTextarea1" 
                        rows="3" 
                        value={message} 
                        onChange={handleMessageChange}
                    ></textarea>
                </div>
                <button className="send-button btn-custom" onClick={handleSendMessage}>Send</button>
            </div>
        </>
    );
};