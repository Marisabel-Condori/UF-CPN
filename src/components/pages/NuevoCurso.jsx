import { useState, useCallback } from 'react';

import NuevoCursoDatos from '../customs/NuevoCursoDatos';
import SeccionesCurso from '../customs/SeccionesCurso';

const NuevoCurso = ({ idPer }) => {

  const [idCurso, setIdCurso] = useState(null)
  const modificaID = useCallback(valor => {
    setIdCurso(valor)
  }, [])

  const [guardarCurso, setGuardarCurso] = useState(null)
  const modificaGuardarCurso = useCallback(valor => {
    setGuardarCurso(valor)
  }, [])

  return (
    <>
      <h5>valor recibido desde el hijo: {idCurso}</h5>
      <div className="container">
        <center><h1>Nuevo Curso</h1></center>
        <div className='card card-header mb-4'>
            <h5>Paso 1</h5>
            <p>En esta seccion debes llenar los datos del curso. Una vez llenado hasta la portada del curso debes GUARDAR DATOS CURSO 
              para continuar con la creacion de la seccion </p>
        </div>
        <NuevoCursoDatos idCursoP={idCurso} functionP={modificaID} idPersona={idPer} />
        <div className='card card-header mb-4'>
            <h5>Paso 2</h5>
            <p>Ahora puedes continuar con la creacion de las secciones, crea tantas secciones necesites </p>
        </div>
        <SeccionesCurso idCursoP={idCurso} />
        {/* <SeccionesCurso idCursoP={111} /> */}

        {/*       
      <form>
        <input type="submit" value={"enviar"} className='mx-4' />
        <input type="submit" value={"Vista Previa"} />
      </form>
     */}
      </div>
    </>
  )
}

export default NuevoCurso