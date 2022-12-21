import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label, Form } from 'reactstrap'
import { Link, NavLink } from "react-router-dom";

//import LogoutButton from "../login/LogoutButton";
//import LoginButton from "../login/LoginButton";
//import { useAuth0 } from '@auth0/auth0-react'

import LogoutButton from "../login/LogoutButton";

const Navbar = () => {

  //AUTH0
  //const { isAuthenticated, isLoading } = useAuth0()
  //if (isLoading) return <h1>Cargando...</h1>
  const [esEstudiante, setEsEstudiante] = useState(true)
  const [experiencia, setExperiencia] = useState('')
  const [especialidad, setEspecialidad] = useState('')

  const isAuthenticated = localStorage.getItem('email')
  console.log('mostrando valor local desde NAVBAR')
  console.log(isAuthenticated)
  console.log('NAVBAR cierra')

  const [isOpen, setIsOpen] = useState(false)
  const abrirModal = () => {
    setIsOpen(!isOpen)
    { isOpen && <Modal /> }
  }

  const procesarDatos = e => {
    e.preventDefault()
    if (!especialidad.trim()) {
      console.log('especialidad vacio')
      //setError('email vacio')
      return
    }
    if (!experiencia.trim()) {
      console.log('experiencia vacio')
      //setError('password vacio')
      return
    }
    console.log('mostrando datos modal ----------------')
    console.log(experiencia);
    console.log(especialidad)
  }
  return (
    <div className="mt-2">
      <div className="navbar navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">FCPN</Link>
        <div>
          {isAuthenticated ?
            <>
              {esEstudiante ?
                <>
                  <Link to="/" className="btn btn-dark mr-2"> Cursos </Link>
                  <NavLink to="/CursoEstudiante" className="btn btn-dark mr-2"> Mis Cursos </NavLink>
                  <Button className="btn btn-dark mr-2" onClick={abrirModal}>Docente</Button>

                  <LogoutButton />
                </>
                :
                <>
                  <Link to="/CursoInstructor" className="btn btn-dark mr-2"> Mis Cursos </Link>
                  <NavLink to="/NuevoCurso" className="btn btn-dark mr-2"> Nuevo Curso</NavLink>
                  <NavLink to="/Foro" className="btn btn-dark mr-2"> Foro </NavLink>
                </>

              }
            </>
            :
            <>
              <Link to="/" className="btn btn-dark mr-2"> Cursos </Link>
              <NavLink to="/Login" className="btn btn-dark mr-2  "> Iniciar Sesion </NavLink>
              {/* AUTH0 */}
              {/* <LoginButton /> */}
            </>
          }
        </div>
      </div>
      <hr />
      <Modal isOpen={isOpen}>
        <ModalHeader>Forma parte de nuestro equipo de docentes!</ModalHeader>
        <ModalBody>
          <Form>
            <p>Por favor cuentamos un poco mas de ti</p>
          </Form>
          <FormGroup>
            <Label for="experiencia">Experiencia</Label>
            <Input type="text" id="experiencia" onChange={e => setExperiencia(e.target.value)}/>
          </FormGroup>
          <FormGroup>
            <Label for="especialidad">Especialidad</Label>
            <Input type="text" id="especialidad" onChange={e => setEspecialidad(e.target.value)}/>
          </FormGroup>
          {/* <form onSubmit={procesarDatos}>
            <div className="form-group">
              <label>Experiencia</label>
              <textarea className="form-control" onChange={e => setExperiencia(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Especialidad</label>
              <textarea className="form-control" onChange={e => setEspecialidad(e.target.value)} />
            </div>
          </form> */}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={procesarDatos}>Docente</Button>
          {/* <button type="submit" className="btn btn-primary">Docente</button> */}
          <Button color="secondary" onClick={abrirModal}>Cerrar</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default Navbar