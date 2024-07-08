import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const AllChats = () => {

    const {store , actions} = useContext(Context)

  

    return(
    <>
            {!store.chats ?

            "No hay chats"
            :
            
            <>
            
             {store.chats.map((item, index) =>   
             <Link
             to={`/chats/${item.id}`} 
                            key={index} 
                            onClick={() => actions.setChatId(item.id)} 
                            className="text-decoration-none"> 
            <div className="card mt-2 ">                
                <div className="card-header" id="chat-header">
                    <p>
                    {store.userData.is_student ?
                        item.landlord_name
                        :
                        item.student_name}
                    </p>
                </div>
                <div className="card-body">
                    <p className="card-text">{item.last_message}</p>
                </div> 
              
            </div> 
            </Link>
        )} </>
         }
   
    </>

    )
}