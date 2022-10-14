import React from "react";
import {useAuth0} from '@auth0/auth0-react'

import { BrowserRouter as Router, Routes, Route, Link, NavLink }from "react-router-dom";


import MisCursos from "./navbar/MisCursos";
import Foro from "./navbar/Foro";
import NuevoCurso from "./navbar/NuevoCurso";
import Alumnos from "./navbar/Alumnos";
import LogoutButton from "./login/LogoutButton";
import Login from "./login/Login";


const Navbar = () => {

  const {isAuthenticated} = useAuth0()

//   if(isAuthenticated){

    
// //     if(!existe el usuario){ // get usuarios correo == 
// //   // enviar a backend post post

// // }
//   }


  return (
    <Router>
      <div className="mt-2">
        <div>
        <span className="navbar-brand mb-0 h1">FCPN</span>
          <Link to="/" className="btn btn-dark mr-2"> Mis Cursos </Link>
          <Link to="/NuevoCurso" className="btn btn-dark mr-2"> Nuevo Curso </Link>
          <NavLink to="/Foro" className="btn btn-dark mr-2"> Foro </NavLink>
          {isAuthenticated? <LogoutButton/>
          :    <Link to="/Login" className="btn btn-dark mr-2 float-right mt-1"> Login </Link>
          }
          <NavLink to="/Alumnos" className="btn btn-dark float-right mt-1 mr-2"> Alumnos </NavLink>
        </div>
      <hr/>
        <Routes>
          <Route path="/Login" element={<Login/>}/>
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