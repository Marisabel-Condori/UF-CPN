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

const Rutas = () => {

    let idPersona=''
    if (localStorage.getItem('id')) {
        idPersona = localStorage.getItem('id')
        console.log('mostrando valor local desde NAVBAR')
        console.log(idPersona)
    }

    return (
        <>
            <h3>..{idPersona}</h3>
            <Routes>
                <Route exact path="/Login" element={<RegistroUsuario />} />
                <Route exact path="/Forgot" element={<RecuperarContraseña/>} />

                <Route exact path="/NuevoCurso/*" element={<NuevoCurso />} />
                <Route exact path="/Foro" element={<Foro />} />
                <Route exact path="/CursoCompletoInst" element={<CursoInstructorCompleto />} />
                <Route exact path="/CursoInstructor" element={<MisCursos />} />

                <Route exact path="/CursoEstudiante" element={<Alumnos />} />
                <Route exact path="/Categorias" element={<Categorias />} />
                <Route exact path="/" element={<TodosCursos />} />
                <Route exact path="/:categoria" element={<TodosCursos />} />
                
                <Route exact path="/Informatica" element={<Informatica />} />
                <Route exact path="/Matematica" element={<Matematica />} />
                <Route exact path="/Fisica" element={<Fisica/>} />
                <Route exact path="/Biologia" element={<Biologia />} />
                <Route exact path="/Quimica" element={<Quimica />} />
                <Route exact path="/Estadistica" element={<Estadistica />} /> 
                <Route path="*" element={<h1>not found</h1>} />
            </Routes>
        </>
    )
}

export default Rutas