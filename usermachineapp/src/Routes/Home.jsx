import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios"
//import Dropdown from 'react-bootstrap/Dropdown';
import Dropdown from 'rsuite/Dropdown';
import Button from 'rsuite/Button';
import 'rsuite/dist/rsuite.min.css';
import PageIcon from '@rsuite/icons/Page';
import FolderFillIcon from '@rsuite/icons/FolderFill';
//import {Navbar, Nav, Container, NavDropdown} from 'react-bootstrap'
import "../styles.css"



//require('dotenv').config()
//const URL_API = process.env.REACT_APP_URL_API_REST
const URL_API = 'https://usersmachineapp.juan-carlosc491.repl.co'


const Home = () => {
  const { state } = useLocation();
  const [Token, setToken] = useState([]);
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
    //console.log("state", state);
    if(state){
      const GetToken = async () => {
        const data = await fetch(`${URL_API}/auth`, {
        //const data = await fetch(`http://192.168.1.84:5000/auth`, {
          method: "post",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            username: state.username,
            password: state.password
          })
        });
        const res = await data.json();
        console.log(res);

        if (res.message) {
          alert(res.message);
          return navigate("/");
        }

        if (res.error) {
          alert(res.error);
          return navigate("/");
        }


        const date = Date.now()
        const today = new Date(date)
        const day = (today.getDate()).toString()
        const month = (today.getMonth() + 1).toString()
        const year = (today.getFullYear()).toString()
        const current_date = year + '-' + month + '-' + day
        console.log(month)
        setCurrentDate(current_date)
        setMonth(today.getMonth() + 1)    
    

        setToken(res.token);
        setHome(false);
      };
      GetToken();
  

    }else{
      if (JSON.parse(localStorage.getItem("currentUser"))) {
        //alert('User already logged')
        setHome(false)
        setToken(true)
      }else{

      console.log('Usuario no autorizado')
      setErrAuth(false)
      }

    }


  }, [state, navigate]);


  
  const New_session = () => {
    return navigate("/");
  };

  const log_out = () => {
    return navigate("/logout");
  };

  const usersEnvasesLectorL1 = () => {
    return navigate("/UsersLectorL1");
  };

  const usersEnvasesLectorL2 = () => {
    return navigate("/UsersLectorL2");
  };

  const usersEnvasesLectorL4 = () => {
    return navigate("/UsersLectorL4");
  };
  const usersEnvasesTelecamL4 = () => {
    return navigate("/UsersTelecamL4");
  };
  const usersEnvasesBalanzaL1 = () => {
    return navigate("/UsersBalanzaL1");
  };
  const usersEnvasesBalanzaL2 = () => {
    return navigate("/UsersBalanzaL2");
  };
  const usersEnvasesBalanzaL4 = () => {
    return navigate("/UsersBalanzaL4");
  };
  const usersSolidosFETTE1 = () => {
    return navigate("/UsersFETTE1");
  };
  const usersSolidosFETTE2 = () => {
    return navigate("/UsersFETTE2");
  };
  const usersSolidosFETTE3 = () => {
    return navigate("/UsersFETTE3");
  };
  const usersSolidosFETTE4 = () => {
    return navigate("/UsersFETTE4");
  };
  const usersSolidosFETTEWIP = () => {
    return navigate("/UsersFETTEWIP");
  };
  const usersSolidosFETTE3090 = () => {
    return navigate("/UsersFETTE3090");
  };
  const usersSolidosFETTE2020 = () => {
    return navigate("/UsersFETTE2020");
  }
  const usersSolidosCIT60 = () => {
    return navigate("/UsersCIT60");
  };
  const usersSolidosCIT120 = () => {
    return navigate("/UsersCIT120");
  };
  const usersSolidosDiosnaP400B = () => {
    return navigate("/UsersDiosnaP400B");
  };
  const usersSolidosACG = () => {
    return navigate("/UsersACG");
  };
  const usersSolidosGLATT = () => {
    return navigate("/UsersGLATT");
  };
  const usersSolidosMulticota150_1 = () => {
    return navigate("/UsersMulticota150_1");
  };
  const usersSolidosMulticota150_2 = () => {
    return navigate("/UsersMulticota150_2");
  };
  const usersSolidosMulticota370 = () => {
    return navigate("/UsersMulticota370");
  };
  const usersSolidosCanguro500 = () => {
    return navigate("/UsersCanguro500");
  };
  const usersSolidosCanguro1200 = () => {
    return navigate("/UsersCanguro1200");
  };
  const usersOSD_All = () => {
    return navigate("/UsersAll");
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
              <hr></hr>

              <button 
                  id="btnLogout" 
                  className="btn btn-warning btn-sm" 
                  onClick={log_out}
                  ><img src="/images/logout.png" width='20px'></img> SALIR
              </button>

              <h4 style={{color: "darkblue"}}>BIENVENIDO AL SISTEMA DE GESTION DE USUARIOS DE MAQUINAS</h4>
              <br></br>
              <br></br>
              <br></br>
                  <div className="btn-group-vertical">
                    <Dropdown title="USUARIOS PLANTA DE ENVASES" id="btnUsersEnvases" placement="rightStart" icon={<img src="/images/database.png" width='20px'></img>}>
                          <Dropdown.Menu title="Linea 1" icon={<FolderFillIcon />}>
                              <Dropdown.Item><img src="/images/database.png" width='20px'></img> Blistera Uhlmann</Dropdown.Item>
                              <Dropdown.Item onClick={usersEnvasesLectorL1}><img src="/images/database.png" width='20px'></img> Estuchadora Uhlmann</Dropdown.Item>
                              <Dropdown.Item onClick={usersEnvasesBalanzaL1}><img src="/images/database.png" width='20px'></img> Balanza dinamica</Dropdown.Item>
                          </Dropdown.Menu>

                          <Dropdown.Menu title="Linea 2" icon={<FolderFillIcon />}>
                              <Dropdown.Item ><img src="/images/database.png" width='20px'></img> Blistera M92</Dropdown.Item>
                              <Dropdown.Item onClick={usersEnvasesLectorL2}><img src="/images/database.png" width='20px'></img> Estuchadora HV</Dropdown.Item>
                              <Dropdown.Item onClick={usersEnvasesBalanzaL2}><img src="/images/database.png" width='20px'></img> Balanza dinamica</Dropdown.Item>
                          </Dropdown.Menu>

                          <Dropdown.Menu title="Linea 3" icon={<FolderFillIcon />}>
                              <Dropdown.Item><img src="/images/database.png" width='20px'></img> Blistera Blipack</Dropdown.Item>
                              <Dropdown.Item><img src="/images/database.png" width='20px'></img> Estuchadora HV</Dropdown.Item>
                              <Dropdown.Item><img src="/images/database.png" width='20px'></img> Tamper Evident</Dropdown.Item>
                              <Dropdown.Item><img src="/images/database.png" width='20px'></img> Balanza dinámica</Dropdown.Item>
                          </Dropdown.Menu>

                          <Dropdown.Menu title="Linea 4" icon={<FolderFillIcon />}>
                              <Dropdown.Item onClick={usersEnvasesTelecamL4}><img src="/images/database.png" width='20px'></img> Blistera Blipack</Dropdown.Item>
                              <Dropdown.Item  onClick={usersEnvasesLectorL4}><img src="/images/database.png" width='20px'></img> Estuchadora HV</Dropdown.Item>
                              <Dropdown.Item onClick={usersEnvasesBalanzaL4}><img src="/images/database.png" width='20px'></img> Balanza dinámica</Dropdown.Item>
                          </Dropdown.Menu>

                          <Dropdown.Menu title="Linea 5" icon={<FolderFillIcon />}>
                              <Dropdown.Item><img src="/images/database.png" width='20px'></img> Blistera NMX</Dropdown.Item>
                              <Dropdown.Item><img src="/images/database.png" width='20px'></img> Estuchadora HV</Dropdown.Item>
                              <Dropdown.Item><img src="/images/database.png" width='20px'></img> Balanza dinámica</Dropdown.Item>
                              <Dropdown.Item><img src="/images/database.png" width='20px'></img> Enfajadora G35</Dropdown.Item>
                          </Dropdown.Menu>

                          <Dropdown.Menu title="Linea 6" icon={<FolderFillIcon />}>
                              <Dropdown.Item><img src="/images/database.png" width='20px'></img> Blistera Uhlmann</Dropdown.Item>
                              <Dropdown.Item><img src="/images/database.png" width='20px'></img> Estuchadora Uhlmann</Dropdown.Item>
                              <Dropdown.Item><img src="/images/database.png" width='20px'></img> Balanza dinamica</Dropdown.Item>
                          </Dropdown.Menu>

                          <Dropdown.Menu title="Linea 7" icon={<FolderFillIcon />}>
                              <Dropdown.Item><img src="/images/database.png" width='20px'></img> Blistera Uhlmann</Dropdown.Item>
                              <Dropdown.Item><img src="/images/database.png" width='20px'></img> Estuchadora Uhlmann</Dropdown.Item>
                              <Dropdown.Item><img src="/images/database.png" width='20px'></img> Balanza dinamica</Dropdown.Item>
                          </Dropdown.Menu>

                          <Dropdown.Menu title="Linea 8" icon={<FolderFillIcon />}>
                              <Dropdown.Item><img src="/images/database.png" width='20px'></img> Blistera Marchesini</Dropdown.Item>
                              <Dropdown.Item><img src="/images/database.png" width='20px'></img> Estuchadora Marchesini</Dropdown.Item>
                              <Dropdown.Item><img src="/images/database.png" width='20px'></img> Tamper Marchesini</Dropdown.Item>
                          </Dropdown.Menu>

                          <Dropdown.Menu title="Linea 9" icon={<FolderFillIcon />}>
                              <Dropdown.Item><img src="/images/database.png" width='20px'></img> Blistera Uhlmann</Dropdown.Item>
                              <Dropdown.Item><img src="/images/database.png" width='20px'></img> Estuchadora Uhlmann</Dropdown.Item>
                              <Dropdown.Item><img src="/images/database.png" width='20px'></img> Balanza dinamica</Dropdown.Item>
                          </Dropdown.Menu>

                          <Dropdown.Menu title="Linea 10" icon={<FolderFillIcon />}>
                              <Dropdown.Item><img src="/images/database.png" width='20px'></img> Blistera M92</Dropdown.Item>
                              <Dropdown.Item><img src="/images/database.png" width='20px'></img> Estuchadora HV</Dropdown.Item>
                              <Dropdown.Item><img src="/images/database.png" width='20px'></img> Balanza dinamica</Dropdown.Item>
                          </Dropdown.Menu>
                    </Dropdown> 




                    <Dropdown title="USUARIOS PLANTA DE SOLIDOS"  id="btnUsersSolidos" placement="rightStart" icon={<img src="/images/database.png" width='20px'></img>} >
                        <Dropdown.Menu title="Compresion" icon={<FolderFillIcon />}>
                              <Dropdown.Item onClick={usersSolidosFETTE1}><img src="/images/database.png" width='20px'></img> Comprimidora FETTE 2090 I</Dropdown.Item>
                              <Dropdown.Item onClick={usersSolidosFETTE2}><img src="/images/database.png" width='20px'></img> Comprimidora FETTE 2090 II</Dropdown.Item>
                              <Dropdown.Item onClick={usersSolidosFETTE3}><img src="/images/database.png" width='20px'></img> Comprimidora FETTE 2090 III</Dropdown.Item>
                              <Dropdown.Item onClick={usersSolidosFETTE4}><img src="/images/database.png" width='20px'></img> Comprimidora FETTE 2090 IV</Dropdown.Item>
                              <Dropdown.Item onClick={usersSolidosFETTEWIP}><img src="/images/database.png" width='20px'></img> Comprimidora FETTE 2090 WIP</Dropdown.Item>
                              <Dropdown.Item onClick={usersSolidosFETTE3090}><img src="/images/database.png" width='20px'></img> Comprimidora FETTE 3090 I</Dropdown.Item>
                              <Dropdown.Item><img src="/images/database.png" width='20px'></img> Comprimidora FETTE 1200</Dropdown.Item>
                              <Dropdown.Item onClick={usersSolidosFETTE2020}><img src="/images/database.png" width='20px'></img> Comprimidora FETTE 2020</Dropdown.Item>
                        </Dropdown.Menu>

                        <Dropdown.Menu title="Granulación" icon={<FolderFillIcon />}>
                            <Dropdown.Item onClick={usersSolidosCIT60}><img src="/images/database.png" width='20px'></img> Secadora CIT60</Dropdown.Item>
                            <Dropdown.Item onClick={usersSolidosCIT120}><img src="/images/database.png" width='20px'></img> Secadora CIT120</Dropdown.Item>
                            <Dropdown.Item onClick={usersSolidosDiosnaP400B}><img src="/images/database.png" width='20px'></img> Diosna P400B</Dropdown.Item>
                            <Dropdown.Item onClick={usersSolidosACG}><img src="/images/database.png" width='20px'></img> Secadora ACG</Dropdown.Item>
                            <Dropdown.Item onClick={usersSolidosGLATT}><img src="/images/database.png" width='20px'></img> Linea GLATT</Dropdown.Item>
                        </Dropdown.Menu>

                        <Dropdown.Menu title="Recubrimiento" icon={<FolderFillIcon />}>
                            <Dropdown.Item onClick={usersSolidosMulticota150_1}><img src="/images/database.png" width='20px'></img> Recubridora Multicota 150-1</Dropdown.Item>
                            <Dropdown.Item onClick={usersSolidosMulticota150_2}><img src="/images/database.png" width='20px'></img> Recubridora Multicota 150-2</Dropdown.Item>
                            <Dropdown.Item onClick={usersSolidosMulticota370}><img src="/images/database.png" width='20px'></img> Recubridora Multicota 370</Dropdown.Item>
                        </Dropdown.Menu>

                        <Dropdown.Menu title="Preparación" icon={<FolderFillIcon />}>
                            <Dropdown.Item onClick={usersSolidosCanguro500}><img src="/images/database.png" width='20px'></img> Mezclador de bins Canguro 500</Dropdown.Item>
                            <Dropdown.Item onClick={usersSolidosCanguro1200}><img src="/images/database.png" width='20px'></img> Mezclador de bins Canguro 1200</Dropdown.Item>
                        </Dropdown.Menu>

                    </Dropdown> 


                    <Button id="btnUsersTodos" onClick={usersOSD_All}><img src="/images/database.png" width='20px'></img> TODOS LOS USUARIOS</Button>

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
