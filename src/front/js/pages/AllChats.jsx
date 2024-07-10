import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

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
    <>
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
    </>

    )
}