import React from 'react'
import { useState } from 'react'

const CajaComentario = () => {

  const [comentario, setComentario] = useState('')
  const [respuesta, setRespuesta] = useState('')
  const [listaComentarios, setListaComentarios] = useState([])
  const [error, setError] = useState(null)

  const procesarComentario = async (e) => {
    e.preventDefault()
    if (!comentario.trim()) {
      console.log('comentario vacio')
      setError('comentario vacio')
      return
    }
    console.log('pasando validaciones')
    // ENVIAR BD (id) usuario que hace comentario, comentario, (id) titulo curso, (id) seccion, (id)link video
    // youtube clone 14 => 9:10
    //****************** POST ********************* */
    setListaComentarios([...listaComentarios, comentario])
    setError(null)
    setComentario('')
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
      {/* <p>Responder</p> */}
      <hr />
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