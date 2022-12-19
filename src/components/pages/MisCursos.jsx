import { Link }from "react-router-dom";

import Profile from "../login/Profile";
import Tarjetas from '../customs/TarjetasInstructor';

import {useAuth0} from '@auth0/auth0-react'

const MisCursos = () => {   
  const {isAuthenticated} = useAuth0()

  return (
    <div className="container mt-5">
      {/* <h6>mostrando profile</h6> */}
      {/* <Profile/> */}
      {isAuthenticated? <Profile/>
          :<h3>no inicio sesion aun</h3>
          }
        <h1>MisCursos</h1>
        <h3>Mostrando Cursos del Instructor</h3>
        <p>si no tiene cursos mostrara: AUN NO TIENES CURSOS, CREA UN CURSO</p>
        
      {/* boton para crear nuevo curso .................*/}
        <div >
          <Link to="/NuevoCurso" className="btn btn-info"> Crear Nuevo Curso </Link>
        </div>
        
        <Tarjetas/>
        
        
        


    </div>
  )
}

export default MisCursos