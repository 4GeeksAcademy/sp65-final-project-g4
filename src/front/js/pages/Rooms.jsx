import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { PhotoGallery } from "../component/PhotoGallery.jsx";
import { Link } from "react-router-dom";

export const AllRooms = () => {
    const {store, actions} = useContext(Context);

    useEffect(() => {
        actions.getRooms();
    }, []);



    return (
        <div className="container mt-4">
            <h3 className="red-color">Habitaciones publicadas</h3>
                {!store.rooms ? 
                "Pantalla de carga"
                :
            <div className="row">
                {store.rooms.map((item, index) =>
                <div className="col-md-4 col-lg-4 col-sm-6 col-xs-12">
                    <div className="card" id={index}> 
                        <PhotoGallery userId={item.id}/>
                        <div className="card-body">
                            <h5>{item.title}</h5>
                            <p>{item.price} €</p>
                            <p>{item.description}</p>
                            <p>{item.square_meters}m²</p>
                            <div className="d-flex justify-content-between ml-0 pl-0">
                            <Link to={`/roomprofile/${item.id}`} className="send-button action-btn-custom mt-1"><strong>Ver detalle</strong></Link>
                                {/* <Link id="details" to={`/charactersdetails/${index}`} className="text-warning float-start"><h6>Details</h6></Link>    
                                <span onClick={() => toggleFavorite(item.name)} className="align-items-end">
                                <i title="Add Favorite" style={{ cursor: "pointer" }} className={isFavorite(item.name) ? "fas fa-heart text-danger fs-5" : "far fa-heart text-danger fs-5"}></i>
                                </span> */}
                            </div>
                        </div>
                    
                    </div> 
            </div>
            )}
            </div>
            }
        </div>
    )
}