import React from "react";

import { BrowserRouter as Router, Routes, Route, Link, NavLink }from "react-router-dom";

import MisCursos from "../pages/MisCursos";
import Foro from "../pages/Foro";
import NuevoCurso from "../pages/NuevoCurso"
import Alumnos from "../pages/Alumnos";

import LogoutButton from "../login/LogoutButton";
import RegistroUsuario from "../login/RegistroUsuario";


const Navbar = () => {

  const isAuthenticated = localStorage.getItem('email')
  console.log('mostrando valor local desde NAVBAR')
  console.log(isAuthenticated)
  console.log('NAVBAR cierra')


  return (
    <Router>
      <div className="mt-2">
        <div className="navbar navbar-dark bg-dark">
          <Link className="navbar-brand" to="/">FCPN</Link>
          <div>
              <NavLink to="/" className="btn btn-dark mr-2"> Mis Cursos </NavLink>
              <NavLink to="/NuevoCurso" className="btn btn-dark mr-2"> Nuevo Curso </NavLink>
              <NavLink to="/Foro" className="btn btn-dark mr-2"> Foro </NavLink>
              {isAuthenticated? <LogoutButton/>
              :    <NavLink to="/Login" className="btn btn-dark mr-2  "> Login </NavLink>
              }
              <NavLink to="/Alumnos" className="btn btn-dark mr-2"> Alumnos </NavLink>
          </div>
          
          </div>
          <hr/>
          <Routes>
            {/* <Route path="/Login" element={<RegistroUsuario/>}/> */}
            <Route path="/Login" element={<RegistroUsuario/>}/>
            <Route path="/NuevoCurso" element={<NuevoCurso/>}/>
            <Route path="/Foro" element={<Foro/>}/> 
            <Route path="/Alumnos" element={<Alumnos/>}/> 
            <Route path="*" element={<MisCursos/>}/>  
          </Routes> 
        </div>
    </Router>
  )
}

export default Navbar