import React, { useCallback, useState } from 'react'
import Recurso from './Recurso'
import VideoSeccion from './VideoSeccion'
import { Apiurl } from '../../api/UsuariosApi'
import axios from 'axios'

const SeccionCurso = (props) => {
  const idCurso = props.idCurso //ENVIAR A LA BD con este dato

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

    registraSeccion(idCurso, nombreSeccion)
  }
  /************** REGISTRO SECCION - POST****************/
  const registraSeccion = useCallback(async (idCur, nombreSec) => {
    adicionaSeccion(idCur, nombreSec)
  }, [])
  /********** INGRESA DATOS CURSO A BD *******/
  const adicionaSeccion = (idCur, nombreSec) => {
    console.log('///ENVIADOOOOO CURSOOOOO///')
    let url = Apiurl + "seccion"
    axios.post(url, null, {
      params: { idcurso: idCur, nombre_seccion: nombreSec }
    },)
      .then((response) => {
        console.log('++++++++++++ response')
        console.log(response)
      }).catch(err => console.log(err))
  }
  return (
    <>
      <h6>props ultimo {props.idCurso}</h6>

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
            <center>
                <h3>Agregar Recurso o Video</h3>
              <div className='col-md-6'>
                <VideoSeccion />

              </div>
             
            </center>
            {/* <div className='row'>
              {/* <div className='col-md-6'><Recurso /></div> 
            </div> */}

            <center>
              <button type='submit' className='btn btn-success mb-4'> Guardar Datos Seccion</button>
            </center>

            {/* <input type="submit" value={"+ video"} className='m-2' />
            <input type="submit" value={"+ recurso"} /> */}
          </div>
        </div>
      </form>
    </>
  )
}

export default SeccionCurso