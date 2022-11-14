import React, { useCallback, useState } from 'react'
import shortid from 'shortid'

import SeccionCurso from './SeccionCurso'

// const [idSeccion, setIdSeccion] = useState(-1)

// const modificaIdSeccion = useCallback( valor => {
//     setIdSeccion(valor)
//   },[idSeccion])

const SeccionesCurso = ({idCursoP}) => {
  console.log('dato recibido desde el padre: '+idCursoP);

   const [seccionLista, setSeccionLista] = useState([<SeccionCurso />])

  const agregaNuevaSeccion = () => {
    //setIdSeccion(-1)
    console.log('adicionando seccioooooooon a la lista')
    setSeccionLista([...seccionLista, { id: shortid.generate(), seccion: <SeccionCurso /> }])
  }

  const eliminarSeccion = id => {
    console.log('mostrando index eliminar secciooooooooooooon'+id)
    const arrayFiltrado = seccionLista.filter(seccion => seccion.id !== id)
    setSeccionLista(arrayFiltrado)
  }

  return (
    <div>
      <h1>dato recibido desde el padre {idCursoP}</h1>
      {
        seccionLista.map((seccion, index) => (
          <div key={index}>
            <h2>seccion.lenght: {seccionLista.length}</h2>
            <SeccionCurso idCurso={idCursoP}/>
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
    </div>
  )
}

export default SeccionesCurso