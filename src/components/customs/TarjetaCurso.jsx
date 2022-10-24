import React from 'react'

import PropTypes from 'prop-types'

import '../css/cards.css'

const TarjetaCurso = ({titulo, imageSource, descripcion, url, nombreDocente, precio}) => {
  
  return (
    <div className='card card-c-hover text-center bg-dark m-3' >
      <img src={imageSource} alt="" height={150} className='card-img-top' />
      <div className='card-body text-light'>
        <h4 className='card-title'>{titulo}</h4>
        <p className='card-text text-secondary text-justify ' >
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
        <a href={url} className='btn btn-outline-secondary rounded-0'>Ir al curso</a>
      </div>
    </div>
  )
}

TarjetaCurso.propTypes = {
  titulo:PropTypes.string.isRequired,
  url: PropTypes.string,
  imageSource: PropTypes.string,
  descripcion: PropTypes.string
}

export default TarjetaCurso