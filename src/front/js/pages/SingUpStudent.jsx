import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext.js";


export const SignupStudents = () => {
  const { actions } = useContext(Context)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [dni, setDni] = useState("");
  const [is_student, setIsStudent] = useState("");
  const navigate = useNavigate();
  

  const handleEmailChange = (event) => {setEmail(event.target.value);};
  const handlePasswordChange = (event) => {setPassword(event.target.value);};
/*   const handleNameChange = (event) => {setName(event.target.value);};
  const handleLastnameChange = (event) => {setLastname(event.target.value);};
  const handleIdChange = (event) => {setDni(event.target.value);}; */


  const handleSubmit = async (event) => {
    event.preventDefault();
    const dataToSend = { email, password };
    const url = process.env.BACKEND_URL + '/api/signupstudents';
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
    actions.setIsLogin(true)
    // console.log(data.access_token);
    
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-3 display-5">Sign Up</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group mt-3 h6">
                  <label htmlFor="email" className="mb-1">Email:</label>
                  <input type="email" className="form-control" id="email"
                    value={email} onChange={handleEmailChange} required/>
                </div>
                <div className="form-group mt-3 h6">
                  <label htmlFor="password" className="mb-1">Password:</label>
                  <input type="password" className="form-control" id="password"
                    value={password} onChange={handlePasswordChange} required/>
                </div>
                <div className="form-group mt-3 h6">
                  <label htmlFor="text" className="mb-1">Name:</label>
                  <input type="text" className="form-control" id="name"
                    value={name} onChange={handleNameChange}/>
                </div>
                <div className="form-group mt-3 h6">
                  <label htmlFor="text" className="mb-1">Lastname:</label>
                  <input type="text" className="form-control" id="lastname"
                    value={lastname} onChange={handleLastnameChange} />
                </div>
                <div className="form-group mt-3 h6">
                  <label htmlFor="text" className="mb-1">ID:</label>
                  <input type="text" className="form-control" id="dni"
                    value={dni} onChange={handleIdChange} />
                </div>
                <div className="mb-3 form-check">
                  <input type="checkbox" className="form-check-input" id="exampleCheck1"
                    value={is_student} onChange={handleIsStudentChange}/>
                  <label className="form-check-label" htmlFor="exampleCheck1">I'm a student</label>
                </div>
                <div className="mb-3 form-check">
                  <input type="checkbox" className="form-check-input" id="exampleCheck2"
                    value={is_landlord} onChange={handleIsLandlordChange} />
                  <label className="form-check-label" htmlFor="exampleCheck1">I'm a landlord</label>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary mt-5">Sign Me Up</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};