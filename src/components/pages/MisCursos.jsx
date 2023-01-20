import { Link }from "react-router-dom";

import Profile from "../login/Profile";
import TarjetasInstructor from "../customs/TarjetasInstructor";

const MisCursos = () => {   
  //const {isAuthenticated} = useAuth0()
  let isAuthenticated=''
  if (localStorage.getItem('id')) {
    isAuthenticated = localStorage.getItem('id')
  }

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
        
        <TarjetasInstructor/>
        
        
        


    </div>
  )
}

export default MisCursos