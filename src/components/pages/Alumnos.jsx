import React from 'react'
import Tarjetas from '../customs/Tarjetas'
import VideoPlayer from '../video/VideoPlayer'

import '../../App.css'

const Alumnos = () => {
  return (
    <div className='App'>  
        <h1>alumnos</h1>
        <VideoPlayer/>
        <h2>prueba cards</h2>
        <Tarjetas/>
        <h2>***************</h2>
    </div>
  )
}

export default Alumnos