import { useCallback } from 'react';
import { useState } from 'react'

import NuevoCursoDatos from '../customs/NuevoCursoDatos';
import SeccionesCurso from '../customs/SeccionesCurso';

const NuevoCurso = () => {
  const [idCurso, setIdCurso] = useState(null)
  const modificaID = useCallback(valor=>{
    console.log('id ANTES de modificar => '+idCurso)
    setIdCurso(valor)
    console.log('id DESPUES de modificar => '+idCurso)
  }, [setIdCurso])

  return (
    <>
      <div className="container">
        <center><h1>Nuevo Curso</h1></center>
          <NuevoCursoDatos idCursoP={idCurso} functionP={modificaID}/> 
          <SeccionesCurso idCurso={1}/>
          {/* <SeccionesCurso datoIDcurso={idCurso} */}
        
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