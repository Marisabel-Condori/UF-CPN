import React from 'react'

import { ExpandMore } from '@material-ui/icons';
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';

import { useEffect, useState } from 'react'

import { Apiurl } from '../../api/UsuariosApi'
import axios from 'axios'

import { useLocation } from 'react-router-dom'
import VideoPlayer from '../video/VideoPlayer';
import CajaComentario from './CajaComentario';

const CursoEstudianteCompleto = () => {

  const [seccionesdelCurso, setSeccionesdelCurso] = useState([])
  const [videosdelaSeccion, setvideosdelaSeccion] = useState([])
  const [videoLink, setVideoLink] = useState('')
  const [nombreVideo, setNombreVideo] = useState('')
  const [idvideo, setIdVideo] = useState('')
  const [estaInscrito, setEstaInscrito] = useState(false)

  let idPersona = ''
  if (localStorage.getItem('id')) { idPersona = localStorage.getItem('id') }

  const location = useLocation()
  // console.log(location, "useLocation hoook");
  const dataCurso = location.state?.data
  // console.log('location state.data.....-*-*-*-*-*-*--*-*');
  // console.log(dataCurso);

  //------------------ESTA INSCRITO??-----------------------------
  useEffect(() => {
    getEstaInscritoAlCurso(dataCurso.idcurso, idPersona)
  }, [])
  //////// obtiene si esta inscrito al curso
  const getEstaInscritoAlCurso = async (idcursoBD, idPersona) => {
    try {
      let url = Apiurl + "estaInscrito"
      let estaEnElCurso = await axios.get(url, {
        params: { idcurso: idcursoBD, idestudiante: idPersona }
      })
      console.log('!!!!! esta inscrito??? !!!!!!')
      console.log(estaEnElCurso.data)
      console.log(estaEnElCurso.data.length)
      estaEnElCurso.data.length > 0 && setEstaInscrito(true)
    } catch (error) {
      console.log(error)
    }
  }

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
    // console.log('verificando datos de secciones curso ++++');
    // console.log(seccionesdelCurso);
    const listaVidCompleta = []
    for (let index = 0; index < seccionesdelCurso.length; index++) {
      const idSeccion = seccionesdelCurso[index].idseccion;
      // console.log("*************************++++++++++++++++");
      // console.log(idSeccion);
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
  const enviarDatosVideo = (vid) => {
    setNombreVideo(vid.titulo)
    setVideoLink(vid.urlvideo)
    setIdVideo(vid.idvideo)
  }

  return (
    <>
      <h3 className='text-center'>{dataCurso.titulo_curso}</h3>  <br />
      <div className='row'>
        <div className="col-md-8">
          {
            estaInscrito
              ? <VideoPlayer urlVideo={videoLink} />
              : <img src="https://m.media-amazon.com/images/I/6175EB35qYL._AC_UL400_.jpg" />
          }
          <h4 className='mt-5'>{nombreVideo}</h4> 
          {
            idvideo && <CajaComentario idvideo={idvideo} idper={idPersona} estaInscrito={estaInscrito} />
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
    </>
  )
}

export default CursoEstudianteCompleto