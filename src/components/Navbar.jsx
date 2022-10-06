import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, NavLink }from "react-router-dom";


import MisCursos from "./navbar/MisCursos";
import Foro from "./navbar/Foro";
import NuevoCurso from "./navbar/NuevoCurso";
import Alumnos from "./navbar/Alumnos";

const Navbar = () => {
  return (
    <Router>
      <div className="container mt-5">
        <div>
        <span className="navbar-brand mb-0 h1">FCPN</span>
          <Link to="/" className="btn btn-dark mr-2"> Mis Cursos </Link>
          <Link to="/NuevoCurso" className="btn btn-dark mr-2"> Nuevo Curso </Link>
          <NavLink to="/Foro" className="btn btn-dark mr-2"> Foro </NavLink>
          <NavLink to="/Alumnos" className="btn btn-dark float-right mt-1"> Alumnos </NavLink>
        </div>
      <hr/>
        <Routes>
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