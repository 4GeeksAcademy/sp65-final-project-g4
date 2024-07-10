import React from "react";
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export const LOPDPG = () => {
    const { t, i18n } = useTranslation();


    return (
        <motion.div 
		initial={{opacity: 0}}
		animate={{opacity: 1, transition: {duration: 0.5, delay: 0.5}}}
		exit={{opacity: 0, transition: {duration: 1}}}
         className="container my-5">
            <h2 className="red-color">{t('traduccion98')}</h2>
            <h3 className="mt-4">{t('traduccion99')}</h3>
            <p>{t('traduccion100')}</p>
            <h3 className="mt-4">{t('traduccion101')}</h3>
            <p>{t('traduccion102')}</p>
            <h3 className="mt-4">{t('traduccion103')}</h3>
            <p>{t('traduccion104')}</p>
            <ul>
                <li>{t('traduccion105')}</li>
                <li>{t('traduccion106')}</li>
                <li>{t('traduccion107')}</li>
                <li>{t('traduccion108')}</li>
            </ul>

            <h3 className="mt-4">{t('traduccion109')}</h3>
            <p>{t('traduccion110')}</p>
            <ul>
                <li>{t('traduccion111')}</li>
                <li>{t('traduccion112')}</li>
                <li>{t('traduccion113')}</li>
                <li>{t('traduccion114')}</li>
                <li>{t('traduccion115')}</li>
            </ul>

            <h3 className="mt-4">{t('traduccion116')}</h3>
            <p>{t('traduccion117')}</p>
            <ul>
                <li>{t('traduccion118')}</li>
                <li>{t('traduccion119')}</li>
                <li>{t('traduccion120')}</li>
                <li>{t('traduccion121')}</li>
            </ul>

            <h3 className="mt-4">{t('traduccion122')}</h3>
            <p>{t('traduccion123')}:</p>
            <ul>
                <li>{t('traduccion124')}</li>
                <li>{t('traduccion125')}</li>
            </ul>


            <h3 className="mt-4">{t('traduccion126')}</h3>
            <p>{t('traduccion127')}</p>
            <h3 className="mt-4">{t('traduccion128')}</h3>
            <p>{t('traduccion129')}</p>
            <h3 className="mt-4">{t('traduccion130')}</h3>
            <p>{t('traduccion131')}</p>
            <h3 className="mt-4">{t('traduccion132')}</h3>
            <p>{t('traduccion133')}</p>
            <ul>
                <li>{t('traduccion134')}</li>
                <li>{t('traduccion135')}</li>
                <li>{t('traduccion136')}</li>
                <li>{t('traduccion137')}</li>
                <li>{t('traduccion138')}</li>
                <li>{t('traduccion139')}</li>
                <li>{t('traduccion140')}</li>
                <li>{t('traduccion141')}</li>
            </ul >
            <h3 className="mt-4">{t('traduccion142')}</h3>
            <p>{t('traduccion143')}</p>
            <h3 className="mt-4">{t('traduccion144')}</h3>
            <p>{t('traduccion145')}</p>
        </motion.div >
    )
}