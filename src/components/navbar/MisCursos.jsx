import React from 'react'
import { Routes, Route, Link }from "react-router-dom";
import NuevoCurso from "./NuevoCurso";


const MisCursos = () => {
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
        


    </div>
  )
}

export default MisCursos