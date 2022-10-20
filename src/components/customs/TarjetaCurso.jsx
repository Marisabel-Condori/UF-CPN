import React from 'react'

import PropTypes from 'prop-types'

import '../css/cards.css'

const TarjetaCurso = ({titulo, imageSource, descripcion, url}) => {
  
  return (
    <div className='card text-center bg-dark'>
      <img src={imageSource} alt="" height={150} className='card-img-top' />
      <div className='card-body text-light'>
        <h4 className='card-title'>{titulo}</h4>
        <p className='card-text text-secondary text-justify'>
          {
            descripcion? descripcion: 'Quis velit mollit eu exercitation minim tempor incididunt ad in adipisicing commodo. Elit nostrud ut non esse quis commodo cupidatat. Nostrud reprehenderit aliquip ipsum do   fugiat est aliqua cillum eiusmod. Proident ad tempor aliquip sunt non est duis aute ullamco   sunt non aliquip aliqua laboris. Sint elit occaecat anim pariatur.'
          }
        </p>
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