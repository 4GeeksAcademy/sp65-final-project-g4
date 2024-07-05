import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../styles/login.css";

export const Signup = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const handleSubmit = async (event) => {
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

  return (
    <div className="login-container">
      <div className="row justify-content-center">
        <div className="col-md-12">
          <div className="">
            <div className="card-body">
              <h2 className="red-color">
                Students SignUp
              </h2>
              <form onSubmit={handleSubmit}>
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
                <div>
                  <button type="submit" className="btn-custom red-background my-4">
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

