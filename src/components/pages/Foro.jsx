import React, { useEffect, useState } from 'react'
import CajaComentario from '../customs/CajaComentario'
import TarjetasForo from '../customs/TarjetasForo'

import { Apiurl } from '../../api/UsuariosApi'
import axios from 'axios'

const Foro = ({idPer}) => {

  // comentariosByIdInstructor
  const [comentariosInst, setComentariosInst] = useState([])

  // let idPersona = ''
  // if (localStorage.getItem('id')) {
  //   idPersona = localStorage.getItem('id')
  //   console.log(idPersona);
  // }

  useEffect(() => {
    getComentariosByInstructor()
  }, [])

  ///////////// obtiene comentarios bd ///////////
  const getComentariosByInstructor = async () => {
    try {
      let url = Apiurl + "comentariosByIdInstructor"
      let comentariosLista = await axios.get(url, {
        params: { idinstructor: idPer }
      })
      // console.log('+++++++++++ comentarios por instructor ++++++++++');
      // console.log(comentariosLista);
      // console.log('+++++++++++ +++++++++++++++++++++++++++++++++++++');

      setComentariosInst(comentariosLista.data)
      // console.log(comentariosInst);
      return comentariosLista;
    } catch (error) {
      console.log(error)
    }
  }

  
  return (
    <>
      <h1>Foro </h1>
      <p>si no tiene cursos mostrara: AUN NO TIENES CURSOS, CREA UN CURSO EN LA SECCION NUEVO CURSO</p>
      <div className='row'>
        <div className='col-sm-5'>
          <div className='scrollspy' data-spy='scroll'>
            <TarjetasForo dataComentarios={comentariosInst}/>
          </div>
        </div>
        <div className='col-sm-7' >
          <div>
            <div className=" border-success mb-2">
              <div className="card-header bg-transparent border-success">Titulo del Curso</div>
              <div className="card-body text-success">
                <h5 className="card-title">Titulo del mensaje</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
              </div>
              <div className="card-footer text-right bg-transparent border-success">Por: Nombre y Ape</div>
              <CajaComentario idper={idPer}/>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default Foro