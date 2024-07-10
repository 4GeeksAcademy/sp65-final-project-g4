import React from "react";
import "../../styles/notfound.css";
import { useTranslation } from 'react-i18next';

export const NoAccess = () => {
    const { t, i18n } = useTranslation();


    return(
        <div className="content-block d-flex justify-content-center">
        <h1 style={{"textAlign":"center"}} className="red-color d-flex"> {t('traduccion71')} </h1>
        </div>

    )
}