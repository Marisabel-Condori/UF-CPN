import React from "react";

import { Link, NavLink } from "react-router-dom";

import LogoutButton from "../login/LogoutButton";


const Navbar = () => {

  const isAuthenticated = localStorage.getItem('email')
  console.log('mostrando valor local desde NAVBAR')
  console.log(isAuthenticated)
  console.log('NAVBAR cierra')

  return (
    <div className="mt-2">
      <div className="navbar navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">FCPN</Link>
        <div>
          <Link to="/" className="btn btn-dark mr-2"> Mis Cursos </Link>
          <NavLink to="/NuevoCurso" className="btn btn-dark mr-2"> Nuevo Curso </NavLink>
          <NavLink to="/Foro" className="btn btn-dark mr-2"> Foro </NavLink>
          <NavLink to="/Alumnos" className="btn btn-dark mr-2"> Alumnos </NavLink>
          {isAuthenticated ? <LogoutButton />
            : <NavLink to="/Login" className="btn btn-dark mr-2  "> Iniciar Sesion </NavLink>
          }
        </div>
      </div>
      <hr />
    </div>
  )
}

export default Navbar