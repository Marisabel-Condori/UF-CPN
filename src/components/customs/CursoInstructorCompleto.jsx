import React from 'react'

import { ExpandMore } from '@material-ui/icons';
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core';

import { useEffect, useState } from 'react'

import { Apiurl } from '../../api/UsuariosApi'
import axios from 'axios'

import { useLocation } from 'react-router-dom'
import VideoPlayer from '../video/VideoPlayer';
import { Button } from 'bootstrap';

const CursoInstructorCompleto = () => {

  const [seccionesdelCurso, setSeccionesdelCurso] = useState([])
  const [videosdelaSeccion, setvideosdelaSeccion] = useState([])

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
  const muestra = () => {
    console.log(' BOTON +++ videos de la seccion.......------');
    console.log(videosdelaSeccion);
  }

  return (
    <div className='container'>
      <div className='row'>
        <div className="col-md-8">
          <button onClick={() => muestra()}>muestra lista videos</button>
          <h3>VISTA PREVIA CURSOOOOO: {dataCurso.idcurso} titulooo: {dataCurso.titulo_curso} ---</h3>
          <VideoPlayer />
        </div>
        {/* /-------------------------------------- */}

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
                          <button className='btn btn-link btn-sm ' >{vid.titulo}  ...  {vid.idseccion}</button>
                        </li>
                      ))
                    }
                  </ul>
                </AccordionDetails>

              </Accordion>
            ))

          }

          {/* <Accordion>   
            <AccordionSummary expandIcon={<ExpandMore />}>
              Accordion 2
            </AccordionSummary>
            <AccordionDetails>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
              sit amet blandit leo lobortis eget.
            </AccordionDetails>
          </Accordion> */}
        </div>

      </div>
    </div>
  )
}

export default CursoInstructorCompleto