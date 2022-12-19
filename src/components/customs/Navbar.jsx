import React from "react";

import { Link, NavLink } from "react-router-dom";

//import LogoutButton from "../login/LogoutButton";

import LoginButton from "../login/LoginButton";
import LogoutButton from "../login/LogoutButton";
import {useAuth0} from '@auth0/auth0-react'


const Navbar = () => {

  const {isAuthenticated, isLoading} = useAuth0()
  if(isLoading) return <h1>Cargando...</h1>

  // const isAuthenticated = localStorage.getItem('email')
  // console.log('mostrando valor local desde NAVBAR')
  // console.log(isAuthenticated)
  // console.log('NAVBAR cierra')

  return (
    <div className="mt-2">
      <div className="navbar navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">FCPN</Link>
        <div>
          <Link to="/" className="btn btn-dark mr-2"> Mis Cursos </Link>
          <NavLink to="/NuevoCurso" className="btn btn-dark mr-2"> Nuevo Curso </NavLink>
          <NavLink to="/Foro" className="btn btn-dark mr-2"> Foro </NavLink>
          <NavLink to="/Alumnos" className="btn btn-dark mr-2"> Alumnos </NavLink>
          {/* {isAuthenticated ? <LogoutButton />
            : <NavLink to="/Login" className="btn btn-dark mr-2  "> Iniciar Sesion </NavLink>
          } */}
          
          {isAuthenticated? <LogoutButton/>
          :<LoginButton />
          }
        </div>
      </div>
      <hr />
    </div>
  )
}

export default Navbar