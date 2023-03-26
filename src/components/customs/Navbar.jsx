import React, { useState } from "react";
import { Apiurl } from '../../api/UsuariosApi'
import axios from 'axios'
import { Link, NavLink } from "react-router-dom";

import LogoutButton from "../login/LogoutButton";
import Categorias from "./Categorias";
import DropdownDocente from "./DropdownDocente";

const Navbar = () => {

  //AUTH0
  //const { isAuthenticated, isLoading } = useAuth0()
  //if (isLoading) return <h1>Cargando...</h1>
  const [esEstudiante, setEsEstudiante] = useState(false)
  const [esDocente, setEsDocente] = useState(false)

  const esEstudianteDocente = async (idper) => {
    try {
      let url = Apiurl + "esEstudianteDocente"
      let respuesta = await axios.get(url, {
        params: { idpersona: idper }
      })
      if (respuesta.data.estudiante === 1) setEsEstudiante(true)
      if (respuesta.data.docente === 1) setEsDocente(true)
      return respuesta;
    } catch (error) {
      console.log(error)
    }
  }

  let isAuthenticated = ''
  if (localStorage.getItem('token')) {
    isAuthenticated = localStorage.getItem('token')
    console.log('mostrando valor local desde NAVBAR')
    console.log(isAuthenticated)
    const idPer = localStorage.getItem('id')
    esEstudianteDocente(idPer)
  }

  return (
    <div className="mt-2">
      <div className="navbar navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">FCPN</Link>
        <div>
          {isAuthenticated
            ?
            <>
              {esEstudiante && esDocente ?
                <>
                  <Categorias />
                  <NavLink to="/CursoEstudiante" className="btn btn-dark mt-2"> Mis Cursos </NavLink>
                  <DropdownDocente />
                  <LogoutButton />
                </>
                :
                <>
                  {
                    esEstudiante
                      ?
                      <>
                        <Categorias />
                        <NavLink to="/CursoEstudiante" className="btn btn-dark mt-2"> Mis Cursos </NavLink>
                        <LogoutButton />
                      </>
                      :
                      <>
                        <Link to="/CursoInstructor" className="btn btn-dark mr-2 mt-2"> Creados </Link>
                        <NavLink to="/NuevoCurso" className="btn btn-dark mr-2 mt-2"> Nuevo Curso</NavLink>
                        <NavLink to="/ForoLista" className="btn btn-dark mr-2 mt-2"> Foro </NavLink>
                        <LogoutButton />
                      </>
                  }
                </>
              }
            </>
            :
            <>
              <Categorias />
              <NavLink to="/Login" className="btn btn-dark mr-2 mt-2"> Iniciar Sesion </NavLink>
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default Navbar