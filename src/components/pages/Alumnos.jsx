import React from 'react'
import VideoPlayer from '../video/VideoPlayer'

import '../../App.css'
import TarjetasEstudiante from '../customs/TarjetasEstudiante'

const Alumnos = () => {
  return (
    <div className='App'>  
        <h1>alumnos</h1>
        <VideoPlayer/>
        <h2>prueba cards</h2>
        <TarjetasEstudiante/>
        <h2>***************</h2>
    </div>
  )
}

export default Alumnos