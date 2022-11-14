import { useState,useCallback } from 'react';

import NuevoCursoDatos from '../customs/NuevoCursoDatos';
import SeccionesCurso from '../customs/SeccionesCurso';

const NuevoCurso = () => {
  
  const [idCurso, setIdCurso] = useState(null)
  const modificaID = useCallback(valor => {
    setIdCurso(valor)
  }, [setIdCurso])

  return (
    <>
      <h2>valor recibido desde el hijo: {idCurso}</h2>
      <div className="container">
        <center><h1>Nuevo Curso</h1></center>
        <NuevoCursoDatos idCursoP={idCurso} functionP={modificaID} />
        <SeccionesCurso idCursoP={idCurso} />

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