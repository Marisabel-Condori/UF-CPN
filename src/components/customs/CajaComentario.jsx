import React from 'react'

const CajaComentario = () => {
  return (
    <div>
      <form>
        <div className="form-group">
          <label>Responder</label>
          <textarea className="form-control" rows="3"></textarea>
        </div>
        <button type="submit" className="btn btn-outline-secondary">Enviar</button>
      </form>
    </div>
  )
}

export default CajaComentario