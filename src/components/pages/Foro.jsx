import React from 'react'
import CajaComentario from '../customs/CajaComentario'
import TarjetasForo from '../customs/TarjetasForo'

const Foro = () => {

  return (
    <div>
        <h1>Foro</h1>
        <p>si no tiene cursos mostrara: AUN NO TIENES CURSOS, CREA UN CURSO EN LA SECCION NUEVO CURSO</p>
        <div className='row'>
            <div className='col-sm-4'> 
              <div className='scrollspy' data-spy='scroll'>
                <TarjetasForo/>
              </div>
            </div>
            <div className='col-sm-8' > 
              <div>
              <div className=" border-success mb-3">
                    <div className="card-header bg-transparent border-success">Titulo del Curso</div>
                    <div className="card-body text-success">
                        <h5 className="card-title">Titulo del mensaje</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <button type="button" className="btn btn-outline-secondary">Ir al video</button>
                    </div>
                    <div className="card-footer text-right bg-transparent border-success">Por: Nombre y Ape</div>

                    <CajaComentario/>
                </div>
              </div>
            </div>
        </div>

    </div>
  )
}

export default Foro