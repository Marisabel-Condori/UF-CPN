import React from 'react'

import '../../App.css'
import TarjetasEstudiante from '../customs/TarjetasEstudiante'

const Alumnos = () => {
  return (
    <div >  
        <h2>tarjetas estudiante</h2>
        <p>si no tiene cursos inscritos VACIO</p>
        <TarjetasEstudiante/>
    </div>
  )
}

export default Alumnos