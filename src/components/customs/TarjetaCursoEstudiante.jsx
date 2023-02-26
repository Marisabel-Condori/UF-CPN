import React, { useState } from 'react'
import PropTypes from 'prop-types'

import '../css/cards.css'
import { Link } from 'react-router-dom'

import { Button, Modal, ModalHeader, ModalFooter} from 'reactstrap'
import axios from 'axios'
import { Apiurl } from '../../api/UsuariosApi'

const TarjetaCursoEstudiante = ({ objCursoBD, url, nombreDocente, precio, idPersona, estaInscrito}) => {
  const imgProvisional = 'https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg'
  const imgStyles = { height: '150px' }

  const esFavorito = true
  console.log('esta inscrito');
  console.log('SI '+estaInscrito+ ' NO '+!estaInscrito);

  //------------------ MODAL -------------
  const [isOpen, setIsOpen] = useState(false)
  const abrirModalInscribirseAlCurso = () => {
    setIsOpen(!isOpen)
    { isOpen && <Modal isOpen={isOpen} /> }
  }
  
  //-------------- Inscripcion al curso BD --------------
  const inscribirse = ()=>{
    console.log('indcribirseseee BDDDDD');
    console.log(idPersona);
    console.log(objCursoBD.idcurso);
    // crea un nuevo objeto `Date`
    var today = new Date();
    // obtener la fecha y la hora
    var now = today.toLocaleString();
    inscripcionCurso(idPersona, objCursoBD.idcurso, now)
    abrirModalInscribirseAlCurso()
  }
  /********** INGRESA DATOS INSCRIPCION A BD *******/
  const inscripcionCurso = async (idPersona, idCurso, fecha) => {
    console.log('///ENVIADOOOOO INSCRIPCION///')
    let url = Apiurl + "inscribe"
    await axios.post(url, null, {
      params: { idcurso: idCurso, idestudiante: idPersona, fecha:fecha }
    },)
      .then((response) => {
        console.log('++++++++++++ response SE INSCRIBE')
        console.log(response)
        console.log('id sec bd => ' + response.data.id)
      //  setIdSeccion(response.data.insertId)
      }).catch(err => console.log(err))
  }

  return (
    <div className='card card-con-hover text-center bg-dark ml-3 mt-5' >
      <img src={objCursoBD.portada_curso ? objCursoBD.portada_curso : imgProvisional}
        alt="Responsive image" className='card-img-top ' style={imgStyles} />
      <div className='card-body text-light'>
        <h4 className='card-title'>{objCursoBD.titulo_curso}... {idPersona}</h4>
        <p className='card-text text-secondary text-justify' >
          {
            objCursoBD.descripcion_curso ?
              (
                objCursoBD.descripcion_curso.length > 50 ? `${objCursoBD.descripcion_curso.substring(0, 50)}...` : objCursoBD.descripcion_curso
              ) :
              'MARIIIII NO HAY DESCRIPCION aliquip aliqua laboris. Sint elit occaecat anim pariatur.'
          }
        </p>
        <h6 className='text-justify'>{nombreDocente}</h6>
        <h6 className='text-justify'>{precio} Bs</h6>
        <Link to="/CursoCompletoInst" state={{ data: objCursoBD }} className="btn btn-outline-secondary rounded-0"> Ir al Curso </Link>
      {
        !estaInscrito&&
        <button disabled={idPersona?false:true} className={`btn ${esFavorito ? 'btn-success' : 'btn-outline-primary'} rounded-0 m-2`} type='button' onClick={() => abrirModalInscribirseAlCurso()} >Inscribirse</button>
      }
      </div>

      <Modal isOpen={isOpen}>
        <ModalHeader>{'Seguro que deseas Inscribirte al curso???'}
        </ModalHeader>
        <ModalFooter>
          <Button color="primary" onClick={()=> inscribirse()} >SI</Button>
          <Button color="secondary" onClick={abrirModalInscribirseAlCurso}>Cerrar</Button>
        </ModalFooter>
      </Modal>
    </div>
  )
}

TarjetaCursoEstudiante.propTypes = {
  url: PropTypes.string,
  imageSource: PropTypes.string,
  descripcion: PropTypes.string
}

export default TarjetaCursoEstudiante