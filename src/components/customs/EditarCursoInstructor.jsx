import React from 'react'

import { useEffect, useState } from 'react'

import { Apiurl } from '../../api/UsuariosApi'
import axios from 'axios'

import { useLocation } from 'react-router-dom'
import { faEdit, faEye, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import VideoPlayer from '../video/VideoPlayer'

const EditarCursoInstructor = () => {

  const [seccionesdelCurso, setSeccionesdelCurso] = useState([])
  const [videosdelaSeccion, setvideosdelaSeccion] = useState([])
  const [nombreVideo, setNombreVideo] = useState('')

  const [editaNombreSeccion, setEditaNombreSeccion] = useState(false)
  const [idSec, setIdSec] = useState(0)
  const [nuevoNombreSeccion, setNuevoNombreSeccion] = useState('')

  const [verVideo, setVerVideo] = useState(false)
  const [idvideo, setIdVideo] = useState('')
  const [videoLink, setVideoLink] = useState('')

  let idPersona = ''
  if (localStorage.getItem('id')) { idPersona = localStorage.getItem('id') }

  const location = useLocation()
  // console.log(location, "useLocation hoook");
  const dataCurso = location.state?.data
  // console.log('location state.data.....-*-*-*-*-*-*--*-*');
  // console.log(dataCurso);

  ///////////////////// EDITA SECCION //////////////////////////////
  const modificaDatosSeccion = (nombreSeccion, idseccion) => {
    setEditaNombreSeccion(true)
    setNuevoNombreSeccion(nombreSeccion)
    setIdSec(idseccion)
  }

  const enviaEdicionSeccion = () => {
    if (!nuevoNombreSeccion.trim()) {
      console.log('error VACIO');
      return
    }
    console.log('+++++++++ boton editar ++++++++++');
    console.log(idSec + ' ' + nuevoNombreSeccion);
    editarSeccionBD(idSec, nuevoNombreSeccion)
    setEditaNombreSeccion(false)
    setIdSec(0)
    setNuevoNombreSeccion('')
  }

  const editarSeccionBD = async (idsec, nuevoNombreSec) => {
    let url = Apiurl + "seccion"
    let res = await axios.patch(url, null, {
      params: { idseccion: idsec, nombre_seccion: nuevoNombreSec }
    })
    console.log('++++++++++++ response docente UPDATE -----------')
    console.log(res);
    if (res.data.status === 'exitoso') {
      getSeccionesByIdCurso(dataCurso.idcurso)
      console.log('ya se EDITOOOOOOOOO');
    } else {
      console.log('ERROOOOOOOOOOOOOOOOOOOOOOOOOR');
    }
  }
  //////////////////////////////////////////////////////////////////

  //////////////////////// ELIMINA VIDEO ///////////////////////////
  const eliminarVideo = (idvid) => {
    setIdVideo(idvid)
    abrirModalELiminaVideo()
  }
  const eliminaVidBD = async () => {
    console.log('eliminando videooooooooo');
    let url = Apiurl + "video"
    let res = await axios.delete(url, {
      params: { idvideo: idvideo }
    })
    console.log('++++++++++++ response docente ELIMINADO -----------')
    console.log(res);
    if (res.data.status === 'exitoso') {
      console.log('ya se ELIMINOOOOO');
      setIdVideo(0)
      abrirModalELiminaVideo()
      getSeccionesByIdCurso(dataCurso.idcurso)
    } else {
      console.log('ERROOOOOOOOOOOOOOOOOOOOOOOOOR');
    }
  }
  ///////////////////////////////////////////////////////////////////////////

  //////////////////////// VER VIDEO ///////////////////////////
  const opVerVid = (url, idVid) => {
    setVerVideo(!verVideo)
    setVideoLink(url)
    setIdVideo(idVid)
  }
  ///////////////////////////////////////////////////////////////////////////

  // ------------------ MODAL -------------
  const [isOpen, setIsOpen] = useState(false)
  const abrirModalELiminaVideo = () => {
    setIsOpen(!isOpen)
    { isOpen && <Modal isOpen={isOpen} /> }
  }
  //------------------------------------------------
  useEffect(() => {
    getSeccionesByIdCurso(dataCurso.idcurso)
  }, [])
  //////////////////// obtiene secciones del curso /////////////////////////
  const getSeccionesByIdCurso = async (idcursoBD) => {
    let url = Apiurl + "seccionbyidCurso"
    let obtSecciones = await axios.get(url, {
      params: { idcurso: idcursoBD }
    })
    console.log('!!!!! OBTIENE SECCION para vista previa !!!!!!')
    console.log(obtSecciones.data)
    setSeccionesdelCurso(obtSecciones.data)
  }

  /////////////////////////////////////////////////////////////////////////
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
      <h3 className='text-center'>{dataCurso.titulo_curso} EDITAR</h3>  <br />

      <div className="col-md-10">
        {
          seccionesdelCurso.map(item => (
            <div className='card mb-2' key={item.idseccion}>
              <div className="card-body">
                {editaNombreSeccion && item.idseccion === idSec
                  ? <>
                    <button className="btn" onClick={enviaEdicionSeccion}>  <FontAwesomeIcon icon={faSave} style={{ color: 'red' }} /> </button>
                    <input type="text" value={nuevoNombreSeccion} onChange={e => setNuevoNombreSeccion(e.target.value)} />
                  </>
                  : <>
                    <button className="btn" onClick={() => modificaDatosSeccion(item.nombre_seccion, item.idseccion)}>  <FontAwesomeIcon icon={faEdit} /> </button>
                    {item.nombre_seccion}
                  </>
                }

                <ul className="list-group w-100 mt-3">
                  {
                    videosdelaSeccion.map(vid => (
                      item.idseccion === vid.idseccion &&
                      <li className="list-group-item py-0" key={vid.idvideo}>
                        <button className='btn btn-link btn-sm ' onClick={() => enviarDatosVideo(vid)}>{vid.titulo}</button>
                        {/* <button className="btn float-right" onClick={()=> abrirModalELiminaVideo()} onChange={setIdVideo(vid.idvideo)}>  <FontAwesomeIcon icon={faTrash} /> </button> */}
                        <button className="btn float-right" onClick={() => eliminarVideo(vid.idvideo)} >  <FontAwesomeIcon icon={faTrash} /> </button>
                        <button className="btn float-right">  <FontAwesomeIcon icon={faEdit} /> </button>
                        <button className="btn float-right" onClick={() => opVerVid(vid.urlvideo, vid.idvideo)}>  <FontAwesomeIcon icon={faEye} /> </button>
                        {verVideo && vid.idvideo === idvideo &&
                          <>
                            <VideoPlayer urlVideo={videoLink} />
                          </>
                        }
                      </li>
                    ))
                  }
                </ul>

              </div>
            </div>
          ))
        }
      </div>
      <Modal isOpen={isOpen}>
        <ModalHeader className='center'>
          ¿Eliminar video ddd ??
        </ModalHeader>
        <ModalFooter>
          < Button color="secondary" onClick={eliminaVidBD}>Eliminar</Button>
          < Button color="secondary" onClick={abrirModalELiminaVideo}>Cerrar</Button>
        </ModalFooter>
      </Modal>

    </>
  )
}

export default EditarCursoInstructor