import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import { NoAccess } from "./NoAccess.jsx";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

export const UploadFlats = () => {
    const { t, i18n } = useTranslation();
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        description: "",
        address: "",
        postal_code: "",
        city: "",

    });

    const handleSubmit = () => {
        console.log("Saving data...", formData);
        createNewFlat(formData);
        actions.setEditingFlat(formData);
    }

    const createNewFlat = async (dataToSend) => {
        const url = `${process.env.BACKEND_URL}/api/flats`;
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${store.accessToken}`
            },
            body: JSON.stringify(dataToSend)
        }

        const response = await fetch(url, options);
        if (!response.ok) {
            console.log("Error");
            return;
        }
        const newFlat = await response.json();
        actions.setFlatId(newFlat.redirect)
        if (newFlat.redirect) {
            navigate(`/flatProfile/${newFlat.redirect}`)
        }
        await actions.getFlats();
        actions.createNewFlat(newFlat)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    return (
        <>
            {store.userData.is_student ? <NoAccess />
                :
                <div className="container mt-3 mb-2">
                    <div className="row d-flex justify-content-center ">
                        <div className="col-xsm-12 col-sm-11 col-md-10 col-lg-8 ">
                            <h3 className="red-color mb-2 mt-2 text-center">{t('traduccion47')}</h3>
                            <div className="card-body">
                                <h6> {t('traduccion48')}</h6>
                                <p>{t('traduccion49')}</p>
                                <textarea
                                    className="form-control"
                                    rows="2"
                                    type="text"
                                    name="description"
                                    placeholder="Descripción"
                                    value={formData.description}
                                    onChange={handleChange}>
                                </textarea>
                                <h6 className="mt-4 mb-4"> {t('traduccion52')}</h6>
                                <p className="mb-0 pb-0">{t('traduccion53')}</p>
                                <input className="form-control mb-3"
                                    type="text"
                                    name="address"
                                    placeholder="Calle, XY"
                                    value={formData.address}
                                    onChange={handleChange}
                                />
                                <p className="mb-0 pb-0">{t('traduccion54')}</p>
                                <input className="form-control mb-3"
                                    type="text"
                                    name="postal_code"
                                    placeholder="08000"
                                    value={formData.postal_code}
                                    onChange={handleChange}
                                    aria-label="default input example"
                                />
                                <p className="mb-0 pb-0">{t('traduccion55')}</p>
                                <input className="form-control mb-3"
                                    type="text"
                                    name="city"
                                    placeholder="Barcelona"
                                    value={formData.city}
                                    onChange={handleChange}
                                    aria-label="default input example"
                                />
                                <button className="send-button btn-custom red-background mt-1 mb-4" onClick={() => handleSubmit()}>{t('traduccion90')}</button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}