import React from 'react'

import PropTypes from 'prop-types'

import '../css/cards.css'

const TarjetaCursoEstudiante = ({objCursoBD, url, nombreDocente, precio}) => {
  const imgProvisional = 'https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg'
  const imgStyles = {  height:'150px', with:'100px'}

  const esFavorito = true

  return (
    <div className='card card-con-hover text-center bg-dark ml-3 mt-5' >
      <img src={objCursoBD.portada_curso? objCursoBD.portada_curso: imgProvisional} 
            alt="Responsive image" className='card-img-top ' style = {imgStyles} />
      <div className='card-body text-light'>
        <h4 className='card-title'>{objCursoBD.titulo_curso}</h4>
        <p className='card-text text-secondary text-justify' >
          {
            objCursoBD.descripcion_curso? 
              (
                objCursoBD.descripcion_curso.length>50?`${objCursoBD.descripcion_curso.substring(0,50)}...`: objCursoBD.descripcion_curso
              ): 
              'MARIIIII NO HAY DESCRIPCION aliquip aliqua laboris. Sint elit occaecat anim pariatur.'
          }
        </p>
        <h6 className='text-justify'>{nombreDocente}</h6>
        <h6 className='text-justify'>{precio} Bs</h6>
        <a href={url} className='btn btn-outline-secondary rounded-0'>Ir al curso</a>
          <button className={`btn ${esFavorito?'btn-success':'btn-outline-primary'} rounded-0 m-2`}>Favorito</button>
      </div>
    </div>
  )
}

TarjetaCursoEstudiante.propTypes = {
  url: PropTypes.string,
  imageSource: PropTypes.string,
  descripcion: PropTypes.string
}

export default TarjetaCursoEstudiante