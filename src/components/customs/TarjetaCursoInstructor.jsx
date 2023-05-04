import React, { useState } from 'react'
import { Link } from "react-router-dom";
import '../css/cards.css'

import { Button, Modal, ModalFooter, ModalHeader } from 'reactstrap'

import {faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Apiurl } from '../../api/UsuariosApi'
import axios from 'axios'

const TarjetaCursoInstructor = ({ objCursoBD }) => {
  const imgProvisional = 'https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg'
  const imgStyles = { height: '150px' }

  //////////////////////// ELIMINA CURSO ///////////////////////////
  const [idCurso, setIdCurso] = useState('')

  const eliminarCurso = (idcurso) => {
    console.log('idcurso ELIMINA ==== ' + idcurso);
    setIdCurso(idcurso)
    abrirModalELimina()
  }
  const eliminaCursoBD = async () => {
    console.log('eliminando cursooooooooo');
    let url = Apiurl + "curso"
    let res = await axios.delete(url, {
      params: { idcurso: idCurso }
    })
    console.log('++++++++++++ response curso ELIMINADO -----------')
    console.log(res);
    if (res.data.status === 'exitoso') {
      console.log('ya se ELIMINOOOOO');
      setIdCurso('')
      abrirModalELimina()
      // getSeccionesByIdCurso(dataCurso.idcurso)------------------------------------
      window.location.reload() 
    } else {
      console.log('ERROOOOOOOOOOOOOOOOOOOOOOOOOR');
    }
  }
  // ------------------ MODAL -------------
  const [isOpen, setIsOpen] = useState(false)
  const abrirModalELimina = () => {
    setIsOpen(!isOpen)
    { isOpen && <Modal isOpen={isOpen} /> }
  }
  //------------------------------------------------

  return (
    <div className='card card-con-hover text-center bg-dark ml-3 mt-5' >
      <img src={objCursoBD.portada_curso ? objCursoBD.portada_curso : imgProvisional} className='card-img-top' style={imgStyles} />
      <div className='card-body text-light'>
        <h4 className='card-title'>{objCursoBD.titulo_curso}</h4>
        <p className='card-text text-secondary text-justify' >
          {
            objCursoBD.descripcion_curso ?
              (
                objCursoBD.descripcion_curso.length > 80 ? `${objCursoBD.descripcion_curso.substring(0, 80)}...` : objCursoBD.descripcion_curso
              ) :
              'MARIIIII NO HAY DESCRIPCION DGD FDF D F DF DD GD DF GD F laboris. Sint elit occaecat anim pariatur.'
          }
        </p>
        <h6 className='text-justify'>{objCursoBD.nombre}</h6>
        <h6 className='text-justify'>{objCursoBD.precio} Bs</h6>
        {/* boton vista previa curso .................*/}
        <Link to="/CursoCompletoInst" state={{ data: objCursoBD }} className="btn btn-outline-secondary rounded-0"> Ir al Curso </Link>
        <Link to="/EditarCursoInst" state={{ data: objCursoBD }} className="btn btn-outline-warning rounded-0 mx-2"> Editar </Link>
        <button className="btn btn-outline-danger" onClick={() => eliminarCurso(objCursoBD.idcurso)}>  <FontAwesomeIcon icon={faTrash} /> </button>
      </div>


      <Modal isOpen={isOpen}>
        <ModalHeader className='center'>  Eliminar el curso y todo su contenido </ModalHeader>
        <ModalFooter>
          < Button color="secondary" onClick={eliminaCursoBD}>Eliminar</Button>
          < Button color="secondary" onClick={abrirModalELimina}>Cerrar</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

export default TarjetaCursoInstructor