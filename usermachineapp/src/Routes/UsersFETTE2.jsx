import React, {useEffect, useState, useRef} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
//import Dropdown from 'rsuite/esm/Dropdown'
import Dropdown from 'rsuite/Dropdown';
import 'rsuite/dist/rsuite.min.css';
import PageIcon from '@rsuite/icons/Page';
import FolderFillIcon from '@rsuite/icons/FolderFill';
import FileDownloadIcon from '@rsuite/icons/FileDownload';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {ExportToExcel} from '../controller/ExportToExcel'
import {ExportToPDF} from '../controller/ExportToPDF'
import {AmoutUsers} from '../controller/AmoutUsers'

//const URL_API = process.env.REACT_APP_URL_API_REST
const URL_API = 'https://usersmachineapp.juan-carlosc491.repl.co'


const UsersEnvases = ()=>{

    const [isData, setData] = useState({})
    const [home, setHome] = useState(true);
    const [ErrAuth, setErrAuth] = useState(true)
    const [Token, setToken] = useState({})
    const [Id, setid] = useState({})
    const [isarray, setarray] = useState({})

    const navigate = useNavigate()
    const tableRef = useRef(null)
    const btnEditarRef = useRef()
    const btnEliminarRef = useRef()
    const id_usuarioRef = useRef()

    const [modoEdicion, setmodoEdicion] = useState(false);
    const [modoCrear, setmodoCrear] = useState(false);
    const [verEliminar, setverEliminar] = useState(false);
    const [id, setId] = useState("");
  
    const [filaSeleccionada, setfilaSeleccionada] = useState({
      rut: "",
      nombre_apellido: "",
      id_usuario: "",
      nivel: "",
      status: "",
      equipo: "",
      area: "",
      planta: "",
      codigo_LCH: ""
    });

    const [NewRow, setNewRow] = useState([filaSeleccionada])
    const [displayForm, setDisplayForm] = useState(false);
    const [newUser, setNewUser] = useState({
      rut: "",
      nombre_apellido: "",
      id_usuario: "",
      nivel: "",
      status: "",
      equipo: "",
      area: "",
      planta: "",
      codigo_LCH: ""
    });

    const [ NroUser, setNroUser] = useState([])
    const [Excel, setExcel] = useState([])
    const fileName = "users_xlsx"; // here enter filename for your excel file


          
    useEffect(()=>{
        if (JSON.parse(localStorage.getItem("currentUser"))) {
            const currentUser = JSON.parse(localStorage.getItem("currentUser"));
            const currentUser_Token = currentUser.tokenAuth; // your token

            const Get_UsersEnvases = async()=>{
                await fetch(`${URL_API}/usersByPlantSolidosFETTE`, {
                    method:"POST",
                    headers:{
                        'content-type': 'application/json',
                        'authorization': currentUser_Token
                    },

                    body: JSON.stringify({planta:'Solidos', equipo: 'Fette 2090-2', area: 'Compresión'})
                })
                .then(res=>res.json())
                .then(data=>{
                    console.log(data)
                    setData(data)
                    setHome(false)
                    setToken(currentUser_Token)
                    setfilaSeleccionada(data)
                    setNroUser(data.length)

                    const getExcel = async()=>{
                      //alert(currentUser_Token)
                        const arrayData = {equipo: "Fette 2090-2", area: "Compresión", planta: "Solidos"}
                        const headers = {
                          'Authorization': currentUser_Token,
                          'Content-Disposition': 'attachment; filename="report.xlsx"',
                          'Content-type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                          'data':  JSON.stringify(arrayData)
                        }
                        
                          const download = await axios({
                            method: "get",
                            url: `${URL_API}/downloadExcel`,
                            headers: headers,
                            //responseType: 'json',
                            data: {}
                          })      
                          //.then(res => setExcel(res.data))
                          console.log(download.data)
                          setExcel(download.data)


                          /*axios.get('https://jsonplaceholder.typicode.com/posts')
                          .then(r => {
                            setExcel(r.data)
                            console.log(r.data)
                          })*/


                     }
                     getExcel()
                



                })
                .catch(error=>console.log(error))

            }
            Get_UsersEnvases()


        }else{
            if (JSON.parse(localStorage.getItem("currentUser"))) {
                //alert('User already logged')
                setHome(false)
                //setToken(true)
            }else{
        
            console.log('Usuario no autorizado')
            setErrAuth(false)
            }
        
        }
      

    }, [])

    const New_session = () => {
        return navigate("/");
      };

      const Go_inicio = () => {
        return navigate("/home");
      };
    
    const usersEnvasesLectorL1 = () => {
    return navigate("/UsersLectorL1");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setfilaSeleccionada((prevState) => ({
          ...prevState,
          [name]: value
        }));
        console.log(filaSeleccionada);
      };

      const HandleChangeInputs = (e)=>{
        console.log(e.target.value)
        setfilaSeleccionada({
        ...filaSeleccionada,
        [e.target.name]: e.target.value,
        })
    }
    
      const eliminar = () => {
        cancelar()
        if (window.confirm('Desea crear usuario?')){
          setmodoCrear(true);
          //console.log(id);
        }else{
          console.log('terminó')
        }
      };
    
      const editar = async(id, arrayData) => {
        setDisplayForm(false)
        setmodoEdicion(true);
        setId(id);
        console.log(id);
        setarray(arrayData)
        setfilaSeleccionada(arrayData)
      };
    

      const cancelar = () => {
        setmodoEdicion(false);
      };


      const insertRow = () => {
        setNewRow([...NewRow, { ...newUser }]);
        setNewUser({ 
          rut: "",
          nombre_apellido: "",
          id_usuario: "",
          nivel: "",
          status: "",
          equipo: "",
          area: "",
          planta: "",
          codigo_LCH: ""
        });
        setDisplayForm(false);
      };
      const handleOnChange = e => {
        console.log(e.target.value)
        setNewUser({
          ...newUser,
          [e.target.name]: e.target.value
        });
      };



      const usersSolidosFETTE1 = () => {
        return navigate("/UsersFETTE1");
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
      const usersSolidosFETTE1200 = () => {
        return navigate("/UsersFETTE1200");
      };
      const usersSolidosFETTE2020 = () => {
        return navigate("/UsersFETTE2020");
      };


    




    const editarUsuario = async(id) =>{
        //alert(JSON.stringify(filaSeleccionada))
        setId(id)
        console.log(id)
        await fetch(`${URL_API}/editarUsuario/${id}`, {
            method:"put",
            headers:{
                'content-type': 'application/json',
                'authorization': Token
            },

            body: JSON.stringify({
                rut: filaSeleccionada.rut, 
                nombre_apellido: filaSeleccionada.nombre_apellido, 
                id_usuario: filaSeleccionada.id_usuario,
                nivel: filaSeleccionada.nivel,
                status: filaSeleccionada.status,
                equipo: filaSeleccionada.equipo,
                area: filaSeleccionada.area,
                planta: filaSeleccionada.planta,
                codigo_LCH: filaSeleccionada.codigo_LCH,
            })
        })
        .then(res=>res.json())
        .then(data=>{
            //console.log(data)
            if(data.status === 'success'){
                toast.success('Editando usuario', {
                    position: "top-center",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme:"dark"
                })


                const delay2 = ()=> window.location.href = window.location.href;
                //const delay2 = ()=> navigate('/home');
                setTimeout(delay2, 1500)
  
                
            }

            if(data.status === 'error'){
                alert(data.message)
            }
        })
        .catch(error=>console.log(error))

    }




    const eliminarUsuario = async(id, user) =>{
      setDisplayForm(false)
      if(window.confirm('Desea eliminar usuario ' + user.nombre_apellido + '?')){
      console.log(id)
        await fetch(`${URL_API}/editarUsuario/${id}`, {
            method:"delete",
            headers:{
                'content-type': 'application/json',
                'authorization': Token
            }

        })
        .then(res=>res.json())
        .then(data=>{
            //console.log(data)

            if(data.status === 'success'){
                toast.success('Eliminando usuario', {
                    position: "top-center",
                    autoClose: 2500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme:"dark"
                })


                const delay2 = ()=> window.location.href = window.location.href;
                //const delay2 = ()=> navigate('/home');
                setTimeout(delay2, 1500)
  
                
            }

            if(data.status === 'error'){
                alert(data.status)
            }
        })
        .catch(error=>console.log(error))

      }else{
        console.log('No se eliminó usuario')
      }

    }


    const crearUsuario = async(e) =>{
      //alert(JSON.stringify(newUser))
      await fetch(`${URL_API}/editarUsuario`, {
          method:"post",
          headers:{
              'content-type': 'application/json',
              'authorization': Token
          },

          body: JSON.stringify({
              rut: newUser.rut, 
              nombre_apellido: newUser.nombre_apellido, 
              id_usuario: newUser.id_usuario,
              nivel: newUser.nivel,
              status: newUser.status,
              equipo: "Fette 2090-2",
              area: "Compresión",
              planta: "Solidos",
              codigo_LCH: "601-02-025"
          })
      })
      .then(res=>res.json())
      .then(data=>{
          console.log(data)
          if(data.status === 'success'){
            return alert(data.message)
      
         }

          if(data.status === 'error'){
            //console.log(data.data)
            alert(data.message)
            id_usuarioRef.current.value = ""
            id_usuarioRef.current.focus()
            window.stop()

            




          }
      })
      .catch(error=>console.log(error))

  }



  /*const descargarExcel = async() =>{

    const arrayData = {equipo: "Fette 2090-1", area: "Compresión", planta: "Solidos"}
    const headers = {
      'Authorization': Token,
      'Content-Disposition': 'attachment; filename="report.xlsx"',
      'Content-type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'data':  JSON.stringify(arrayData)
    }
    
      const download = await axios({
        method: "get",
        url: `${URL_API}/downloadExcel`,
        headers: headers,
        responseType: 'blob',
        data: {}
      })      
      //.then(res => setExcel(res.data))
      console.log(download.data)
      setExcel(download.data)
        

     }*/

   
  



    
    if(!ErrAuth){
        return (
          <div className="container">
            <br></br>
            <hr></hr>
            <h3>
              USUARIO NO AUTORIZADO
            </h3>
            <br></br>
            <button className="btn btn-warning" onClick={New_session}>GO LOGIN</button>
          </div>
        );
      };
        

    if (home){
        return (
          <div>
    
          <div className="container">
          <div className="loader"></div>
          </div>
          </div>
        );
    
      }
        

    return(
        <div className="container">

            <ToastContainer/>

            <br></br>

            <button id="btnInicio" className="btn btn-warning btn-sm" onClick={Go_inicio}><img src="/images/home.png" width='20px'></img> Inicio</button>

            
              <br></br>
              <hr></hr>

              <div style={{float: 'right'}}>
              <Dropdown title="Descargas" icon={<FileDownloadIcon />} id="btnUsersFETTE1">
                    <Dropdown.Item><ExportToExcel apiData={Excel} fileName={fileName} /></Dropdown.Item>
                    <Dropdown.Item><ExportToPDF apiData={Excel} /></Dropdown.Item>
              </Dropdown>
              </div>
              

              <Dropdown title="Usuarios comprimidoras" icon={<PageIcon />} id='dropdownComp'>
                    <Dropdown.Item onClick={usersSolidosFETTE1}><img src="/images/database.png" width='20px'></img> Comprimidora FETTE 2090 I</Dropdown.Item>
                    <Dropdown.Item  onClick={usersSolidosFETTE3}><img src="/images/database.png" width='20px'></img> Comprimidora FETTE 2090 III</Dropdown.Item>
                    <Dropdown.Item  onClick={usersSolidosFETTE4}><img src="/images/database.png" width='20px'></img> Comprimidora FETTE 2090 IV</Dropdown.Item>
                    <Dropdown.Item  onClick={usersSolidosFETTEWIP}><img src="/images/database.png" width='20px'></img> Comprimidora FETTE 2090 WIP</Dropdown.Item>
                    <Dropdown.Item onClick={usersSolidosFETTE3090}><img src="/images/database.png" width='20px'></img> Comprimidora FETTE 3090 I</Dropdown.Item>
                    <Dropdown.Item onClick={usersSolidosFETTE1200}><img src="/images/database.png" width='20px'></img> Comprimidora FETTE 1200</Dropdown.Item>
                    <Dropdown.Item onClick={usersSolidosFETTE2020}><img src="/images/database.png" width='20px'></img> Comprimidora FETTE 2020</Dropdown.Item>
              </Dropdown>

              <br></br>
              <br></br>

              <h4 >Usuarios comprimidora FETTE 2090-II</h4>

              <AmoutUsers amout={NroUser}/>



              {displayForm ? (
                <form>
                <div>
                  <input
                    placeholder="Ingrese rut"
                    onChange={handleOnChange}
                    value={newUser.rut}
                    name="rut"
                    id="newRut"
                    required
                  />
                  <input
                    placeholder="Ingrese nombre"
                    onChange={handleOnChange}
                    value={newUser.nombre_apellido}
                    name="nombre_apellido"
                    id="newRut"
                    required
                  />
                  <input
                    placeholder="Ingrese ID usuario"
                    onChange={handleOnChange}
                    value={newUser.id_usuario}
                    name="id_usuario"
                    id="newRut"
                    ref={id_usuarioRef}
                    required
                  />
                  <select name="nivel" id="newRut" onChange={handleOnChange} required >
                    <option value= "" >Seleccione nivel</option>
                    <option value="Administrador">Administrador</option>
                    <option value="Operador">Operador</option>
                  </select>
                  <select name="status" id="newRut" onChange={handleOnChange} required>
                    <option value="">Seleccione status</option>
                    <option value="Activo" >Activo</option>
                    <option value="Inactivo">Inactivo</option>
                  </select>
                  {/*
                  <select name="equipo" id="newRut" onChange={handleOnChange} required>
                    <option value="">Equipo</option>
                    <option value="Fette 2090-1" >Fette 2090-1</option>
                  </select>
                  <select name="area" id="newRut" onChange={handleOnChange} required>
                    <option value="">Area</option>
                    <option value="Compresión" >Compresión</option>
                  </select>
                  <select name="planta" id="newRut" onChange={handleOnChange} required>
                    <option value="">Planta</option>
                    <option value="Solidos" >Solidos</option>
              </select>

                  <input
                    placeholder="codigo_LCH"
                    onChange={handleOnChange}
                    value={newUser.codigo_LCH}
                    name="codigo_LCH"
                    id="newRut"
                    //required
                  />
                  */}
                  
                  <button onClick={crearUsuario} id="btnGuardar" title="guardar usuario">
                      <img src="/images/save.png" width='20px'></img>                
                  </button>
                  <button onClick={() => setDisplayForm(!displayForm)} id="btnDeshacer" title="deshacer">
                    <img src="/images/deshacer.png" width='20px'></img>                
                  </button>
                </div>
                </form>                
              ) : (
                <button onClick={() => setDisplayForm(!displayForm)} className="btn btn-success btn-sm" id="btnAgregar" title="Crear usuario">
                    <img src="/images/crear.png" width='20px'></img>                
                </button>
                
              )

            }


                <section className="content">
          <div className="table-responsive table-condensed table-sm tabla">
            <table
              className="table table-striped mt-4"
              id="dataTableData"
              name="dataTableData"
              ref={tableRef}
            >
              <thead className="thead-light">
                <tr>
                    <th style={{ display: "none" }}>Id</th>
                    <th>Rut</th>
                    <th>Nombre y apellido</th>
                    <th>ID Usuario</th>
                    <th>Nivel</th>
                    <th>Status</th>
                    <th>Maquina</th>
                    <th>Area</th>
                    <th>Planta</th>
                    <th>Codigo LCH</th>
                  <th></th>
                </tr>
              </thead>
              <tbody style={{ backgroundColor: "white" }}>
                {isData.length === 0 ? (
                  <tr>
                    <td colSpan={11}>No hay datos</td>
                  </tr>
                ) : (
                  isData.map((item, index) => (
                        <tr key={item._id}>
                      {id === item._id && modoEdicion ? (
                        <React.Fragment>
                          <td>
                            <input
                              type="text"
                              style={{ fontSize: 11, background:"#ffc107" }}
                              className="mb-2"
                              name="rut"
                              value={filaSeleccionada.rut}
                              onChange={HandleChangeInputs}
                              id="inputRut"
                            />
                          </td>
                            
                          <td>
                          <input
                              type="text"
                              style={{ fontSize: 11, background:"#ffc107" }}
                              className="mb-2"
                              name="nombre_apellido"
                              value={filaSeleccionada.nombre_apellido}
                              onChange={HandleChangeInputs}
                              id="inputNombre_apellido"
                            />
                          </td>

                          <td>
                          <input
                              type="text"
                              style={{ fontSize: 11, background:"#ffc107" }}
                              className="mb-2"
                              name="id_usuario"
                              value={filaSeleccionada.id_usuario}
                              onChange={HandleChangeInputs}
                              id="inputId_usuario"
                            />
                          </td>

                          <td>
                          <select name="nivel"  onChange={HandleChangeInputs} required style={{background:"#ffc107"}} >
                            <option value="" >Nivel</option>
                            <option value="Administrador">Administador</option>
                            <option value="Operador">Operador</option>
                          </select>
                          </td>

                          <td>
                          <select name="status"  onChange={HandleChangeInputs} required  style={{background:"#ffc107"}}>
                            <option value="" >Status</option>
                            <option value="Activo">Activo</option>
                            <option value="Inactivo">Inactivo</option>
                          </select>
                          </td>

                          <td>
                            {filaSeleccionada.equipo}
                          </td>

                          <td>
                            {filaSeleccionada.area}
                          </td>

                          <td>
                            {filaSeleccionada.planta}
                          </td>

                          <td>
                          <input
                              type="text"
                              style={{ fontSize: 11, background:"#ffc107"}}
                              className="mb-2"
                              name="codigo_LCH"
                              value={filaSeleccionada.codigo_LCH}
                              onChange={HandleChangeInputs}
                              id="inputCodigo_LCH"
                            />
                          </td>
                          

                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                            <td>{item.rut}</td>
                            <td>{item.nombre_apellido}</td>
                            <td className="id_user">{item.id_usuario}</td>
                            <td>{item.nivel}</td>
                            <td>{item.status}</td>
                            <td>{item.equipo}</td>
                            <td>{item.area}</td>
                            <td>{item.planta}</td>
                            <td>{item.codigo_LCH}</td>
                        </React.Fragment>
                      )}




                      {id === item._id && modoCrear ? (
                        <React.Fragment>
                          <td>
                            <input
                              type="text"
                              style={{ fontSize: 11 }}
                              className="form-control-sm mb-2"
                              name="rut"
                              //value={filaSeleccionada.rut}
                              onChange={HandleChangeInputs}
                              id="inputRut"
                            />
                          </td>
                            
                          <td>
                          <input
                              type="text"
                              style={{ fontSize: 11 }}
                              className="mb-2"
                              name="nombre_apellido"
                             // value={filaSeleccionada.nombre_apellido}
                              onChange={HandleChangeInputs}
                              id="inputNombre_apellido"
                            />
                          </td>

                          <td>
                          <input
                              type="text"
                              style={{ fontSize: 11 }}
                              className="mb-2"
                              name="id_usuario"
                              //value={filaSeleccionada.id_usuario}
                              onChange={HandleChangeInputs}
                              id="inputId_usuario"
                              ref={id_usuarioRef}
                            />
                          </td>

                          <td>
                          <input
                              type="text"
                              style={{ fontSize: 11 }}
                              className="mb-2"
                              name="nivel"
                              //value={filaSeleccionada.nivel}
                              onChange={HandleChangeInputs}
                              id="inputNivel"
                            />
                          </td>

                          <td>
                          <input
                              type="text"
                              style={{ fontSize: 11 }}
                              className="mb-2"
                              name="status"
                              //value={filaSeleccionada.status}
                              onChange={HandleChangeInputs}
                              id="inputStatus"
                            />
                          </td>

                          <td>
                            {filaSeleccionada.equipo}
                          </td>

                          <td>
                            {filaSeleccionada.area}
                          </td>

                          <td>
                            {filaSeleccionada.planta}
                          </td>

                          <td>
                          <input
                              type="text"
                              style={{ fontSize: 11 }}
                              className="mb-2"
                              name="codigo_LCH"
                              //value={filaSeleccionada.status}
                              onChange={HandleChangeInputs}
                              id="inputCodigo_LCH"
                            />
                          </td>

                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                            <td></td>
                        </React.Fragment>
                      )}






                      {id === item._id && modoEdicion ? (
                        <React.Fragment>
                          <td>

                            <button
                              className="btn btn-primary btn-sm"
                              type="submit"
                              onClick={() => editarUsuario(item._id, item)}
                            >
                              <img src="/images/save.png" width='20px'></img>
                            </button>
                              
                            <button
                              className="btn btn-secondary btn-sm"
                              type="submit"
                              onClick={() => cancelar()}
                            >
                               <img src="/images/deshacer.png" width='20px'></img>
                            </button>

                          </td>
                          {/*<td>
                            <button
                              className="btn btn-secondary btn-sm"
                              type="submit"
                              onClick={() => cancelar()}
                            >
                               <img src="/images/deshacer.png" width='20px'></img>
                            </button>
                          </td>*/}
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          <td>
                                <button
                                    className="btn btn-warning btn-sm"
                                    style={{display:'block'}}
                                    type="submit"
                                    onClick={() => editar(item._id, item)}
                                    ref={btnEditarRef}
                                    id="btnEditar"
                                    title="editar usuario"
                                    >
                                    <img src="/images/editar.png" width='20px'></img>
                                </button>



                                <button
                                    className="btn btn-danger btn-sm"
                                    style={{display:'block'}}
                                    type="submit"
                                    onClick={() => eliminarUsuario(item._id, item)}
                                    ref={btnEliminarRef}
                                    id="btnEliminar"
                                    title="eliminar usuario"
                                    >
                                   <img src="/images/eliminar.png" width='20px'></img>
                                </button>


                            </td>

                          
                          {verEliminar ? (
                            <React.Fragment>
                              <td>
                                <button
                                  className="btn btn-danger btn-sm"
                                  type="submit"
                                  onClick={() => eliminar(item._id)}
                                >
                                   <img src="/images/eliminar.png" width='20px'></img>
                                </button>
                              </td>
                            </React.Fragment>
                          ) : (
                            <React.Fragment>
                              <td></td>
                            </React.Fragment>
                          )}
                        </React.Fragment>
                      )}
                    </tr>
                  ))
                )}
              </tbody>

              <tfoot>
                    <tr>
                        <th>Rut</th>
                        <th>Nombre y apellido</th>
                        <th>ID Usuario</th>
                        <th>Nivel</th>
                        <th>Status</th>
                        <th>Maquina</th>
                        <th>Area</th>
                        <th>Planta</th>
                        <th>Codigo_LCH</th>
                    </tr>
                </tfoot>

            </table>

            <AmoutUsers amout={NroUser}/>

            
          </div>
        </section>


        </div>
    )


}



export default UsersEnvases