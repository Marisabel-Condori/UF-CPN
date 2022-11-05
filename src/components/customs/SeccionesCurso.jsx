import React, { useState } from 'react'
import shortid from 'shortid'

import SeccionCurso from './SeccionCurso'

const SeccionesCurso = () => {

  const [seccionLista, setSeccionLista] = useState([])
  const [seccion, setSeccion] = useState({})
  //const [seccionLista, setSeccionLista] = useState([])

  const agregaNuevaSeccion = () => {
    console.log('adicionando seccioooooooon a la lista')
    setSeccionLista([...seccionLista, { id: shortid.generate(), seccion: <SeccionCurso /> }])
  }

  const eliminarSeccion = id => {
    console.log('mostrando index eliminar secciooooooooooooon')
    console.log(id)
    const arrayFiltrado = seccionLista.filter(seccion => seccion.id !== id)
    setSeccionLista(arrayFiltrado)
  }

  return (
    <div>
      {
        seccionLista.map((item, index) => (
          <div key={index}>
            <h3>index: {index}</h3>
            <h2>seccion.lenght: {seccionLista.length}</h2>
            {/* {!seccionLista.length ? <h1>array vacio</h1> : <SeccionCurso />} */}
            {item.seccion}
            {/* <SeccionCurso/> */}
            {
              seccionLista.length > 1 && (
                <button type='button' className='btn btn-danger my-2' onClick={() => eliminarSeccion(seccion.id)}>Eliminar seccion</button>
              )}
            {
              seccionLista.length - 1 === index && (
                <div className="form-group">
                  <button type="button" className="btn btn-success mt-2" onClick={() => agregaNuevaSeccion(seccion.id)}>+ Seccion</button>
                </div>
              )
            }
          </div>
        ))
      }
      {setSeccionLista([...seccionLista,<SeccionCurso/>])} 
    </div>
  )
}

export default SeccionesCurso