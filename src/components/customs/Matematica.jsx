import React, { useEffect, useState } from 'react'
import { Apiurl } from '../../api/UsuariosApi'
import axios from 'axios'
import TarjetaCursoInstructor from './TarjetaCursoInstructor'

const Matematica = () => {
  const [cursosInst, setCursosInst] = useState([])

  useEffect(() => {
    getCursosInst()
  }, [])

  ///////////// obtiene cursos bd ///////////
  const getCursosInst = async () => {
    try {
      let url = Apiurl + "cursoByCategoria"
      let cursosLista = await axios.get(url, {
        params: { categoria: 'Matematica' }
      })
      setCursosInst(cursosLista.data)
      return cursosLista;
    } catch (error) {
      console.log(error)
    }
  }
  const url = 'https://youtube.com'

  return (
    <>
      <h1>MATE</h1>
      <div className='d-flex justify-content-center align-items-center h-100'>
        <div className='row'>
          {
            cursosInst.map(card => (
              <div className='col-md-4' key={card.idcurso}>
                <TarjetaCursoInstructor objCursoBD={card} url={url} nombreDocente={"Mari...."} precio={"50"} />
              </div>
            ))
          }
        </div>
      </div>
    </>
  )
}

export default Matematica