import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../styles/login.css";
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export const Signup = () => {
  const { t, i18n } = useTranslation();
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [role, setRole] = useState(true);  //True es Student, False es Landlord
  const [warning, setWarning] = useState(false);

  const navigate = useNavigate();

  const switchRole = () => {
    setRole(!role)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword1Change = (e) => {
    setPassword1(e.target.value);
  };

  const handlePassword2Change = (e) => {
    setPassword2(e.target.value);
  };

  const handleReset = () => {
    setEmail('');
    setPassword1('');
    setPassword2('');
  }

  const handleStudentSubmit = async (event) => {
    event.preventDefault();
    if (password1 == password2) {
      const dataToSend = {
        email: email,
        password: password1
      };
      const url = `${process.env.BACKEND_URL}/api/signupstudents`;
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      };
      const response = await fetch(url, options)
      console.log(response)
      if (!response.ok) {
        console.log('Error: ', response.status, response.statusText)
        return
      }
      const data = await response.json()
      console.log(data);
      localStorage.setItem('token', data.access_token)
      localStorage.setItem('user', JSON.stringify(data.data))
      actions.logedIn(data)
      handleReset()
      navigate('/')
    } else {
      setPassword1('');
      setPassword2('');
      warningPop()
    }
  };

  const warningPop = () => {
    setWarning(!warning)
  }

  const handleLandlordSubmit = async (event) => {
    event.preventDefault();
    if (password1 == password2) {
      const dataToSend = {
        email: email,
        password: password1
      };
      const url = `${process.env.BACKEND_URL}/api/signuplandlords`;
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataToSend)
      };
      const response = await fetch(url, options)
      console.log(response)
      if (!response.ok) {
        console.log('Error: ', response.status, response.statusText)
        return
      }
      const data = await response.json()
      console.log(data)
      localStorage.setItem('token', data.access_token)
      localStorage.setItem('user', JSON.stringify(data.data))
      actions.logedIn(data)
      console.log(data.access_token);
      navigate('/dashboard')
    } else {
      setPassword1('');
      setPassword2('');
      warningPop()
    }

  };

  return (
    <motion.div 
		initial={{opacity: 0}}
		animate={{opacity: 1, transition: {duration: 0.5, delay: 0.5}}}
		exit={{opacity: 0, transition: {duration: 1}}}>
      <div className="row d-flex justify-content-end">
        <div className="col-6 d-flex justify-content-center">
          <a type="button" className="detalles p-3 mt-4 mx-auto" onClick={switchRole}>
            {role ? 
            <>{t('traduccion79')}</>
            : 
            <>{t('traduccion80')}</>
            }
          </a>
        </div>
      </div>

      {role ?
        <div className="login-container">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="">
                <div className="header"></div>
                <div className="card-body">
                  <h2 className="red-color mt-2">
                  {t('traduccion81')}
                  </h2>
                  <form onSubmit={handleStudentSubmit}>
                    <div className="form-group mt-3">
                      <label htmlFor="email" className="form-label red-color">
                      {t('traduccion36')}:
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        value={email}
                        onChange={handleEmailChange}
                        required
                      />
                      <div id="emailHelp" className="form-text">{t('traduccion60')}</div>
                    </div>
                    <div className="form-group mt-3">
                      <label htmlFor="password1" className="form-label red-color">
                      {t('traduccion61')}:
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password1"
                        aria-describedby="passwordHelp"
                        value={password1}
                        onChange={handlePassword1Change}
                        required
                      />
                    </div>
                    <div className="form-group mt-2">
                      <label htmlFor="password2" className="form-label red-color">
                      {t('traduccion82')}:
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password2Control"
                        aria-describedby="password2ControlHelp"
                        value={password2}
                        onChange={handlePassword2Change}
                        required
                      />
                    </div>
                    <div id="password2ControlHelp" className="form-text">{t('traduccion83')} <Link to="/login">{t('traduccion84')}</Link></div>
                    <div>
                      {warning ? <div className="alert alert-warning text-center" role="alert">
                        {t('traduccion85')}
                      </div> : <></>}
                      <button type="submit" className="btn-custom red-background my-4">
                      {t('traduccion86')}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        :
        <div className="login-container">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="">
                <div className="card-body">
                  <h2 className="red-color mt-2">
                  {t('traduccion87')}
                  </h2>
                  <form onSubmit={handleLandlordSubmit}>
                    <div className="form-group mt-3">
                      <label htmlFor="email" className="form-label red-color">
                      {t('traduccion36')}:
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        value={email}
                        onChange={handleEmailChange}
                        required
                      />
                      <div id="emailHelp" className="form-text">Nunca compartiremos tu email con nadie.</div>
                    </div>
                    <div className="form-group mt-3">
                      <label htmlFor="password1" className="form-label red-color">
                      {t('traduccion61')}:
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password1"
                        value={password1}
                        onChange={handlePassword1Change}
                        required
                      />
                    </div>
                    <div className="form-group mt-2">
                      <label htmlFor="password2" className="form-label red-color">
                      {t('traduccion82')}:
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password2Control"
                        aria-describedby="password2ControlHelp"
                        value={password2}
                        onChange={handlePassword2Change}
                        required
                      />
                    </div>
                    <div id="password2ControlHelp" className="form-text">{t('traduccion83')} <Link to="/login">{t('traduccion84')}</Link></div>
                    <div>
                      {warning ? <div className="alert alert-warning text-center" role="alert">
                        {t('traduccion85')}
                      </div> : <></>}
                      <button type="submit" className="btn-custom red-background my-4">
                      {t('traduccion86')}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      }

    </motion.div>
  );
};
