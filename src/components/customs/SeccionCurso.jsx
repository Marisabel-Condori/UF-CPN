import React from 'react'
import Recurso from './Recurso'
import VideoSeccion from './VideoSeccion'

const SeccionCurso = () => {

  return (
    <div className="card mb-3">
        <div className="card-body">
          <label>Seccion 1</label>
          <input 
            type="text" 
            // { ...register('tituloCurso',{ 
            //   required:{value:true, message:'El titulo es requerido'}})
            // } 
            name='tituloSeccion' className="form-control" placeholder="Ingresa titulo de la seccion"
          />

            <VideoSeccion/>
            <Recurso/>
            <input type="submit" value={"+ video"} className='m-2'/>
            <input type="submit" value={"+ recurso"} />
        </div>
    </div>
  )
}

export default SeccionCurso