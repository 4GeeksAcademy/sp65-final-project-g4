import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { UploadImagesFlats } from "../component/UploadImagesFlats.jsx";
import { NoAccess } from "./NoAccess.jsx";
import { useTranslation } from 'react-i18next';

export const EditFlats = () => {
    const { t, i18n } = useTranslation();
    const { store, actions } = useContext(Context);
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
        description: "",
        address: "",
        postal_code: "",
        city: "",
        
    });
   
    const initializeFlatData = () => {
		setName(store.userData.landlord_name);
		setLastname(store.userData.landlord_lastname);
		setBirthDate(store.userData.birth_Date);
		setDni(store.userData.dni);
		setPhoneNumber(store.userData.phone_number);
		setUrlImage(store.userData.profile_picture)
	}

    const [description, setDescription] = useState('');
	const [address, setAddress] = useState('');
	const [postal_code, setPostal_code] = useState('');
	const [city, setCity] = useState('');
	const [albumId, setAlbumId] = useState('');

    const handleSave = () => {
        console.log("Saving data...", formData);
        actions.createNewFlat(formData);
        actions.setEditingFlat(formData);
        console.log(store.editingFlat);
    };
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };



    return (
        <>
        {store.userData.is_student ? <NoAccess/>
        :
            <div className="container mt-3 mb-2">
                <div className="row d-flex justify-content-center ">
                    <div className="col-xsm-12 col-sm-10 col-md-8 col-lg-8 ">
                        <h3 className="red-color mb-2 mt-2 justify-content-center">{t('traduccion47')}</h3>
                        <div className="accordion accordion-custom" id="accordionExample">
                            <div className="accordion-item pb-3">
                                <h2 className="accordion-header" id="headingOne">
                                    <button className={`accordion-button ${activeStep === 0 ? "" : "collapsed"} custom-accordion-button`}
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseOne"
                                        aria-expanded={activeStep === 0}
                                        aria-controls="collapseOne">
                                        <h6> {t('traduccion48')}</h6>
                                    </button>
                                </h2>
                                <div className={`accordion-collapse collapse ${activeStep === 0 ? "show" : ""}`}
                                    id="collapseOne"
                                    aria-labelledby="headingOne"
                                    data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <p><strong>{t('traduccion49')}</strong></p>
                                        <input className="form-control"
                                            type="text"
                                            name="description"
                                            rows="2"
                                            placeholder={t('traduccion50')}
                                            value={formData.description}
                                            onChange={handleChange}
                                        />
                                        <button className="send-button action-btn-custom mt-1" onClick={() => handleNext(1)}><strong>{t('traduccion51')}</strong></button>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item pb-3">
                                <h2 className="accordion-header" id="headingTwo">
                                    <button className={`accordion-button ${activeStep === 1 ? "" : "collapsed"} custom-accordion-button`}
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseTwo"
                                        aria-expanded={activeStep === 1}
                                        aria-controls="collapseTwo">
                                        <h6> {t('traduccion52')}</h6>
                                    </button>
                                </h2>
                                <div className={`accordion-collapse collapse ${activeStep === 1 ? "show" : ""}`}
                                    id="collapseTwo"
                                    aria-labelledby="headingTwo"
                                    data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <p><strong>{t('traduccion53')}</strong></p>
                                        <input className="form-control"
                                            type="text"
                                            name="address"
                                            placeholder="Calle, XY"
                                            value={formData.address}
                                            onChange={handleChange}
                                        />
                                        <p><strong>{t('traduccion54')}</strong></p>
                                        <input className="form-control"
                                            type="text"
                                            name="postal_code"
                                            placeholder="08000"
                                            value={formData.postal_code}
                                            onChange={handleChange}
                                            aria-label="default input example"
                                        />
                                        <p><strong>{t('traduccion55')}</strong></p>
                                        <input className="form-control"
                                            type="text"
                                            name="city"
                                            placeholder="Barcelona"
                                            value={formData.city}
                                            onChange={handleChange}
                                            aria-label="default input example"
                                        />
                                        <button className="send-button action-btn-custom action-btn-left mt-1" onClick={() => handleLast(0) }><strong>Anterior</strong></button>
                                        <button className="send-button action-btn-custom mt-1" onClick={() => {handleNext(2); handleSave();}}><strong>Guardar y subir fotos</strong></button>
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item pb-3">
                                <h2 className="accordion-header" id="headingThree">
                                    <button className={`accordion-button ${activeStep === 2 ? "" : "collapsed"} custom-accordion-button`}
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseThree"
                                        aria-expanded={activeStep === 2}
                                        aria-controls="collapseThree">
                                        <h6> {t('traduccion56')}</h6>
                                    </button>
                                </h2>
                                <div className={`accordion-collapse collapse ${activeStep === 2 ? "show" : ""}`}
                                    id="collapseThree"
                                    aria-labelledby="headingThree"
                                    data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <p><strong>{t('traduccion')}57</strong> {t('traduccion58')}</p>
                                        <UploadImagesFlats />
                                        <button className="send-button action-btn-custom action-btn-left mt-1" onClick={() => handleLast(1)}><strong>{t('traduccion59')}</strong></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
        </>
    );
};