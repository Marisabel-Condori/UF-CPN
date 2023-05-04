import React from 'react'
import { Routes, Route } from "react-router-dom";

import MisCursosDocente from "../pages/MisCursosDocente";
import Foro from "../pages/Foro";
import ForoLista from '../pages/ForoLista';
import NuevoCurso from "../pages/NuevoCurso"
import MisCursosEstudiante from "../pages/MisCursosEstudiante";
import CursoInstructorCompleto from './CursoInstructorCompleto';
import CursoEstudianteCompleto from './CursoEstudianteCompleto';
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
import EditarCursoInstructor from './EditarCursoInstructor';

const Rutas = () => {

    let idPersona=''
    let nombre=''
    if (localStorage.getItem('id')) {
        idPersona = localStorage.getItem('id')
        nombre=localStorage.getItem('nombre')
    }

    return (
        <>
            {/* <h3>..{idPersona}</h3>  */}
            <h3>Bienvenido {nombre}</h3>
            <Routes>
                <Route exact path="/Login" element={<RegistroUsuario />} />
                <Route exact path="/Forgot" element={<RecuperarContraseña/>} />

                <Route exact path="/NuevoCurso/*" element={<NuevoCurso/>} />
                <Route exact path="/Foro" element={<Foro />} /> 
                <Route exact path="/ForoLista" element={<ForoLista />} /> 
                <Route exact path="/CursoCompletoInst" element={<CursoInstructorCompleto />} />
                <Route exact path="/EditarCursoInst" element={<EditarCursoInstructor />} />
                <Route exact path="/CursoInstructor" element={<MisCursosDocente/>} />

                <Route exact path="/CursoCompletoEst" element={<CursoEstudianteCompleto />} />
                <Route exact path="/CursoEstudiante" element={<MisCursosEstudiante  />} />
                <Route exact path="/Categorias" element={<Categorias />} />
                <Route exact path="/" element={<TarjetasEstudianteTodos  />} /> 
                {/* <Route exact path="/:categoria" element={<TodosCursos />} /> */}
                
                <Route exact path="/Informatica" element={<Informatica />} />
                <Route exact path="/Matematica" element={<Matematica />} />
                <Route exact path="/Fisica" element={<Fisica />} />
                <Route exact path="/Biologia" element={<Biologia />} />
                <Route exact path="/Quimica" element={<Quimica />} />
                <Route exact path="/Estadistica" element={<Estadistica />} /> 
                <Route path="*" element={<h1>not found</h1>} />
            </Routes>
        </>
    )
}

export default Rutas