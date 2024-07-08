import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";

export const Messages = () => {
    const { store, actions } = useContext(Context);
    const [message, setMessage] = useState("");
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            console.log("Component mounted, setting chat ID:", id);
            actions.setChatId(id);
            actions.getMessagesWithChatId();
        } else {
            console.log("Chat ID is undefined");
        }
    }, [id]);

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSendMessage = async () => {
        if (message.trim()) {
            const dataToSend = {
                chat_id: id,
                message: message
            };
            console.log("Sending message:", dataToSend);
            await actions.postNewMessage(dataToSend);
            setMessage("");
        }
    };

    return (
        <>
            <ul className="list-group chat-cont overflow-auto">
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
                    <textarea 
                       className="form-control" 
                       id="exampleFormControlTextarea1" 
                       rows="1" 
                       value={message} 
                       onChange={handleMessageChange}
                       placeholder="Escribe un mensaje nuevo"
                    ></textarea>
                </div>
                <button className="send-button btn-custom red-background pb-2 mb-2" onClick={handleSendMessage}>Enviar</button>
            </div>
    </>
    );
};