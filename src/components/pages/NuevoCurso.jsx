import { useState } from 'react';

import NuevoCursoDatos from '../customs/NuevoCursoDatos';
import SeccionesCurso from '../customs/SeccionesCurso';

const NuevoCurso = () => {

  return (
    <>
      <div className="container">
        <center><h1>Nuevo Curso</h1></center>
          <NuevoCursoDatos /> 
          <SeccionesCurso />
        
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