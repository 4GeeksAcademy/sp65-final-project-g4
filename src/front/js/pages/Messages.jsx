import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export const Messages = () => {
    const { t, i18n } = useTranslation();
    const { store, actions } = useContext(Context);
    const [message, setMessage] = useState("");

    useEffect(() => {
        // Fetch messages when selectedChatId changes
        if (store.selectedChatId) {
            actions.getMessagesWithChatId();
        }
    }, [store.selectedChatId]);

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSendMessage = async () => {
        if (message.trim()) {
            const dataToSend = {
                chat_id: store.selectedChatId,
                message: message
            };
            await actions.postNewMessage(dataToSend);
            setMessage("");
        }
    };

    return (
        <motion.div 
		initial={{opacity: 0}}
		animate={{opacity: 1, transition: {duration: 0.5, delay: 0.5}}}
		exit={{opacity: 0, transition: {duration: 1}}}>
            <ul className="list-group chat-cont overflow-auto">
                {store.currentChat.map((item, index) => (
                    <li key={index} className={`list-group-item mb-4 rounded ${item.sender_id === store.userData.id ? 'sent-message' : 'received-message'}`}>              
                        <p id="sendername">{item.sender_name} {item.sender_lastname}</p>
                        <p>{item.message}</p>
                        <p id="timestamp">{item.timestamp}</p>
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
                       placeholder={t('traduccion65')}
                    ></textarea>
                </div>
                <button className="send-button btn-custom red-background pb-2 mb-2" onClick={handleSendMessage}>{t('traduccion38')}</button>
            </div>
    </motion.div>
    );
};