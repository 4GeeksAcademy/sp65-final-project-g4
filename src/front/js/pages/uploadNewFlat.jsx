import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { UploadImage } from "../component/Albums.jsx";

export const UploadNewFlat = () => {

    const {store, actions} = useContext(Context);
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
        description: "",
        address: "",
        postalCode: "",
        images: []
    });

    useEffect(() => {
        actions.createNewFlat();
    }, []);

    const handleNext = (step) => {
        setActiveStep(step);
    };

    const handleSave = () => {
        console.log("Saving data...", formData);
        // Here you would usually call an action to save the data
        // actions.saveFlat(formData);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    return (
    <>
    <div className="container mt-3 mb-2">
        <div className="row d-flex justify-content-center ">
            <div className="card col-xsm-12 col-sm-10 col-md-8 col-lg-8 ">
                <h3 className="red-color mb-2 mt-2">Publica tu piso</h3>
                <div className="accordion accordion-custom" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                        <button className={`accordion-button ${activeStep === 0 ? "" : "collapsed"} custom-accordion-button`}
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseOne"
                                aria-expanded={activeStep === 0}
                                aria-controls="collapseOne">
                        <h6> Paso 1: Describe tu piso</h6>
                        </button>
                        </h2>
                        <div className={`accordion-collapse collapse ${activeStep === 0 ? "show" : ""}`}
                             id="collapseOne"
                             aria-labelledby="headingOne"
                             data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <p><strong>Describe como es tu piso, cuantas habitaciones tiene, requisitos de entrada y cualqueir informacion que consideres relevante para tus futuros inquilinos</strong></p>
                            <textarea className="form-control" 
                                    id="exampleFormControlTextarea1" 
                                    rows="2" 
                                    placeholder="Amplio piso exterior con 3 habitaciones..." 
                                    value={formData.description}
                                    onChange={handleChange}>
                            </textarea>
                            <button className="send-button btn-custom red-background" onClick={() => handleNext(1)}>Siguiente</button>
                         </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingTwo">
                        <button className={`accordion-button ${activeStep === 1 ? "" : "collapsed"} custom-accordion-button`}
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseTwo"
                                aria-expanded={activeStep === 1}
                                aria-controls="collapseTwo">
                            <h6> Paso 2: ¿En dónde está ubicado?</h6>
                        </button>
                        </h2>
                        <div className={`accordion-collapse collapse ${activeStep === 1 ? "show" : ""}`}
                            id="collapseTwo"
                            aria-labelledby="headingTwo"
                            data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <p><strong>Indícanos tu dirección</strong></p>
                            <input className="form-control"
                                    type="text"
                                    name="address"
                                    placeholder="Calle, XY"
                                    value={formData.address}
                                    onChange={handleChange}
                                    aria-label="default input example"
                            />
                            <p><strong>Indícanos tu código postal</strong></p>
                            <input className="form-control"
                                    type="text"
                                    name="postalCode"
                                    placeholder="08000"
                                    value={formData.postalCode}
                                    onChange={handleChange}
                                    aria-label="default input example"
                            />
                            <button className="send-button btn-custom red-background" onClick={() => handleNext(2)}>Siguiente</button>                            
                        </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingThree">
                        <button className={`accordion-button ${activeStep === 2 ? "" : "collapsed"} custom-accordion-button`}
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseThree"
                                aria-expanded={activeStep === 2}
                                aria-controls="collapseThree">
                            <h6> Paso 3: Comparte fotos</h6>
                        </button>
                        </h2>
                        <div className={`accordion-collapse collapse ${activeStep === 2 ? "show" : ""}`}
                            id="collapseThree"
                            aria-labelledby="headingThree"
                            data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <p><strong>Comparte al menos 3 fotos del piso. </strong> Recomendamos compartir fotos del salon, la cocina y los baños. </p>

                            <UploadImage />
                            <button className="send-button btn-custom red-background" onClick={handleSave}>Guardar y revisar</button>
                        </div>
                        </div>
                    </div>
                    </div>
            </div>
        </div>
    </div>
    </>
    )
}