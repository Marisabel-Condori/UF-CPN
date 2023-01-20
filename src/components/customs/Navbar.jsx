import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label, Form, Alert } from 'reactstrap'
import { Link, NavLink } from "react-router-dom";

//import LogoutButton from "../login/LogoutButton";
//import LoginButton from "../login/LoginButton";
//import { useAuth0 } from '@auth0/auth0-react'

import LogoutButton from "../login/LogoutButton";
import Categorias from "./Categorias";

const Navbar = () => {

  //AUTH0
  //const { isAuthenticated, isLoading } = useAuth0()
  //if (isLoading) return <h1>Cargando...</h1>
  const [esEstudiante, setEsEstudiante] = useState(true)
  const [experiencia, setExperiencia] = useState('')
  const [especialidad, setEspecialidad] = useState('')
  const [error, setError] = useState(null)
  const [dataInstructor, setDataInstructor] = useState([])

  let isAuthenticated = ''
  if (localStorage.getItem('token')) {
    isAuthenticated = localStorage.getItem('token')
    console.log('mostrando valor local desde NAVBAR')
    console.log(isAuthenticated)
  }

  //********** MODAL **********/
  const [isOpen, setIsOpen] = useState(false)
  const abrirModal = () => {
    setIsOpen(!isOpen)
    { isOpen && <Modal isOpen={isOpen} /> }
  }
  const irDocente = () => {
    // enviar a mis CursoInstructorCompleto, CAMBIO DE PANTALLA..............................
    abrirModal()
    setEsEstudiante(false)
  }
  const irEstudiante = () => {
    setEsEstudiante(true)
  }
  
  const procesarDatos = e => {
    e.preventDefault()
    if (!experiencia.trim()) {
      console.log('Experiencia vacio')
      setError('experiencia vacio')
      return
    }
    if (!especialidad.trim()) {
      console.log('especialidad vacio')
      setError('Especialidad vacio')
      return
    }
    console.log('mostrando datos modal ----------------')
    console.log(experiencia);
    console.log(especialidad)
    //enviaDatosInstructorBD()
    irDocente()
    console.log('data instructor');
    //console.log(idPersona);
    console.log(dataInstructor);
    console.log(dataInstructor.length);
    console.log('+++++++++++++++++++++++');
    setExperiencia('')
    setEspecialidad('')
    setError('')
  }
  /********** INGRESA DATOS INSTRUCTOR A BD *******/
  // const enviaDatosInstructorBD = () => {
  //   let url = Apiurl + "instructor"
  //   axios.post(url, null, {
  //     params: { idpersona: idPersona, experiencia: experiencia, especialidad: especialidad }
  //   },)
  //     // .then((response) => {
  //     //   console.log('++++++++++++ response')
  //     //   console.log(response)
  //     //   console.log('id INST POST=> ' + response.data.insertId)
  //     // }).catch(err => console.log(err))
  // }

  return (
    <div className="mt-2">
      <div className="navbar navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">FCPN</Link>
        <div>
          {isAuthenticated ?
            <>
              {esEstudiante ?
                <>
                  <Categorias />
                  <NavLink to="/CursoEstudiante" className="btn btn-dark mr-2"> Mis Cursos </NavLink>
                  <Button className="btn btn-dark mr-2" onClick={abrirModal}>Docente</Button>
                  <LogoutButton />
                </>
                :
                <>
                  <Link to="/CursoInstructor" className="btn btn-dark mr-2"> Mis Cursos </Link>
                  <NavLink to="/NuevoCurso" className="btn btn-dark mr-2"> Nuevo Curso</NavLink>
                  <NavLink to="/Foro" className="btn btn-dark mr-2"> Foro </NavLink>
                  <Button className="btn btn-dark mr-2" onClick={irEstudiante}>Estudiante</Button>

                  {/* <Link to="/" className="btn btn-dark mr-2"> Estudiante </Link> */}
                </>
              }
            </>
            :
            <>
              <Categorias />
              <NavLink to="/Login" className="btn btn-dark mr-2"> Iniciar Sesion </NavLink>
              {/* AUTH0 */}
              {/* <LoginButton /> */}
            </>
          }
        </div>
      </div>
      <hr />
      <Modal isOpen={isOpen}>
        <ModalHeader>{dataInstructor.length > 0 ? 'Continua creando cursos'
          : 'Forma parte de nuestro equipo de docentes!'}
        </ModalHeader>
        {dataInstructor.length === 0 &&
          <ModalBody>
            <Form>
              {error &&
                <Alert color="danger">
                  {error}
                </Alert>
              }
              <p> Por favor cuentamos un poco mas de ti</p>
              <FormGroup>
                <Label for="experiencia">Experiencia</Label>
                <Input type="text" id="experiencia" onChange={e => setExperiencia(e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Label for="especialidad">Especialidad</Label>
                <Input type="text" id="especialidad" onChange={e => setEspecialidad(e.target.value)} />
              </FormGroup>
            </Form>
          </ModalBody>}
        <ModalFooter>
          {dataInstructor.length > 0
            ? <Button color="primary" onClick={irDocente} >Docente</Button>
            : <Button color="primary" onClick={procesarDatos} >Docente</Button>
          }
          <Button color="secondary" onClick={abrirModal}>Cerrar</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default Navbar