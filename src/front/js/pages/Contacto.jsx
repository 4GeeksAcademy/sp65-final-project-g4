import React, { useState, useRef } from "react";
import emailjs from 'emailjs-com';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export const Contacto = () => {
    const { t, i18n } = useTranslation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const form = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        emailjs.sendForm('service_1eluay2', 'template_gv43qeb', form.current, 'oKu5UICX5-_je1Lw_')
            .then((result) => {
                console.log(result.text);
                alert('Message Sent Successfully!');
            }, (error) => {
                console.log(error.text);
                alert('An error occurred, please try again');
            });
        e.target.reset();
    }

    return (
        <motion.div 
		initial={{opacity: 0}}
		animate={{opacity: 1, transition: {duration: 0.5, delay: 0.5}}}
		exit={{opacity: 0, transition: {duration: 1}}}
		className="home-container"
		>
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col-xsm-12 col-sm-10 col-md-9 col-lg-9">
                        <div className="d-flex justify-content-center">
                            <h2 className="red-color">{t('traduccion34')}</h2>
                        </div>
                        <div className="form-container">
                            <div className="w-40">
                                <form ref={form} onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="inputName" className="form-label red-color">{t('traduccion35')}</label>
                                        <input type="text" className="form-control" id="inputName"
                                            value={name} onChange={(event) => setName(event.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="inputContactEmail" className="form-label red-color">{t('traduccion36')}</label>
                                        <input type="email" className="form-control" id="inputContactEmail" aria-describedby="emailHelp"
                                            value={email} onChange={(event) => setEmail(event.target.value)} />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="inputMessage" className="form-label red-color">{t('traduccion37')}</label>
                                        <textarea type="text" className="form-control" id="inputMessage" aria-describedby="messageHelp" rows="2"
                                            value={message} onChange={(event) => setMessage(event.target.value)} ></textarea>
                                    </div>
                                    <button type="submit" className="btn-custom send-button red-background mb-2">{t('traduccion38')}</button>
                                </form>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </motion.div>
    )
}