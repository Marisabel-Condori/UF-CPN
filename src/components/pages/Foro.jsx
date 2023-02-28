import React, { useEffect, useState } from 'react'
import CajaComentario from '../customs/CajaComentario'
import TarjetasForo from '../customs/TarjetasForo'

import { Apiurl } from '../../api/UsuariosApi'
import axios from 'axios'
import TarjetaForo from '../customs/TarjetaForo'
import CajaRespuestaForo from '../customs/CajaRespuestaForo'

const Foro = ({ idPer }) => {

  // comentariosByIdInstructor
  const [comentariosInst, setComentariosInst] = useState([])
  const [idComentario, setIdComentario] = useState('')
  const [objComentario, setObjComentario] = useState({})

  const enviarDatosComentario = (com) => {
    setIdComentario(com.idcomentario)
    setObjComentario(com)
  }

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

      setComentariosInst(comentariosLista.data)
      // console.log(comentariosInst);
      return comentariosLista;
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
      {/* ------------------------ lista de comentarios------------------------- */}
      <h1>Foro </h1>
      <p>si no tiene cursos mostrara: AUN NO TIENES CURSOS, CREA UN CURSO EN LA SECCION NUEVO CURSO....</p>
      <div className='row'>
        <div className='col-sm-5'>
          {
            comentariosInst.map(item => (
              <div key={item.idcomentario}>
                <div className='container'>
                  <div className="card border-success mb-3 ">
                    <div className="card-header border-success  ">
                      {item.titulo_curso}
                      <button className='btn btn-success float-right' onClick={() => enviarDatosComentario(item)}>Ir</button>
                    </div>
                    <div className="card-body text-success">
                      <h5 className="card-title">{item.titulo}</h5>
                      <p className="card-text">{item.comentario}</p>
                    </div>
                    <div className="card-footer text-right bg-transparent border-success">
                      Por: {item.nombre} {item.ap_paterno}
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
        </div>

        {/* -------------------------- selecciona solo un comentario ------------------------------------ */}
        {idComentario && <CajaRespuestaForo objComentario={objComentario} />  }
      </div>

    </>
  )
}

export default Foro