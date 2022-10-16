import React from "react";
import {useAuth0} from '@auth0/auth0-react'

import { BrowserRouter as Router, Routes, Route, Link, NavLink }from "react-router-dom";


import MisCursos from "./navbar/MisCursos";
import Foro from "./navbar/Foro";
import NuevoCurso from "./navbar/NuevoCurso";
import Alumnos from "./navbar/Alumnos";
import LogoutButton from "./login/LogoutButton";
import RegistroUsuario from "./login/RegistroUsuario";


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
        <div className="navbar navbar-dark bg-dark">
          <Link className="navbar-brand" to="/">FCPN</Link>
          <div>
              <NavLink to="/" exact className="btn btn-dark mr-2"> Mis Cursos </NavLink>
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