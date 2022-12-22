import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Input, Label, Form } from 'reactstrap'
import { Link, NavLink} from "react-router-dom";

//import LogoutButton from "../login/LogoutButton";
//import LoginButton from "../login/LoginButton";
//import { useAuth0 } from '@auth0/auth0-react'

import LogoutButton from "../login/LogoutButton";

import { Apiurl } from '../../api/UsuariosApi'
import axios from 'axios'
import MisCursos from "../pages/MisCursos";
import TodosCursos from "../pages/TodosCursos";

const Navbar = () => {

  //AUTH0
  //const { isAuthenticated, isLoading } = useAuth0()
  //if (isLoading) return <h1>Cargando...</h1>
  const [esEstudiante, setEsEstudiante] = useState(true)
  const [experiencia, setExperiencia] = useState('')
  const [especialidad, setEspecialidad] = useState('')
  const [idPersona, setIdPersona] = useState(null)
  const [dataInstructor, setDataInstructor] = useState([])

  const isAuthenticated = localStorage.getItem('email')
  console.log('mostrando valor local desde NAVBAR')
  console.log(isAuthenticated)
  console.log('NAVBAR cierra')

  const [isOpen, setIsOpen] = useState(false)
  const abrirModal = () => {
    setIsOpen(!isOpen)
    { isOpen && <Modal /> }
  }
  const irDocente=()=>{
    setEsEstudiante(!esEstudiante)
    enviar a mis CursoInstructorCompleto, CAMBIO DE PANTALLA..............................
    {
      <MisCursos />
    }
    abrirModal()
  }
  const irEstudiante =()=>{
    setEsEstudiante(!esEstudiante)
    {
      <TodosCursos/>
    }
  }
  //-------------------obtiene datos instructor-----------------
  useEffect(() => {
    datosPersona()
  }, [])
  const datosPersona = async () => {
    const dataPersona = await obtieneIDpersona()
    setIdPersona(dataPersona[0].idpersona)
    //const dataInstructor = await existeIdInstructor(dataPersona.idpersona)
    const dataInstructor = await existeIdInstructor(1)
    setDataInstructor(dataInstructor)
  }
  const existeIdInstructor = async (idPer) => {
    let url = Apiurl + "instructorbyID"
    let obtID = await axios.get(url, {
      params: { idpersona: idPer }
    })
    return await obtID.data
  }
  const obtieneIDpersona = async () => {
    let url = Apiurl + "personabyEmail"
    let obtID = await axios.get(url, {
      params: { correo: isAuthenticated }
    })
    return await obtID.data
  }
  //--------------obtiene datos instructor-----------
  useEffect(() => {
    datosInstructor()
  }, [])
  const datosInstructor = async () => {
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
    //enviaDatosInstructorBD()
    console.log('data instructor');
    console.log(idPersona);
    console.log(dataInstructor);
    console.log(dataInstructor.length);
    console.log('+++++++++++++++++++++++');
    setExperiencia('')
    setEspecialidad('')
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
                  <Button className="btn btn-dark mr-2" onClick={irEstudiante}>Estudiante</Button>

                  {/* <Link to="/" className="btn btn-dark mr-2"> Estudiante </Link> */}
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
        <ModalHeader>{dataInstructor.length > 0 ? 'Continua creando cursos'
          : 'Forma parte de nuestro equipo de docentes!'}
        </ModalHeader>
        {dataInstructor.length === 0 &&
          <ModalBody>
            <Form>
              <p> Por favor cuentamos un poco mas de ti</p>
            </Form>
            <FormGroup>
              <Label for="experiencia">Experiencia</Label>
              <Input type="text" id="experiencia" onChange={e => setExperiencia(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <Label for="especialidad">Especialidad</Label>
              <Input type="text" id="especialidad" onChange={e => setEspecialidad(e.target.value)} />
            </FormGroup>
          </ModalBody>}

        <ModalFooter>
        {dataInstructor.length>0   
          ?<Button color="primary" onClick={irDocente} >Docente</Button>
          :<Button color="primary" onClick={procesarDatos} >Docente</Button>
        }
          <Button color="secondary" onClick={abrirModal}>Cerrar</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default Navbar