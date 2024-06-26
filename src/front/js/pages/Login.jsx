// 1. Import React, Hooks
import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


// 5 Exportar y 2 Crear el componente
export const Login = () => {
  const { store, actions } = useContext(Context);
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
    <>  {/* fragment */}
      <div className="container text-start">
        <h1>Login</h1>
        <form onSubmit={handleSumbit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
              value={email} onChange={handleEmail} />  {/* 3.1. value 3.2. onChange */}
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <div className="input-group">
              <input type={viewPassword ? "text" : "password"} className="form-control" id="exampleInputPassword1"
                value={password} onChange={handlePassword} />
              <span className="input-group-text fs-6" onClick={handleViewPassword}>
                {viewPassword ? <i className="far fa-eye-slash"></i> : <i className="far fa-eye"></i>}
              </span>
            </div>
          </div>

          <button type="submit" className="btn btn-primary mt-3">Submit</button>
          <button type="reset" className="btn btn-secondary ms-3 mt-3"
            onClick={handleReset}>
            Reset
          </button>
        </form>
      </div>
    </>
  )
}
