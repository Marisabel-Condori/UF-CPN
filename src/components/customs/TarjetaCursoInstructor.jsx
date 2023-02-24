import React from 'react'

import PropTypes from 'prop-types'
import { Link } from "react-router-dom";

import '../css/cards.css'

const TarjetaCursoInstructor = ({ objCursoBD, url, nombreDocente, precio }) => {
  const imgProvisional = 'https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg'
  const imgStyles = { height: '150px' }

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
        <h6 className='text-justify'>{nombreDocente}</h6>
        <h6 className='text-justify'>{precio} Bs</h6>
        {/* boton vista previa curso .................*/}
        <Link to="/CursoCompletoInst" state={{ data: objCursoBD }} className="btn btn-outline-secondary rounded-0"> Ir al Curso </Link>

      </div>
    </div>
  )
}

TarjetaCursoInstructor.propTypes = {
  url: PropTypes.string,
  imageSource: PropTypes.string,
  descripcion: PropTypes.string
}

export default TarjetaCursoInstructor