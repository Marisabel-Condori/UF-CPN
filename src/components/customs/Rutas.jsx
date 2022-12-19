import React from 'react'

import { Routes, Route } from "react-router-dom";

import MisCursos from "../pages/MisCursos";
import Foro from "../pages/Foro";
import NuevoCurso from "../pages/NuevoCurso"
import Alumnos from "../pages/Alumnos";
//import RegistroUsuario from "../login/RegistroUsuario";
import CursoInstructorCompleto from './CursoInstructorCompleto';
import LogoutButton from '../login/LogoutButton';
import LoginButton from '../login/LoginButton'

import { useAuth0 } from '@auth0/auth0-react'

const Rutas = () => {
    const { isAuthenticated } = useAuth0()
    
    return (
        <>
            <Routes>
                {/* <Route exact path="/Login" element={<RegistroUsuario/>} /> */}
                <Route exact path="/NuevoCurso/*" element={<NuevoCurso />} />
                <Route exact path="/Foro" element={<Foro />} />
                <Route exact path="/Alumnos" element={<Alumnos />} />
                <Route exact path="/CursoCompletoInst" element={<CursoInstructorCompleto />} />
                <Route exact path="/*" element={<MisCursos />} />

                {/* <Route path="/Login" element={<LoginButton />} />
                <Route path="/Logout" element={<LogoutButton />} /> */}

                {/* {isAuthenticated ? <Route path="/Logout" element={<LogoutButton />} />
                    : <Route path="/Login" element={<LoginButton />} />    
                } */}

                {/* {isAuthenticated ? <LogoutButton />
                    : <LoginButton />
                } */}
                
                {/* <Route path="*" element={<h1>not found</h1>} /> */}
            </Routes>
        </>
    )
}

export default Rutas