import { React, useState } from "react";

import { Link, NavLink } from "react-router-dom";

//import LogoutButton from "../login/LogoutButton";

import LoginButton from "../login/LoginButton";
import LogoutButton from "../login/LogoutButton";
import { useAuth0 } from '@auth0/auth0-react'


const Navbar = () => {

  const { isAuthenticated, isLoading } = useAuth0()
  const [esEstudiante, setEsEstudiante] = useState(true)
  if (isLoading) return <h1>Cargando...</h1>


  // const isAuthenticated = localStorage.getItem('email')
  // console.log('mostrando valor local desde NAVBAR')
  // console.log(isAuthenticated)
  // console.log('NAVBAR cierra')

  return (
    <div className="mt-2">
      <div className="navbar navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">FCPN</Link>
        <div>
          {/* {isAuthenticated ? <LogoutButton />
            : <NavLink to="/Login" className="btn btn-dark mr-2  "> Iniciar Sesion </NavLink>
          } */}

          {isAuthenticated ?
            <>
              {esEstudiante ?
                <>
                  <Link to="/" className="btn btn-dark mr-2"> Cursos </Link>
                  <NavLink to="/CursoEstudiante" className="btn btn-dark mr-2"> Mis Cursos </NavLink>
                  <LogoutButton />
                </>
                :
                <>
                  <Link to="/CursoInstructor" className="btn btn-dark mr-2"> Mis Cursos </Link>
                  <NavLink to="/NuevoCurso" className="btn btn-dark mr-2"> Nuevo Curso</NavLink>
                  <NavLink to="/Foro" className="btn btn-dark mr-2"> Foro </NavLink>
                </>

              }
            </>
            :
            <>
              <Link to="/" className="btn btn-dark mr-2"> Cursos </Link>
              <LoginButton />
            </>
          }
        </div>
      </div>
      <hr />
    </div>
  )
}

export default Navbar