import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Apiurl } from '../../api/UsuariosApi'

import '../../App.css'
import TarjetasEstudiante from '../customs/TarjetasEstudiante'

const MisCursosEstudiante = () => {

  let idPer = ''
  if (localStorage.getItem('id')) {
    idPer = localStorage.getItem('id')
  }

  const [cursosInscritos, setCursosInscritos] = useState([])
  console.log('INSCRITOS by estudiante..........');
  console.log(cursosInscritos);
  console.log('INSCRITOS by estudiante..........');

  useEffect(() => {
    getCursosInscritos()
  }, [])
  ///////////// obtiene cursos de estudiante X ///////////
  const getCursosInscritos = async () => {
    try {
      let url = Apiurl + "inscritosByEstudiante"
      let cursosLista = await axios.get(url, {
        params: { idestudiante: idPer }
      })
      setCursosInscritos(cursosLista.data)
      return cursosLista;
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div >
      {cursosInscritos.length > 0
        ? <TarjetasEstudiante dataCursosInscritos={cursosInscritos} idPersona={idPer} />
        :  <h5 className='text-center'> Aun no estas inscrito a ningun curso</h5> 
      }

    </div>
  )
}

export default MisCursosEstudiante