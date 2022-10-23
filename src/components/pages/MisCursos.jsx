import {useAuth0} from '@auth0/auth0-react'

import { Routes, Route, Link }from "react-router-dom";

import NuevoCurso from "./NuevoCurso";
import Profile from "../login/Profile";
import Tarjetas from '../customs/Tarjetas';


const MisCursos = () => {   

  const {isAuthenticated} = useAuth0()

  return (
    <div>
        <h1>MisCursos</h1>
        <h3>Mostrando Cursos del Instructor</h3>
        <p>si no tiene cursos mostrara: AUN NO TIENES CURSOS, CREA UN CURSO</p>
        
      {/* boton para crear nuevo curso .................*/}
        <div className="container mt-5">
          <Link to="/NuevoCurso" className="btn btn-info"> Crear Nuevo Curso </Link>
          <Routes>
            <Route path="/NuevoCurso" element={<NuevoCurso/>}/>
          </Routes> 
        </div>
        <Tarjetas/>
        
        {isAuthenticated? <Profile/>
          :<h3>no inicio sesion aun</h3>
          }


    </div>
  )
}

export default MisCursos