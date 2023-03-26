import React, { useEffect, useState } from 'react'
import { Apiurl } from '../../api/UsuariosApi'
import axios from 'axios'
import CajaRespuestaForo from '../customs/CajaRespuestaForo'
import { useLocation } from 'react-router-dom'

const Foro = ({ idPer }) => {

  const location = useLocation()
  const idcurso = location.state?.data.idcurso

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
        params: { idinstructor: idPer, idcurso: idcurso }
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
      <center>
      <h4>Foro de consultas del curso: <br/> {location.state?.data.titulo_curso}</h4>
      </center> <br/>
      {
        comentariosInst.length === 0
          ? <center> <h3>no tienes consultas en el curso</h3> </center>
          :
          <div className='row'>
            <div className='col-sm-5'>
              {
                comentariosInst.map(item => (
                  <div key={item.idcomentario}>
                    <div className='container'>
                      <div className="card border-success mb-3 ">
                        <div className="card-header border-success  ">
                          {item.titulo}
                          <button className='btn btn-success float-right' onClick={() => enviarDatosComentario(item)}>  Ir </button>
                        </div>
                        <div className="card-body text-success">
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
            {idComentario && <CajaRespuestaForo objComentario={objComentario} />}
          </div>
      }

    </>
  )
}

export default Foro