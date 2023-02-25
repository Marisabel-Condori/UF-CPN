import axios from 'axios'
import React, { useCallback } from 'react'
import { useState } from 'react'
import { Apiurl } from '../../api/UsuariosApi'

const CajaComentario = ({ idvideo, idper }) => {

  const [comentario, setComentario] = useState('')
  const [respuesta, setRespuesta] = useState('')
  const [listaComentarios, setListaComentarios] = useState([])
  const [error, setError] = useState(null)

  const procesarComentario = (e) => {
    e.preventDefault()
    if (!comentario.trim()) {
      console.log('comentario vacio')
      setError('comentario vacio')
      return
    }
    console.log('pasando validaciones')
    // crea un nuevo objeto `Date`
    var today = new Date();
    // obtener la fecha y la hora
    var now = today.toLocaleString();
    registraComentario(idvideo, idper, comentario, now)
    setListaComentarios([...listaComentarios, comentario])
    setError(null)
    setComentario(null)
  }
  /************** REGISTRO COMENTARIO - POST****************/
  const registraComentario = useCallback(async (idVIDEO, idPER, COMEN, NOW) => {
    adicionaComentario(idVIDEO, idPER, COMEN, NOW )
  }, [])
  /********** INGRESA DATOS COMENTARIO A BD *******/
  const adicionaComentario = (idv, idp, comen, now) => {
    console.log('{ idvideo: ' + idv + ' idpersona: ' + idp + ' comentario ' + comen + ' fecha: ' + now + ' }');
    console.log('///ENVIADOOOOO COMENTARIO///')
    let url = Apiurl + "comentario"
    axios.post(url, null, {
      params: { idvideo: idv, idpersona: idp, comentario: comen, fecha: now }
    },)
      .then((response) => {
        console.log('++++++++++++ response')
        console.log(response)
        console.log('idComentario => ' + response.data.id)
      //  setIdChild(response.data.insertId)
      }).catch(err => console.log(err))
  }

  const procesarRespuesta = async (e) => {
    e.preventDefault()
    if (!respuesta.trim()) {
      console.log('comentario vacio')
      setError('comentario vacio')
      return
    }
  }
  return (
    <div className='my-5'>
      <hr />
      <p>Seccion comentarios</p>
      <p>idvideo: {idvideo} idpersona: {idper}</p>
      {
        error && (
          <div className="alert alet-danger">{error}</div>
        )
      }
      <form className="form-group" style={{ display: 'flex' }} onSubmit={procesarComentario} >
        <textarea className="form-control" onChange={e => setComentario(e.target.value)} placeholder='Ingresa tu comentario' style={{ width: '100%' }}></textarea>
        <button type="submit" className="btn btn-outline-secondary" style={{ width: '15%', height: '33px' }}>Enviar</button>
      </form>

      <ul className="list-group">
        {
          listaComentarios.map((item, index) => (
            <li key={index} className="list-group-item">
              <h6>Mari C</h6>
              <p>{item}</p>
              <form className="form-group" style={{ display: 'flex' }} onSubmit={procesarRespuesta} >
                <textarea className="form-control" onChange={e => setRespuesta(e.target.value)} placeholder='Ingresa tu comentario' style={{ width: '100%' }}></textarea>
                <button type="submit" className="btn btn-outline-secondary" style={{ width: '15%', height: '33px' }}>responder</button>
              </form>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default CajaComentario