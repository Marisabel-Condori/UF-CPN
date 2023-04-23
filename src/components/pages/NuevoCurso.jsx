import { useState, useCallback } from 'react';

import NuevoCursoDatos from '../customs/NuevoCursoDatos';
import SeccionesCurso from '../customs/SeccionesCurso';

const NuevoCurso = ({ idPer }) => {

  const [idCurso, setIdCurso] = useState(null)
  const modificaID = useCallback(valor => {
    setIdCurso(valor)
  }, [])
  const finalizar = () => {
    window.location.pathname = '/'
  }

  return (
    <>
      {/* <h5>valor recibido desde el hijo: {idCurso}</h5> */}
      <div className="container">
        <h1 className='text-center'>Nuevo Curso</h1>
        <div className='card card-header mb-4'>
          <h5>Paso 1</h5>
          <p>En esta seccion debes llenar los datos del curso. Una vez llenado hasta la portada del curso debes GUARDAR DATOS CURSO
            para continuar con la creacion de las secciones </p>
        </div>
        <NuevoCursoDatos idCursoP={idCurso} functionP={modificaID} idPersona={idPer} />
        {idCurso &&
          <>
            <div className='card card-header mb-4'>
              <h5>Paso 2</h5>
              <p>Ahora puedes continuar con la creacion de las secciones, crea tantas secciones necesites </p>
            </div>
            <SeccionesCurso idCursoP={idCurso} />
            <center >
              <button type='onSubmit' className='btn btn-success my-4' onClick={() => finalizar()}> Finalizar</button>
            </center>
          </>
        }
      </div>
    </>
  )
}

export default NuevoCurso