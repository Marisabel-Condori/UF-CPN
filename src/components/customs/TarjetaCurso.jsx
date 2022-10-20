import React from 'react'

const TarjetaCurso = ({titulo, imageSource, url}) => {
  console.log('********1***********')
  console.log(titulo)
  console.log('********2***********')
  
  return (
    <div className='card text-center bg-dark'>
      <img src={imageSource} alt="" height={150}/>
      <div className='card-body text-light'>
        <h4 className='card-title'>{titulo}</h4>
        <p className='card-text text-secondary'>Quis velit mollit eu exercitation minim tempor incididunt ad in adipisicing commodo. Elit nostrud ut non esse quis commodo cupidatat. Nostrud reprehenderit aliquip ipsum do fugiat est aliqua cillum eiusmod. Proident ad tempor aliquip sunt non est duis aute ullamco sunt non aliquip aliqua laboris. Sint elit occaecat anim pariatur.</p>
        <a href={url} className='btn btn-outline-secondary rounded-0'>Ir al curso</a>
      </div>
    </div>
  )
}

export default TarjetaCurso