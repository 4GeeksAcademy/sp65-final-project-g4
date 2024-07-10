import React from "react";
import "../../styles/notfound.css";
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export const NoAccess = () => {
    const { t, i18n } = useTranslation();


    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.5, delay: 0.5 } }}
            exit={{ opacity: 0, transition: { duration: 1 } }}
            className="content-block d-flex justify-content-center">
            <h1 style={{ "textAlign": "center" }} className="red-color d-flex"> {t('traduccion71')} </h1>
        </motion.div>

    )
}