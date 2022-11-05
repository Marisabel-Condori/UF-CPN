import React, { useState } from 'react'
import Recurso from './Recurso'
import VideoSeccion from './VideoSeccion'

const SeccionCurso = () => {

  const [nombreSeccion, setNombreSeccion] = useState('')
  const [error, setError] = useState(null)

  const procesarDatos = async (e) => {
    e.preventDefault()
    if (!nombreSeccion.trim()) {
      console.log('nombre seccion vacio')
      setError('Nombre seccion vacio')
      return
    }
    setError(null)
    console.log('pasando validaciones')
    setNombreSeccion('')
    setError('')
  }

  return (
    <>
      <form onSubmit={procesarDatos}>
        <div className="card" >
          <div className="card-body">
            <div className='form-group'>
              <div className='row'>
                <div className='col-md-2'> <label>Nombre Seccion</label> </div>
                <div className='col-md-10'>
                  {/* ---------------- titulo seccion */}
                  <input
                    type="text" className="form-control" placeholder="Ingresa titulo de la seccion"
                    onChange={e => setNombreSeccion(e.target.value)} value={nombreSeccion}
                  /> 
                  {error && <div className='alert alert-danger mt-1 p-1'>{error}</div>}
                </div>
              </div>
            </div>

            <VideoSeccion />
            <Recurso />

            <center>
              <button type='submit' className='btn btn-success mb-4'> Guardar Datos Seccion</button>
            </center>

            <input type="submit" value={"+ video"} className='m-2' />
            <input type="submit" value={"+ recurso"} />
          </div>
        </div>
      </form>
    </>
  )
}

export default SeccionCurso