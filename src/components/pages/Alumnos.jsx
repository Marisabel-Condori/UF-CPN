import React from 'react'
import VideoPlayer from '../video/VideoPlayer'

import '../../App.css'
import TarjetasEstudiante from '../customs/TarjetasEstudiante'

const Alumnos = () => {
  return (
    <div >  
        <h1>alumnos</h1>
        <h2>tarjetas estudiante</h2>
        <p>si no tiene cursos inscritos VACIO</p>
        <TarjetasEstudiante/>
    </div>
  )
}

export default Alumnos