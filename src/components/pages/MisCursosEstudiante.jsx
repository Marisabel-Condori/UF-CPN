import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Apiurl } from '../../api/UsuariosApi'

import '../../App.css'
import TarjetasEstudiante from '../customs/TarjetasEstudiante'

const MisCursosEstudiante = ({ idPer }) => {

  const [cursosInscritos, setCursosInscritos] = useState([])

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

  // console.log('++++++++++CURSOS INSCRITOS++++++++++++');
  // console.log(cursosInscritos);

  return (
    <div >
      {cursosInscritos.length > 0
        ? <TarjetasEstudiante dataCursosInscritos={cursosInscritos} idPersona={idPer} />
        : <center> <h5> Aun no estas inscrito a ningun curso</h5> </center>
      }

    </div>
  )
}

export default MisCursosEstudiante