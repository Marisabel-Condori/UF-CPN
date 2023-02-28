import React, { useState } from 'react'
import TarjetaForo from '../customs/TarjetaForo';

const TarjetasForo = ({dataComentarios}) => {

  

  return (
    <div>
        {
          dataComentarios.map(item =>(
            <div key={item.idcomentario}>
              <TarjetaForo dataComentario={item}/>
            </div>
          ))
        }
    </div>
  )
}

export default TarjetasForo