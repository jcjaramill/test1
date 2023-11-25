import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';

//const URL_API = process.env.REACT_APP_URL_API_REST
const URL_API = 'https://usersmachineapp.juan-carlosc491.repl.co'

const Login = ()=>{
    useEffect(()=>{
        fetch(`${URL_API}`, {
            method: 'GET',
            headers:{
                'content-type':'application/json'
            }
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
        })
        .catch(error=>console.log(error))

    }, [])

    const [isInputs, setIsInputs] = useState({
        username: " ",
        password: " "
      });
    
      const navigate = useNavigate();
    
      const handleChangeInput = (e) => {
        console.log(e.target.name);
        console.log(e.target.value);
        setIsInputs({
          ...isInputs,
          [e.target.name]: e.target.value
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        //alert(JSON.stringify(isInputs))
        navigate("/home", { state: isInputs });
      };
    
    
    
      return (
        <div className="container">
          <br></br>
          <h4>Inicio de sesion</h4>
          <hr></hr>
          <div className="cont1 container">
            <form onSubmit={handleSubmit}>
              <input
                id="inputUser"
                className="formLogin form-control"
                type="text"
                name="username"
                placeholder="Ingrese nombre de usuario"
                onChange={handleChangeInput}
                required
                style={{width:'250px'}}
              ></input>
              <input
                id="inputPass"
                className="formLogin form-control mt-1"
                type="password"
                name="password"
                placeholder="Ingrese contraseña"
                onChange={handleChangeInput}
                style={{width:'250px'}}
                required
              ></input>
              <br></br>
              <button id="btnSend" className="btn btn-success btn-sm" type="submit">
                SUBMIT
              </button>
            </form>
            <br></br>
          </div>
        </div>
      );
        

};

export default Login
