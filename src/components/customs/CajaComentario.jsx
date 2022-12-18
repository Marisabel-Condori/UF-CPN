import React from 'react'
import { useState } from 'react'

const CajaComentario = () => {

  const [comentario, setComentario] = useState('')
  const [error, setError] = useState(null)

  const procesarComentario = async (e) => {
    e.preventDefault()
    if (!comentario.trim()) {
      console.log('comentario vacio')
      setError('comentario vacio')
      return
    }
    setError(null)
    console.log('pasando validaciones')
    // ENVIAR BD (id) usuario que hace comentario, comentario, (id) titulo curso, (id) seccion, (id)link video
    // youtube clone 14 => 9:10
    //****************** POST ********************* */
    setComentario('')
  }
  return (
    <div className='my-5'>
      <p>Responder</p>
      <hr />
      <form className="form-group" style={{ display: 'flex' }} onSubmit={procesarComentario} >
        {
          error && (
            <div className="alert alet-danger">{error}</div>
          )
        }
        <textarea className="form-control" onChange={e => setComentario(e.target.value)} placeholder='Ingresa tu comentario' style={{ width: '100%' }}></textarea>
        <button type="button" className="btn btn-outline-secondary" style={{ width: '15%', height: '33px' }}>Enviar</button>
      </form>
    </div>
  )
}

export default CajaComentario