import React from 'react'

import PropTypes from 'prop-types'
import { Link }from "react-router-dom";


import '../css/cards.css'

const TarjetaCursoInstructor = ({objCursoBD, idCurso, titulo, imageSource, descripcion, url, nombreDocente, precio}) => {
  const imgProvisional = 'https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg'
  
  return (
    <div className='card card-con-hover text-center bg-dark m-3' >
      <img src={imageSource? imageSource: imgProvisional} 
            alt="" height={150} className='card-img-top' />
      <div className='card-body text-light'>
        <h4 className='card-title'>{titulo}</h4>
        <p className='card-text text-secondary text-justify' >
          {
            descripcion? 
              (
              descripcion.length>80?`${descripcion.substring(0,80)}...`: descripcion
              ): 
              'MARIIIII Quis velit non sunt non aliquip aliqua laboris. Sint elit occaecat anim pariatur.'
          }
        </p>
        <h6 className='text-justify'>{nombreDocente}</h6>
        <h6 className='text-justify'>{precio} Bs</h6>
        {/* boton vista previa curso .................*/}
        <Link to= "/CursoCompletoInst" state={{data:objCursoBD}} className="btn btn-outline-secondary rounded-0"> Ir al Curso </Link>
        
      </div>
    </div>
  )
}

TarjetaCursoInstructor.propTypes = {
  titulo:PropTypes.string.isRequired,
  url: PropTypes.string,
  imageSource: PropTypes.string,
  descripcion: PropTypes.string
}

export default TarjetaCursoInstructor