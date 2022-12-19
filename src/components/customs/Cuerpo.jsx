import React from 'react'

import { Routes, Route } from "react-router-dom";

import MisCursos from "../pages/MisCursos";
import Foro from "../pages/Foro";
import NuevoCurso from "../pages/NuevoCurso"
import Alumnos from "../pages/Alumnos";
import RegistroUsuario from "../login/RegistroUsuario";
import CursoInstructorCompleto from './CursoInstructorCompleto';
import TodosCursos from '../pages/TodosCursos';

const Cuerpo = () => {
    return (
        <>
            <Routes>
                <Route exact path="/RegistroUsuario" element={<RegistroUsuario />} />
                <Route exact path="/NuevoCurso/*" element={<NuevoCurso />} />
                <Route exact path="/Foro" element={<Foro />} />
                <Route exact path="/CursoEstudiante" element={<Alumnos />} />
                <Route exact path="/CursoCompletoInst" element={<CursoInstructorCompleto />} />
                <Route exact path="/CursoInstructor" element={<MisCursos />} />
                <Route exact path="/" element={<TodosCursos/>} />
                {/* <Route path="*" element={<h1>not found</h1>} /> */}
            </Routes>
        </>
    )
}

export default Cuerpo