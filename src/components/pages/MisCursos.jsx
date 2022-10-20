import {useAuth0} from '@auth0/auth0-react'

import { Routes, Route, Link }from "react-router-dom";

import NuevoCurso from "./NuevoCurso";
import Profile from "../login/Profile";


const MisCursos = () => {

  const {isAuthenticated} = useAuth0()

  return (
    <div>
        <h1>MisCursos</h1>
        <p>Aun no tienes cursos.....
          crea un nuevo Curso
        </p>
        
      {/* boton para crear nuevo curso .................*/}
        <div className="container mt-5">
          <Link to="/NuevoCurso" className="btn btn-info mr-2"> Crear Curso </Link>
          <Routes>
            <Route path="/NuevoCurso" element={<NuevoCurso/>}/>
          </Routes> 
        </div>
        
        {isAuthenticated? <Profile/>
          :<h3>no inicio sesion aun</h3>
          }


    </div>
  )
}

export default MisCursos