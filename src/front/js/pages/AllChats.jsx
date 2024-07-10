import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { motion } from 'framer-motion';

export const AllChats = () => {

    const {store , actions} = useContext(Context)

    const handleChatClick = (chatId) => {
        actions.setChatId(chatId);
        actions.getMessagesWithChatId();
    };

    useEffect(() => {
        actions.getChats();
      }, [])


    return(
        <motion.div 
		initial={{opacity: 0}}
		animate={{opacity: 1, transition: {duration: 0.5, delay: 0.5}}}
		exit={{opacity: 0, transition: {duration: 1}}}
		className="home-container"
		>
            {!store.chats ?

            "No hay chats"
            :
            
            <>
            <ul className="list-group">
            
             {store.chats.map((chat) => (  
                <li 
                key={chat.id} 
                className={`list-group-item ${chat.id === store.selectedChatId ? 'bg-gray' : ''} ${!chat.is_read ? 'font-weight-bold' : ''}`}
                onClick={() => handleChatClick(chat.id)}
            >
            <div className="card mt-2 ">                
                <div className="card-header" id="chat-header">
                    <p id="sendername">
                    {store.userData.is_student ?
                        chat.landlord_name
                        :
                        chat.student_name}
                    </p>
                </div>
                <div className="card-body">
                    <p className="card-text">{chat.last_message}</p>
                </div> 
              
            </div> 
            </li>
        ))} 
    </ul>
        </>
         }
    </motion.div>

    )
}