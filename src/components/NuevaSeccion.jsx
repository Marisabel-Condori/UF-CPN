import React from 'react'

const NuevaSeccion = () => {
  return (
    <div>
      <form >
        <div className="form-group">
          <label >Seccion 1:</label>
          <input type="text" className="form-control" placeholder="Ingresa titulo de la seccion"/>
          <input type="file" className='form-control-file my-1' />
          <button type='submit' className='btn btn-light'>Subir video</button>
        </div>

        <div className='form-group'>
          <button type="button" className="btn btn-outline-dark ml-5 mr-2">+ video</button>
          <button type="button" className="btn btn-outline-dark ">+ recurso</button> 
        </div>
      </form>

    </div>
  )
}

export default NuevaSeccion