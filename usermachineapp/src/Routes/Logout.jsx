import {useNavigate} from 'react-router-dom'
//import {useEffect} from 'react'

//require('dotenv').config()
//const URL_APP = process.env.REACT_APP_URL_APP
const URL_API = 'https://usersmachineapp.juan-carlosc491.repl.co'


const Logout = ()=>{

    const navigate = useNavigate()
   
    if(JSON.parse(localStorage.getItem("currentUser"))){
       JSON.parse(localStorage.getItem("currentUser"));

    }else{
        alert('no existe usuario')
    }


    const New_session = ()=>{
        return navigate('/')
    }


    localStorage.removeItem('currentUser')

    return (

       <div className="container">
           <br></br>
           <hr></hr>

           <button className="btn btn-warning" onClick={New_session}>Ir a nueva sesion</button>

       </div>

    )



}

export default Logout