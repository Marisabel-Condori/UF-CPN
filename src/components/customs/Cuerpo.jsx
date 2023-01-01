import React, { useCallback, useState } from 'react'
import { Routes, Route } from "react-router-dom";

import MisCursos from "../pages/MisCursos";
import Foro from "../pages/Foro";
import NuevoCurso from "../pages/NuevoCurso"
import Alumnos from "../pages/Alumnos";
import CursoInstructorCompleto from './CursoInstructorCompleto';
import TodosCursos from '../pages/TodosCursos';
import RegistroUsuario from "../login/RegistroUsuario";

const Cuerpo = () => {

    const [idPersona, setIdPersona] = useState('')
    const modificaIDPersona = useCallback(valor => {
        setIdPersona(valor)
    }, [setIdPersona])


    if (idPersona) {
        console.log('mostrando id persona CUERPO ' + idPersona)
    } else { console.log('todavia NO tiene el id persona'); }


    return (
        <>
        <h3>..{idPersona}</h3>
            <Routes>
                <Route exact path="/Login" element={<RegistroUsuario functionIDpersona={modificaIDPersona} />} />

                <Route exact path="/NuevoCurso/*" element={<NuevoCurso />} />
                <Route exact path="/Foro" element={<Foro />} />
                <Route exact path="/CursoCompletoInst" element={<CursoInstructorCompleto />} />
                <Route exact path="/CursoInstructor" element={<MisCursos />} />

                <Route exact path="/CursoEstudiante" element={<Alumnos />} />
                <Route exact path="/*" element={<TodosCursos />} />
                {/* <Route path="*" element={<h1>not found</h1>} /> */}
            </Routes>
        </>
    )
}

export default Cuerpo