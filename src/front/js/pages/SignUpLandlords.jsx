import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";


export const SignupLandlords = () => {
  const {store, actions} = useContext(Context);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

 

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const dataToSend = {email, password};
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
    localStorage.setItem('token', data.access_token, data)
    actions.logedIn(data.data)
    console.log(data.access_token);
    navigate('/')
    
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-3 display-5">
                SignUp for landlords
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group mt-3 h6">
                  <label htmlFor="email" className="mb-1">
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
                <div className="form-group mt-3 h6">
                  <label htmlFor="password" className="mb-1">
                    Password:
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
                <div className="text-center">
                  <button type="submit" className="btn btn-primary mt-5">
                    Sign up
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

