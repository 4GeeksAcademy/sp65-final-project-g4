import React, { useState, useContext } from "react";
import { Context } from "../store/appContext.js";
import { useTranslation } from 'react-i18next';

export const PostFlatImg = () => {
    const { t, i18n } = useTranslation();
    const [selectedFiles, setSelectedFiles] = useState([]);
    const { store, actions } = useContext(Context);

    const handleFileChange = (event) => {
        setSelectedFiles(event.target.files);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const flatID = store.currentFlat.id;
        if (selectedFiles.length > 0 && flatID) {
            const formData = new FormData();
            Array.from(selectedFiles).forEach(file => {
                formData.append("imgs", file);
            });

            // Upload images to Cloudinary
            await actions.uploadToCloudinary(formData);

            // Create album in the backend
            const albumData = {
                flat_id: flatID,
                cloudinary_url: store.albumCloudinary.url, // Assuming the response contains this URL
            };
            await actions.createAlbum(albumData);

            // Update the flat with the new album ID
            await actions.editFlats({ id_album: store.newAlbumId });
        }
    };

    return (
        <>
            <div className="container mt-5 d-flex justify-content-center">
                <div className='col-12'>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <input
                                type="file"
                                className="form-control form-control-sm"
                                onChange={handleFileChange}
                                accept="image/*"
                                multiple
                            />
                        </div>
                        <button type="submit" className="btn action-btn-center mt-0"><strong>{t('traduccion88')}</strong></button>
                    </form>
                </div>
            </div>
        </>
    );
};