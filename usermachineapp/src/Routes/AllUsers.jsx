import React, {useEffect, useState, useRef} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import DataTables from "react-data-table-component";
import DataTableExtensions from "react-data-table-component-extensions";
import "react-data-table-component-extensions/dist/index.css";

//datatable.net
import $ from "jquery";
import DataTable from "datatables.net-bs5";
import 'datatables.net-responsive-bs5'
$.DataTable = DataTable;

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
import {Data} from '../controller/Data'



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
    const tableRef = useRef()
    const btnEditarRef = useRef()
    const btnEliminarRef = useRef()
    const btnCancelarRef = useRef()
    const btnGuardarRef = useRef()

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
    const [NamePDF, setNamePDF] = useState([])

    const ButtonCell = ({ row }) =>{ 
      return(
        <div>
          <button onClick={() => console.log(row)} className="btn btn-warning btn-sm"><img src='images/editar.png' alt='' width='20px'></img></button>
          <button onClick={() => console.log(row)} className="btn btn-danger btn-sm" style={{float:'right'}}><img src='images/eliminar.png' alt='' width='20px'></img></button>      
        </div>
      )
    };
      

    const columns = [
      {
        name: <div style={{fontSize:"14px"}}><b>Rut</b></div>,
        selector: "rut",
        sortable: true,
        maxWidth: '200px',
      },
      {
        name:<div style={{fontSize:"14px"}}><b>Nombre</b></div>,
        selector: "nombre_apellido",
        sortable: true,
        wrap: true
      },
      {
        name: <div style={{fontSize:"14px"}}><b>ID usuario</b></div>,
        selector: "id_usuario",
        sortable: true,
        wrap: true,
        cell: row=> <div style={{fontStyle:"italic"}}><b>{row.id_usuario}</b></div>

      },
      {
        name: <div style={{fontSize:"14px"}}><b>Nivel</b></div>,
        selector: "nivel",
        sortable: true,
        wrap: true
      },
      {
        name: <div style={{fontSize:"14px"}}><b>Status</b></div>,
        selector: "status",
        sortable: true,
        wrap: true
      },
      {
        name: <div style={{fontSize:"14px"}}><b>Maquina</b></div>,
        selector: "equipo",
        sortable: true,
        wrap: true
      },
      {
        name: <div style={{fontSize:"14px"}}><b>Planta</b></div>,
        selector: "equipo",
        sortable: true,
        wrap: true
      },
      {
        name: <div style={{fontSize:"14px"}}><b>Area</b></div>,
        selector: "area",
        sortable: true,
        wrap: true
      },
      {
        name: <div style={{fontSize:"14px"}}><b>Codigo LCH</b></div>,
        selector: "codigo_LCH",
        sortable: true,
        wrap: true
      },
      {
        name: <div style={{fontSize:"14px"}}><b>Acciones</b></div>,
        cell: row=><ButtonCell row={row}/>,
      }


    ];


  
    


          
    useEffect(()=>{
        if (JSON.parse(localStorage.getItem("currentUser"))) {
            const currentUser = JSON.parse(localStorage.getItem("currentUser"));
            const currentUser_Token = currentUser.tokenAuth; // your token

            const Get_UsersEnvases = async()=>{
                await fetch(`${URL_API}/usersAll`, {
                    method:"GET",
                    headers:{
                        'content-type': 'application/json',
                        'authorization': currentUser_Token
                    }

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
                        //const arrayData = {equipo: "Fette 2090-1", area: "Compresión", planta: "Solidos"}
                        const headers = {
                          'Authorization': currentUser_Token,
                          'Content-Disposition': 'attachment; filename="report.xlsx"',
                          'Content-type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                          //'data':  JSON.stringify(arrayData)
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
                          setNamePDF('OSD')


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




    const generateJSONFile = (data) => {

      // Convertir el objeto en una cadena JSON
      const jsonData = JSON.stringify(data, null, 2); // El segundo argumento "null" y el tercer argumento "2" son para dar formato legible.

      // Crear un objeto Blob para el archivo JSON
      const blob = new Blob([jsonData], { type: 'application/json' });

      // Crear una URL para el Blob
      const url = URL.createObjectURL(blob);

      // Crear un elemento <a> para descargar el archivo
      const a = document.createElement('a');
      a.href = url;
      a.download = 'data.json'; // Nombre del archivo

      // Simular un clic en el elemento <a> para descargar el archivo
      a.click();

      // Liberar recursos
      URL.revokeObjectURL(url);
    };
    //generateJSONFile(Excel)


  
    const GetDataTable = ()=>{
      console.log('TABLE')
        const Table = $(tableRef.current).DataTable({
            dom: '',
            responsive: true,
            bDestroy: true
         })
    
      }


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
      const usersSolidosFETTE1200 = () => {
        return navigate("/UsersFETTE1200");
      };
      const usersSolidosFETTE2020 = () => {
        return navigate("/UsersFETTE2020");
      };


    
      const tableData = {
        columns,
        isData
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
              equipo: "Fette 2090-1",
              area: "Compresión",
              planta: "Solidos",
              codigo_LCH: "601-02-024"
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

              <button id="btnInicio" className="btn btn-warning btn-sm" onClick={Go_inicio}><img src="/images/home.png" width='25px'></img> Inicio</button>
            
              <br></br>
              <hr></hr>

              <div style={{float: 'right'}}>
              <Dropdown title="Descargas" icon={<img src="/images/download.png" width='25px'></img>} id="btnUsersFETTE1">
                    <Dropdown.Item><ExportToExcel apiData={Excel} fileName={NamePDF} /></Dropdown.Item>
                    <Dropdown.Item><ExportToPDF apiData={Excel} fileName={NamePDF} /></Dropdown.Item>
              </Dropdown>
              </div>
              



              <Dropdown title="Usuarios comprimidoras" id='dropdownComp'>
                    <Dropdown.Item onClick={usersSolidosFETTE2}><img src="/images/database.png" width='20px'></img> Comprimidora FETTE 2090 II</Dropdown.Item>
                    <Dropdown.Item  onClick={usersSolidosFETTE3}><img src="/images/database.png" width='20px'></img> Comprimidora FETTE 2090 III</Dropdown.Item>
                    <Dropdown.Item  onClick={usersSolidosFETTE4}><img src="/images/database.png" width='20px'></img> Comprimidora FETTE 2090 IV</Dropdown.Item>
                    <Dropdown.Item  onClick={usersSolidosFETTEWIP}><img src="/images/database.png" width='20px'></img> Comprimidora FETTE 2090 WIP</Dropdown.Item>
                    <Dropdown.Item onClick={usersSolidosFETTE3090}><img src="/images/database.png" width='20px'></img> Comprimidora FETTE 3090 I</Dropdown.Item>
                    <Dropdown.Item onClick={usersSolidosFETTE1200}><img src="/images/database.png" width='20px'></img> Comprimidora FETTE 1200</Dropdown.Item>
                    <Dropdown.Item onClick={usersSolidosFETTE2020}><img src="/images/database.png" width='20px'></img> Comprimidora FETTE 2020</Dropdown.Item>
              </Dropdown>

              <br></br>
              <br></br>


              <h4 >Usuarios Planta OSD</h4>

              <AmoutUsers amout={NroUser}/>




              {/*<DataTableExtensions
                  columns={columns}
                  data={isData}>
                    <DataTables
                      //columns={columns}
                      //data={isData}
                      noHeader
                      defaultSortField="id"
                      defaultSortAsc={false}
                      pagination
                      highlightOnHover
                      responsive={true}
                      striped={true}   // a rayas
                    />
              </DataTableExtensions>*/}





      <table ref={tableRef}
              className="table table-striped"
              id="table"
              width="100%"
              name="dataTableData"
              //onLoad={GetDataTable}
             >
              <thead className="thead-light">
                <tr>
                    <th>Rut</th>
                    <th>Nombre y apellido</th>
                    <th>ID Usuario</th>
                    <th>Nivel</th>
                    <th>Status</th>
                    <th>Maquina</th>
                    <th>Area</th>
                    <th>Planta</th>
                    <th>Codigo LCH</th>
                    <th>Acciones</th>
                </tr>
              </thead>
              <tbody style={{ backgroundColor: "white" }}>
                {isData.length === 0 ? (
                  <tr>
                    <td colSpan={11}>No hay datos</td>
                  </tr>
                ) : (
                  isData.map((item) => (
                        <tr key={item._id}>
                          
                            <td>{item.rut}</td>
                            <td>{item.nombre_apellido}</td>
                            <td className="id_user">{item.id_usuario}</td>
                            <td>{item.nivel}</td>
                            <td>{item.status}</td>
                            <td>{item.equipo}</td>
                            <td>{item.area}</td>
                            <td>{item.planta}</td>
                            <td>{item.codigo_LCH}</td>
                            <td>
                              <button onClick={()=>alert(item._id)} className="btn btn-warning btn-sm"><img src="/images/editar.png" alt="" width='20px'></img></button>
                              <button className="btn btn-danger btn-sm"><img src="/images/eliminar.png" alt="" width='20px' style={{float:'right'}}></img></button>
                            </td>
                        </tr>
                    )
                    )

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
                        <th>Codigo LCH</th>
                        <th>Acciones</th>
                    </tr>
                </tfoot>

    </table>





          




        </div>
    )


}



export default UsersEnvases