import { Link }from "react-router-dom";

import TarjetasInstructor from "../customs/TarjetasInstructor";

const MisCursosDocente = ({idPer}) => {   
  //const {isAuthenticated} = useAuth0()
  let isAuthenticated=''
  if (localStorage.getItem('id')) {
    isAuthenticated = localStorage.getItem('id')
  }

  return (
    <div className="container">
      <center>
        <h1>Mis Cursos</h1>
        <h3>Mostrando Cursos del Instructor</h3><br/><br/>
      </center>
        
      {/* boton para crear nuevo curso .................*/}
        <div >
          <Link to="/NuevoCurso" className="btn btn-info"> Crear Nuevo Curso </Link>
        </div>
        
        <TarjetasInstructor idPersona = {idPer}/>

    </div>
  )
}

export default MisCursosDocente