import { Routes, Route, Link }from "react-router-dom";

import NuevoCurso from "./NuevoCurso";
import Profile from "../login/Profile";
import Tarjetas from '../customs/TarjetasInstructor';


const MisCursos = () => {   

  return (
    <div>
      <h6>mostrando profile</h6>
      <Profile/>
        <h1>MisCursos</h1>
        <h3>Mostrando Cursos del Instructor</h3>
        <p>si no tiene cursos mostrara: AUN NO TIENES CURSOS, CREA UN CURSO</p>
        
      {/* boton para crear nuevo curso .................*/}
        <div className="container mt-5">
          <Link to="/NuevoCurso" className="btn btn-info"> Crear Nuevo Curso </Link>
        </div>
        
        <Tarjetas/>
        
        
        {/* {isAuthenticated? <Profile/>
          :<h3>no inicio sesion aun</h3>
          } */}


    </div>
  )
}

export default MisCursos