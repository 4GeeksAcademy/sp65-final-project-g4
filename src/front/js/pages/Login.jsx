// 1. Import React, Hooks
import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../styles/login.css";
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

// 5 Exportar y 2 Crear el componente
export const Login = () => {
  const { store, actions } = useContext(Context);
  const { t, i18n } = useTranslation();
  // 3 Code JS
  // 3.1 Declarar estados
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [viewPassword, setViewPassword] = useState(false)
  const navigate = useNavigate();


  // 3.x - Definir las funciones de los onChange
  // Funcion Estandar
  function handleEmail(event) {
    setEmail(event.target.value)
  }
  // Función flecha
  const handlePassword = (event) => {
    setPassword(event.target.value)
  }

  const handleReset = () => {
    setEmail('');
    setPassword('');
  }

  const handleViewPassword = () => setViewPassword(!viewPassword)

  const handleSumbit = (event) => {
    event.preventDefault();
    const dataToSend = {
      email: email,
      password: password
    }
    actions.loginUser(dataToSend)
    handleReset()
    navigate('/')
  }


  // 4 última instrucción JS, que retorna un solo elemento HTML
  return (
    <motion.div 
		initial={{opacity: 0}}
		animate={{opacity: 1, transition: {duration: 0.5, delay: 0.5}}}
		exit={{opacity: 0, transition: {duration: 1}}}
     className="login-container card-body">
      <h2 className="red-color">{t('navbar10')}</h2>
      <form onSubmit={handleSumbit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label red-color">{t('traduccion36')}: </label>
          <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
            value={email} onChange={handleEmail} />  {/* 3.1. value 3.2. onChange */}
          <div id="emailHelp" className="form-text">{t('traduccion60')}</div>
        </div>

        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label red-color">{t('traduccion61')}</label>
          <div className="input-group">
            <input type={viewPassword ? "text" : "password"} className="form-control" id="exampleInputPassword1" aria-describedby="passwordHelp"
              value={password} onChange={handlePassword} />
            <span className="input-group-text fs-6" onClick={handleViewPassword}>
              {viewPassword ? <i className="far fa-eye-slash"></i> : <i className="far fa-eye"></i>}
            </span>
          </div>
            <div id="passwordHelp" className="form-text">{t('traduccion62')} <Link to="/signup">{t('traduccion63')}</Link></div>
        </div>

        <button type="submit" className="btn-custom red-background">{t('traduccion38')}</button>
        <button type="reset" className="btn-custom btn-secondary ms-3 mt-3"
          onClick={handleReset}>
          {t('traduccion64')}
        </button>
      </form>
    </motion.div>
  )
}
