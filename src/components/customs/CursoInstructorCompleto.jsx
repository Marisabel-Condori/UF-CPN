import React from 'react'
import { useEffect, useState } from 'react'


import { Apiurl } from '../../api/UsuariosApi'
import axios from 'axios'

import { useLocation } from 'react-router-dom'
import VideoPlayer from '../video/VideoPlayer';
import { array } from 'prop-types'

const CursoInstructorCompleto = () => {

  const [seccionesdelCurso, setSeccionesdelCurso] = useState([])
  const [videosdelaSeccion, setvideosdelaSeccion] = useState([])

  const location = useLocation()
  // console.log(location, "useLocation hoook");
  const dataCurso = location.state?.data
  // console.log("++++++++++++++++ ya casi: ")
  // console.log(dataCurso);
  // console.log("++++++++++++++++")

  //------------------------------------------------
  useEffect(() => {
    getSeccionesByIdCurso(dataCurso.idcurso)
  }, [])
  //////// obtiene secciones del curso
  const getSeccionesByIdCurso = async (idcursoBD) => {
    let url = Apiurl + "seccionbyidCurso"
    let obtSecciones = await axios.get(url, {
      params: { idcurso: idcursoBD }
    })
    // console.log('!!!!! OBTIENE SECCION para vista previa !!!!!!')
    // console.log(obtSecciones.data)
    setSeccionesdelCurso(obtSecciones.data)
    return obtSecciones.data
  }
  //-----------------------------------------------------------

  // console.log('impriendo secciones del curso - nombre seccion');
  // console.log(seccionesdelCurso);   
  // console.log('impriendo secciones del curso - nombre seccion');

  useEffect(() => {
    console.log('FOOOOOOOOOOOOORrrr');
    for (let index = 0; index < seccionesdelCurso.length; index++) {
      const idSeccion = seccionesdelCurso[index].idseccion;
      // console.log("+++++++++++++++++++++*************************++++++++++++++++"); 
      // console.log(seccionesdelCurso[index]); 
      getVideosByIdSeccion(idSeccion)
      // console.log("+++++++++++++++++++++*************************++++++++++++++++"); 
    }
  }, [])
  ////////// obtiene videos de las secciones //////////////////
  const getVideosByIdSeccion = async (idSeccion) => {
    let url = Apiurl + "videosbyidSeccion"
    let obtVideos = await axios.get(url, {
      params: { idseccion: idSeccion }
    })
    console.log('!!!!! OBTIENE VIDEOS de cada seccion !!!!!!')
    console.log(obtVideos.data)
    setvideosdelaSeccion(obtVideos.data)
    //return obtVideos.data
  }   


  return (
    <div>
      <h3>VISTA PREVIA CURSOOOOO: {dataCurso.idcurso} titulooo: {dataCurso.titulo_curso} ---</h3>
      <VideoPlayer />
      <h4>secciones ....</h4>

      {/* /-------------------------------------- */}
      <ul className="list-group">
        {
          seccionesdelCurso.map(item => (
            <li className="list-group-item" key={item.idseccion}>
              <span className="float-left">{item.nombre_seccion}  ...  {item.idseccion}</span>

            </li>
          ))
        }
      </ul>

    </div>
  )
}

export default CursoInstructorCompleto