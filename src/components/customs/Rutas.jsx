import React from 'react'
import { Routes, Route } from "react-router-dom";

import MisCursos from "../pages/MisCursos";
import Foro from "../pages/Foro";
import NuevoCurso from "../pages/NuevoCurso"
import Alumnos from "../pages/Alumnos";
import CursoInstructorCompleto from './CursoInstructorCompleto';
import TodosCursos from '../pages/TodosCursos';
import RegistroUsuario from "../login/RegistroUsuario";
import RecuperarContraseña from '../login/RecuperarContraseña';
import Categorias from './Categorias';
import Informatica from './Informatica';
import Matematica from './Matematica';
import Fisica from './Fisica';
import Biologia from './Biologia';
import Quimica from './Quimica';
import Estadistica from './Estadistica';
import TarjetasEstudianteTodos from './TarjetasEstudianteTodos';

const Rutas = () => {

    let idPersona=''
    let nombre=''
    if (localStorage.getItem('id')) {
        idPersona = localStorage.getItem('id')
        nombre=localStorage.getItem('nombre')
        console.log('mostrando valor local desde NAVBAR')
        console.log(idPersona)
        console.log(nombre)
    }

    return (
        <>
            <h3>..{idPersona}</h3>
            <h3>..{nombre}</h3>
            <Routes>
                <Route exact path="/Login" element={<RegistroUsuario />} />
                <Route exact path="/Forgot" element={<RecuperarContraseña/>} />

                <Route exact path="/NuevoCurso/*" element={<NuevoCurso idPer = {idPersona}/>} />
                <Route exact path="/Foro" element={<Foro />} /> 
                <Route exact path="/CursoCompletoInst" element={<CursoInstructorCompleto />} />
                <Route exact path="/CursoInstructor" element={<MisCursos idPer = {idPersona}/>} />

                <Route exact path="/CursoEstudiante" element={<Alumnos idPer = {idPersona} />} />
                <Route exact path="/Categorias" element={<Categorias />} />
                <Route exact path="/" element={<TarjetasEstudianteTodos idPer = {idPersona} />} /> 
                {/* <Route exact path="/:categoria" element={<TodosCursos />} /> */}
                
                <Route exact path="/Informatica" element={<Informatica idPer = {idPersona}/>} />
                <Route exact path="/Matematica" element={<Matematica idPer = {idPersona}/>} />
                <Route exact path="/Fisica" element={<Fisica idPer = {idPersona}/>} />
                <Route exact path="/Biologia" element={<Biologia idPer = {idPersona}/>} />
                <Route exact path="/Quimica" element={<Quimica idPer = {idPersona}/>} />
                <Route exact path="/Estadistica" element={<Estadistica idPer = {idPersona}/>} /> 
                <Route path="*" element={<h1>not found</h1>} />
            </Routes>
        </>
    )
}

export default Rutas