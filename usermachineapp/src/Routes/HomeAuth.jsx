import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios"
//import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap'
import "../styles.css"



//require('dotenv').config()
//const URL_API = process.env.REACT_APP_URL_API_REST
const URL_API = 'https://usersmachineapp.juan-carlosc491.repl.co'


const Home = () => {
  const { state } = useLocation();
  const [Token, setToken] = useState([]);
  //const [User, setUser] = useState([]);
  //const [Role, setRole] = useState([]);
  const [home, setHome] = useState(true);
  const navigate = useNavigate();
  const [ErrAuth, setErrAuth] = useState(true)
  const [ CurrentDate, setCurrentDate] = useState([])
  const [ Month, setMonth] = useState([])

  const [isInputDate, setIsInputDate] = useState({
    date: " "
  });



  const btnDownload = useRef()


  useEffect(() => {
    if (JSON.parse(localStorage.getItem("currentUser"))) {
        //alert('User already logged')
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        const currentUser_Token = currentUser.tokenAuth 
        
        const date = Date.now()
        const today = new Date(date)
        const day = (today.getDate()).toString()
        const month = (today.getMonth() + 1).toString()
        const year = (today.getFullYear()).toString()
        const current_date = year + '-' + month + '-' + day
        console.log(month)
        setCurrentDate(current_date)
        setMonth(today.getMonth() + 1)    

        setHome(false)
        setToken(currentUser_Token)
      }else{
          setErrAuth(false)
      }
  }, []);


  
  const New_session = () => {
    return navigate("/");
  };

  const log_out = () => {
    return navigate("/logout");
  };

  const go_graphics = () => {

    return navigate("/charts", {state: {current_date: CurrentDate, current_month: Month}});
  };




//obtiene archivo report en formato CSV
  const Get_report = async()=>{
    setHome(true)

        const url = `${URL_API}/UpdateAndDownload_report`;
        axios({
            url: url,
            method: "GET",
            headers:{
              'Authorization': Token,
              //'Authorization': 'algo12345',
            },
            responseType: "json", // importante
            onDownloadProgress: (progressEvent) => {
            var percentCompleted = Math.round((progressEvent.loaded * 100) /  progressEvent.total);
            console.log(percentCompleted)
            },
        }).then((response) => {

          if(response.data.status === 'error'){
            setHome(false)
            alert(response.data.message)
            //return navigate('/')
            return setErrAuth(false)
          }


          const url = window.URL.createObjectURL(new  Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "report.csv");
          document.body.appendChild(link);
          link.click();

          //console.log(response.data)

          setHome(false)
              

    
        }).catch(error=>console.log(error));
    

  }



  

// obtiene archivo graph en formato JPG
  const Report_Graph = async()=>{
    setHome(true)
    const url = `${URL_API}/get_graph/`;
    axios({
        url: url,
        method: "GET",
        headers:{
          'Authorization': Token.token,
        },
        responseType: "blob", // importante
        onDownloadProgress: (progressEvent) => {
        var percentCompleted = Math.round((progressEvent.loaded * 100) /  progressEvent.total);
        console.log(percentCompleted)
        },
    }).then((response) => {
        const url = window.URL.createObjectURL(new  Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "report_graph.jpg");
        document.body.appendChild(link);
        link.click();
        
        if (response.status === 200){
            const res = async()=>{
                await fetch('http://192.168.1.83:4000/response_json', {
                  headers:{
                    'content-type':'application/json',
                    'authorization': Token.token
                  }
                })
                .then(res=>res.json())
                .then(data=>{
                    console.log(data)

                })
            }
            res()

            setHome(false)



        }else{
            const res_fail = JSON.stringify({'message':'Download fail'})
            console.log(res_fail) 
        }



    });

  }

//renders
//============================================================================================================================

  if(!ErrAuth){
    return (
      <div className="container">
        <br></br>
        <hr></hr>
        <h3>
          USUARIO NO AUTORIZADO
        </h3>
        <br></br>
        <button className="btn btn-warning btn-sm" onClick={New_session}>GO LOGIN</button>
      </div>
    );
  }


  if (home){
    return (
      <div>

      <div className="container">
      <div className="loader"></div>
      </div>
      </div>
    );

  }



  //if (Token && User && Role) {
  if (Token) {
      localStorage.setItem(
      "currentUser",
      //JSON.stringify({ tokenAuth: Token, userAuth: User, RoleAuth: Role })
      JSON.stringify({ tokenAuth: Token})
    );

    if (JSON.parse(localStorage.getItem("currentUser"))) {
      //const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      //const currentUser_User = currentUser.userAuth; // your token

      if (home){
      return (
        <div>

        <div className="container">
        <div className="loader"></div>
        </div>
        </div>
      );

    }

      return (
        <div className="container">
              <br></br>
              <hr></hr>
              <button id="btnLogout" className="btn btn-warning btn-sm" onClick={log_out}><img src="/images/logout.png" width='28px'></img> SALIR</button>

              <h4 style={{color: "darkblue"}}>BIENVENIDO</h4>
              <br></br>

              <div className="d-grid gap-2 col-4 mx-auto mt-4">
                  <button id="btnGet" className="btn btn-success" onClick={Get_report} ><img src="/images/download.png" width='28px'></img> DOWNLOAD REPORT CSV</button>

                  <button id="btnGraphics" className="btn btn-success mt-4" onClick={go_graphics}><img src="/images/charts.png" width='28px'></img> GRAPHICS</button>
              </div>



              
          </div>

      );
    } else {
      return (
        <div className="container">
          <br></br>
          <hr></hr>
          <h3>
            AUTORIZADO
          </h3>
          <button className="btnRetry btn-warning" onClick={New_session}>
            Go login
          </button>
        </div>
      );
    }
  }


};

export default Home;
