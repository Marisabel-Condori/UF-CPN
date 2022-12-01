import React from 'react'

import { Routes, Route } from "react-router-dom";

import MisCursos from "../pages/MisCursos";
import Foro from "../pages/Foro";
import NuevoCurso from "../pages/NuevoCurso"
import Alumnos from "../pages/Alumnos";
import RegistroUsuario from "../login/RegistroUsuario";
import CursoInstructorCompleto from './CursoInstructorCompleto';

import Prueba from './Prueba';

const Cuerpo = () => {
    return (
        <>
            <Routes>
                <Route exact path="/Login" element={<RegistroUsuario/>} />
                <Route exact path="/NuevoCurso/*" element={<NuevoCurso />} />
                <Route exact path="/Foro" element={<Foro/>} />
                <Route exact path="/Alumnos" element={<Alumnos />} />
                <Route exact path="/CursoCompletoInst" element={<CursoInstructorCompleto/>} />
                <Route exact path="/*" element={<MisCursos />} />
                {/* <Route path="*" element={<h1>not found</h1>} /> */}
            </Routes>
        </>
    )
}

export default Cuerpo