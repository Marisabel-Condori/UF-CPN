import React, { useState } from 'react'
import PropTypes from 'prop-types'

import '../css/cards.css'
import { Link } from 'react-router-dom'

import { Button, Modal, ModalHeader, ModalFooter, ModalBody, Alert } from 'reactstrap'
import axios from 'axios'
import { Apiurl } from '../../api/UsuariosApi'

const TarjetaCursoEstudiante = ({ objCursoBD, idPersona, estaInscrito }) => {
  const imgProvisional = 'https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg'
  const imgStyles = { height: '150px' }

  const [yaEstaInscrito, setYaEstaInscrito] = useState(false)
  const [error, setError] = useState(null)

  //------------------ MODAL -------------
  const [isOpen, setIsOpen] = useState(false)
  const abrirModalInscribirseAlCurso = () => {
    setIsOpen(!isOpen)
    { isOpen && <Modal isOpen={isOpen} /> }
  }

  //-------------- Inscripcion al curso BD --------------
  const inscribirse = async () => {
    // crea un nuevo objeto `Date`
    var today = new Date();
    // obtener la fecha y la hora
    var now = today.toLocaleString();
    const verificaEstaInscrito = await getInscritos()
    if (verificaEstaInscrito.length === 0) inscripcionCurso(idPersona, objCursoBD.idcurso, now)
    else {
      setError('ya estas inscrito en el curso')
            setTimeout(() => {
                setError(null)
            }, 5000);
      setYaEstaInscrito(true)
    }
    abrirModalInscribirseAlCurso()
  }

  /********** INGRESA DATOS INSCRIPCION A BD *******/
  const inscripcionCurso = async (idPersona, idCurso, fecha) => {
    // https://forms.gle/dpXu4SwhpoSnm4139
    // <a href="https://www.google.com/">la página de inicio de Mozilla</a>
    console.log('///ENVIADOOOOO INSCRIPCION///')
    let url = Apiurl + "inscribe"
    await axios.post(url, null, {
      params: { idcurso: idCurso, idestudiante: idPersona, fecha: fecha }
    },)
      .then((response) => {
        console.log('++++++++++++ response SE INSCRIBE')
        console.log(response)
        console.log('id sec bd => ' + response.data.id)
        //  setIdSeccion(response.data.insertId)
      }).catch(err => console.log(err))
  }

  /********** ESTA INSCRITO?? *******/
  const getInscritos = async () => {
    try {
      let url = Apiurl + "estaInscrito"
      let estaEnElCurso = await axios.get(url, {
        params: { idcurso: objCursoBD.idcurso, idestudiante: idPersona }
      })
      console.log('bddddddd ');
      console.log(estaEnElCurso.data);
      return estaEnElCurso.data;
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='card card-con-hover text-center bg-dark ml-3 mt-5' >
      {error && <Alert color="danger">  {error}  </Alert>}
      <img src={objCursoBD.portada_curso ? objCursoBD.portada_curso : imgProvisional}
        alt="Responsive image" className='card-img-top ' style={imgStyles} />
      <div className='card-body text-light'>
        <h4 className='card-title'>{objCursoBD.titulo_curso}</h4>
        <p className='card-text text-secondary text-justify' >
          {
            objCursoBD.descripcion_curso ?
              (
                objCursoBD.descripcion_curso.length > 50 ? `${objCursoBD.descripcion_curso.substring(0, 50)}...` : objCursoBD.descripcion_curso
              ) :
              'MARIIIII NO HAY DESCRIPCION aliquip aliqua laboris. Sint elit occaecat anim pariatur.'
          }
        </p>
        <h6 className='text-justify'>Por: {objCursoBD.nombre ? objCursoBD.nombre : 'SN'}</h6>
        <h6 className='text-justify'>Precio: {objCursoBD.precio ? objCursoBD.precio : '000'} Bs</h6>
        <Link to="/CursoCompletoInst" state={{ data: objCursoBD }} className="btn btn-outline-secondary rounded-0"> Ir al Curso </Link>
        {
          !estaInscrito &&
          <button disabled={idPersona ? false : true} className={'btn btn-success rounded-0 m-2'} type='button' onClick={() => abrirModalInscribirseAlCurso()} >Inscribirse</button>
          // <button disabled={idPersona ? false : true} className={`btn ${esFavorito ? 'btn-success' : 'btn-outline-primary'} rounded-0 m-2`} type='button' onClick={() => abrirModalInscribirseAlCurso()} >Inscribirse</button>
        }
      </div>

      <Modal isOpen={isOpen}>
        <ModalHeader>{'¿Seguro que deseas Inscribirte al curso?'}  </ModalHeader>
        {yaEstaInscrito
          ? <ModalBody> {'Ya estas inscrito en el curso'} </ModalBody>
          :<ModalBody>En este curso aprenderás paso a paso sobre ..... </ModalBody>
        }
        <ModalFooter>
          <Button color="primary" onClick={() => inscribirse()} disabled={yaEstaInscrito && true}>Inscribirse</Button>
          <Button color="secondary" onClick={abrirModalInscribirseAlCurso}>Cerrar</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

TarjetaCursoEstudiante.propTypes = {
  imageSource: PropTypes.string,
  descripcion: PropTypes.string
}

export default TarjetaCursoEstudiante