import { Link } from "react-router-dom";

import TarjetasInstructor from "../customs/TarjetasInstructor";

const MisCursosDocente = ({ idPer }) => {
  //const {isAuthenticated} = useAuth0()
  let isAuthenticated = ''
  if (localStorage.getItem('id')) {
    isAuthenticated = localStorage.getItem('id')
  }

  return (
    <div className="container">

      <h1 className='text-center'>Mis Cursos</h1>
      <h3 className='text-center'>Mostrando Cursos del Instructor</h3><br /><br />


      {/* boton para crear nuevo curso .................*/}
      <div >
        <Link to="/NuevoCurso" className="btn btn-info"> Crear Nuevo Curso </Link>
      </div>

      <TarjetasInstructor idPersona={idPer} />

    </div>
  )
}

export default MisCursosDocente