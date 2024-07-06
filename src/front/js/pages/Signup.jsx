import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../styles/login.css";

export const Signup = () => {
  const { store, actions } = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(true);  //True es Student, False es Landlord

  const navigate = useNavigate();

  const switchRole = () => {
    setRole(!role)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleReset = () => {
    setEmail(' ');
    setPassword(' ');
  }

  const handleStudentSubmit = async (event) => {
    event.preventDefault();
    const dataToSend = {
      email: email,
      password: password
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

    localStorage.setItem('token', JSON.stringify(data.access_token))
    localStorage.setItem('user', JSON.stringify(data.data))
    actions.logedIn(data)
    handleReset()
    navigate('/')
  };

/*   const handleLandlordSubmit = async (event) => {
    event.preventDefault();
    const dataToSend = {
      email: email,
      password: password
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
    if (!response.ok) {
      console.log('Error: ', response.status, response.statusText)
      return
    }
    const data = await response.json()

    localStorage.setItem('token', JSON.stringify(data.access_token))
    localStorage.setItem('user', JSON.stringify(data.data))
    actions.logedIn(data)
    handleReset()
    navigate('/')
  }; */
  const handleLandlordSubmit = async (event) => {
    event.preventDefault();
    const dataToSend = {email: email, 
                        password: password};
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
    localStorage.setItem('token', JSON.stringify(data.access_token))
    localStorage.setItem('user',  JSON.stringify(data.data))
    actions.logedIn(data)
    console.log(data.access_token);
    navigate('/')
    
  };

  return (
    <>
      <div className="row d-flex justify-content-center">
        <div className="col-6 d-flex justify-content-center">
          <button type="button" className="btn-custom p-3 mt-4 red-background mx-auto" onClick={switchRole}>
            {role ? 'Soy propietario' : 'Soy estudiante'}
          </button>
        </div>
      </div>

      {role ?
        <div className="login-container">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="">
                <div className="card-body">
                  <h2 className="red-color mt-2">
                    Darme de alta como estudiante
                  </h2>
                  <form onSubmit={handleStudentSubmit}>
                    <div className="form-group mt-3">
                      <label htmlFor="email" className="form-label red-color">
                        Email:
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                      />
                    </div>
                    <div className="form-group mt-3">
                      <label htmlFor="password" className="form-label red-color">
                        Contraseña:
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                      />
                    </div>
                    <div>
                      <button type="submit" className="btn-custom red-background my-4">
                        Darme de alta
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
                    Darme de alta como propietario
                  </h2>
                  <form onSubmit={handleLandlordSubmit}>
                    <div className="form-group mt-3">
                      <label htmlFor="email" className="form-label red-color">
                        Email:
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                      />
                    </div>
                    <div className="form-group mt-3">
                      <label htmlFor="password" className="form-label red-color">
                        Contraseña:
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                      />
                    </div>
                    <div>
                      <button type="submit" className="btn-custom red-background my-4">
                        Darme de alta
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      }

    </>
  );
};

