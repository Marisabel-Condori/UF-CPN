import React from 'react'

import { ExpandMore } from '@material-ui/icons';
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';

import { useEffect, useState } from 'react'

import { Apiurl } from '../../api/UsuariosApi'
import axios from 'axios'

import { useLocation } from 'react-router-dom'
import VideoPlayer from '../video/VideoPlayer';
import CajaComentario from './CajaComentario';

const CursoInstructorCompleto = () => {

  const [seccionesdelCurso, setSeccionesdelCurso] = useState([])
  const [videosdelaSeccion, setvideosdelaSeccion] = useState([])
  const [videoLink, setVideoLink] = useState('')
  const [idvideo, setIdVideo] = useState('')

  let idPersona=''
  if (localStorage.getItem('id')) { idPersona = localStorage.getItem('id') }

  const location = useLocation()
  // console.log(location, "useLocation hoook");
  const dataCurso = location.state?.data
  // console.log('location state.data.....-*-*-*-*-*-*--*-*');
  // console.log(dataCurso);

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
    console.log('!!!!! OBTIENE SECCION para vista previa !!!!!!')
    console.log(obtSecciones.data)
    setSeccionesdelCurso(obtSecciones.data)
  }

  //////////////////////////////////
  const adicionaListaVideos = async () => {
    console.log('verificando datos de secciones curso ++++');
    console.log(seccionesdelCurso);
    const listaVidCompleta = []
    for (let index = 0; index < seccionesdelCurso.length; index++) {
      const idSeccion = seccionesdelCurso[index].idseccion;
      console.log("*************************++++++++++++++++");
      console.log(idSeccion);
      const listaVid = await getVideosByIdSeccion(idSeccion)
      listaVidCompleta.push(...listaVid)
    }
    // console.log('COMPLETO.............');
    setvideosdelaSeccion(listaVidCompleta)
  }
  useEffect(() => {
    if (seccionesdelCurso.length > 0) {
      adicionaListaVideos()
    }
  }, [seccionesdelCurso])

  //////// obtiene videos de la seccion
  const getVideosByIdSeccion = async (idSeccion) => {
    let url = Apiurl + "videosbyidSeccion"
    let obtVideos = await axios.get(url, {
      params: { idseccion: idSeccion }
    })
    // console.log('!!!!! OBTIENE VIDEOS de cada seccion !!!!!!')
    // console.log(obtVideos.data)
    return await obtVideos.data
  }
  ////////////////
  const enviarDatosVideo = (vid)=>{
    setVideoLink(vid.urlvideo)
    setIdVideo(vid.idvideo)
  }

  return (
      <div className='row'>
        <div className="col-md-8">
          {/* <h3>VISTA PREVIA CURSOOOOO: {dataCurso.idcurso} titulooo: {dataCurso.titulo_curso} ---</h3> */}
          <VideoPlayer urlVideo={videoLink} />
          {/* <h4>idvideo = {idvideo}</h4>
          <h4>..{idPersona}.....</h4> */}
          {
            idvideo&& <CajaComentario  idvideo = {idvideo} idper = {idPersona}/> 
          }
        </div>
        {/* /---------------------------------------------------------- */}

        <div className="col-md-4"> 
          {
            seccionesdelCurso.map(item => (
              <Accordion key={item.idseccion}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  {item.nombre_seccion}
                </AccordionSummary>
                <AccordionDetails className='pt-0' >
                  <ul className="list-group w-100">
                    {
                      videosdelaSeccion.map(vid => (
                        item.idseccion === vid.idseccion &&
                        <li className="list-group-item py-0" key={vid.idvideo}>
                          <button className='btn btn-link btn-sm ' onClick={() => enviarDatosVideo(vid)}>{vid.titulo}  ...  {vid.idseccion}</button>
                        </li>
                      ))
                    }
                  </ul>
                </AccordionDetails>
              </Accordion>
            ))
          }
        </div>
      </div>

  )
}

export default CursoInstructorCompleto