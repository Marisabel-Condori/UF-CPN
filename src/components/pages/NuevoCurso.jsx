import { useState } from 'react';

import NuevoCursoDatos from '../customs/NuevoCursoDatos';
import SeccionesCurso from '../customs/SeccionesCurso';

const NuevoCurso = () => {

  const [page, setPage] = useState(1)

  return (
    <>
      <div className="container">
        <center><h1>Nuevo Curso</h1></center>
        <div>
          {
            page == 1 ? <NuevoCursoDatos /> : <SeccionesCurso />
          }
        </div>

        <center>
          <button className='btn btn-primary' onClick={()=>{ page==1?setPage(2):setPage(1) }}
          >{ page==1? 'Siguiente': 'Atras' }</button>
        </center>

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