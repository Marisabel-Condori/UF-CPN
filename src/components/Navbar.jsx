import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, NavLink }from "react-router-dom";
import Inicio from "./navbar/Inicio";
import Nosotros from "./navbar/Nosotros";
import Contacto from "./navbar/Contacto";

const Navbar = () => {
  return (
    <Router>
      <div className="container mt-5">
        <div>
          <Link to="/" className="btn btn-dark mr-2"> Inicio </Link>
          <Link to="/Contacto" className="btn btn-dark mr-2"> Contacto </Link>
          <NavLink to="/Nosotros" className="btn btn-dark"> Nosotros </NavLink>
        </div>
      <hr/>
        <Routes>
          <Route path="/contacto" element={<Contacto/>}/>
          <Route path="/nosotros" element={<Nosotros/>}/> 
          <Route path="/" element={<Inicio/>}/>
          
        </Routes> 
      </div>
    </Router>
  )
}

export default Navbar