import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { Apiurl } from '../../api/UsuariosApi'
import axios from 'axios'

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../Firebase";
import { faClose, faEdit, faEye, faSave, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { Button, Modal, ModalFooter, ModalHeader } from 'reactstrap'
import VideoPlayer from '../video/VideoPlayer'
import SeccionesCurso from './SeccionesCurso';

const EditarCursoInstructor = () => {

  const [seccionesdelCurso, setSeccionesdelCurso] = useState([])
  const [videosdelaSeccion, setvideosdelaSeccion] = useState([])
  const [nombreVideo, setNombreVideo] = useState('')

  const [editaNombreSeccion, setEditaNombreSeccion] = useState(false)
  const [idSec, setIdSec] = useState(0)
  const [nuevoNombreSeccion, setNuevoNombreSeccion] = useState('')
  const [agregaSeccion, setAgregaSeccion] = useState(false)

  const [verVideo, setVerVideo] = useState(false)
  const [idvideo, setIdVideo] = useState('')
  const [link, setLink] = useState('')
  const [progress, setProgress] = useState(0)
  const [editaVideo, setEditaVideo] = useState(false)

  let idPersona = ''
  if (localStorage.getItem('id')) { idPersona = localStorage.getItem('id') }

  const location = useLocation()
  // console.log(location, "useLocation hoook");
  const dataCurso = location.state?.data
  // console.log('location state.data.....-*-*-*-*-*-*--*-*');
  // console.log(dataCurso);

  const agregaSec = () => {
    setAgregaSeccion(!agregaSeccion)
  }
  const finalizar = () => {
    setAgregaSeccion(false)
    getSeccionesByIdCurso(dataCurso.idcurso)
  }
  ///////////////////// EDITA SECCION //////////////////////////////
  const modificaDatosSeccion = (nombreSeccion, idseccion) => {
    setVerVideo(false)
    setEditaVideo(false)
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

  //////////////////////// ELIMINA SECCION ///////////////////////////
  const eliminarSeccion = (idseccion) => {
    setIdSec(idseccion)
    abrirModalELimina()
  }
  const eliminaSecBD = async () => {
    console.log('eliminando seccioooooon'+idSec);
    let url = Apiurl + "seccion"
    let res = await axios.delete(url, {
      params: { idseccion: idSec }
    })
    console.log('++++++++++++ response seccion ELIMINADA -----------')
    console.log(res);
    if (res.data.status === 'exitoso') {
      console.log('ya se ELIMINOOOOO');
      setIdSec(0)
      abrirModalELimina()
      getSeccionesByIdCurso(dataCurso.idcurso)
    } else {
      console.log('ERROOOOOOOOOOOOOOOOOOOOOOOOOR');
    }
  }
  //////////////////////// ELIMINA VIDEO ///////////////////////////
  const eliminarVideo = (idvid) => {
    setIdVideo(idvid)
    abrirModalELimina()
  }
  const eliminaVidBD = async () => {
    console.log('eliminando videooooooooo');
    let url = Apiurl + "video"
    let res = await axios.delete(url, {
      params: { idvideo: idvideo }
    })
    console.log('++++++++++++ response video ELIMINADO -----------')
    console.log(res);
    if (res.data.status === 'exitoso') {
      console.log('ya se ELIMINOOOOO');
      setIdVideo('')
      abrirModalELimina()
      getSeccionesByIdCurso(dataCurso.idcurso)
    } else {
      console.log('ERROOOOOOOOOOOOOOOOOOOOOOOOOR');
    }
  }
  // ------------------ MODAL -------------
  const [isOpen, setIsOpen] = useState(false)
  const abrirModalELimina = () => {
    setIsOpen(!isOpen)
    { isOpen && <Modal isOpen={isOpen} /> }
  }
  //------------------------------------------------
  ///////////////////////////////////////////////////////////////////////////

  //////////////////////// VER VIDEO ///////////////////////////
  const opVerVid = (url, idVid) => {
    setEditaVideo(false)
    setEditaNombreSeccion(false)
    setVerVideo(!verVideo)
    setLink(url)
    setIdVideo(idVid)
  }
  ///////////////////////////////////////////////////////////////////////////

  //////////////////////// EDITAR VIDEO ///////////////////////////
  const editarVideo = (idvid, nomVid) => {
    setVerVideo(false)
    setEditaNombreSeccion(false)
    setEditaVideo(!editaVideo)
    setIdVideo(idvid)
    setNombreVideo(nomVid)
  }

  const onChange = e => {
    const file = e.target.files[0]
    console.log('*******************')
    console.log(file.name);
    uploadFiles(file)
  }
  const uploadFiles = file => {
    if (!file) return;
    const storageRef = ref(storage, `/files/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on("state_changed", (snapshot) => {
      const prog = Math.round((snapshot.bytesTransferred * 100) / snapshot.totalBytes)
      setProgress(prog)
    },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          console.log(url)
          setLink(url)
        })
      })
  }

  const editaVideoBD = (cancela) => {
    if (cancela === 'CANCELAR') {
      setEditaVideo(false)
      return
    }
    console.log('idvideo: ' + idvideo);
    console.log('nombre video: ' + nombreVideo + ' link: ' + link);
    if (!nombreVideo.trim()) {
      console.log('error VACIO');
      return
    }
    enviaBD(idvideo, nombreVideo, link)
  }

  const enviaBD = async (idvideo, nombrevideo, videolink) => {
    let url = Apiurl + "video"
    let res = await axios.patch(url, null, {
      params: { idvideo: idvideo, titulo: nombrevideo, urlvideo: videolink }
    })
    console.log('++++++++++++ response video UPDATE -----------')
    console.log(res);
    if (res.data.status === 'exitoso') {
      setEditaVideo(false)
      setIdVideo('')
      setNombreVideo('')
      getSeccionesByIdCurso(dataCurso.idcurso)
      console.log('ya se EDITOOOOOOOOO');
    } else {
      console.log('ERROOOOOOOOOOOOOOOOOOOOOOOOOR');
    }
  }
  ///////////////////////////////////////////////////////////////////////////

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
  // const enviarDatosVideo = (vid) => {
  //   setNombreVideo(vid.titulo)
  //   setLink(vid.urlvideo)
  //   setIdVideo(vid.idvideo)
  // }


  return (
    <>
      <h3 className='text-center'>EDITAR <br/> {dataCurso.titulo_curso}</h3>  <br />

      <>
        {
          seccionesdelCurso.map(item => (
            <div className='card mb-2' key={item.idseccion}>
              <div className="card-body">
                {editaNombreSeccion && item.idseccion === idSec
                  ? <>
                    <button className="btn" onClick={enviaEdicionSeccion}> <FontAwesomeIcon icon={faSave} style={{ color: 'red' }} /> </button>
                    <input type="text" className='form-control' value={nuevoNombreSeccion} onChange={e => setNuevoNombreSeccion(e.target.value)} />
                  </>
                  : <>
                    <button className="btn" onClick={() => modificaDatosSeccion(item.nombre_seccion, item.idseccion)}>  <FontAwesomeIcon icon={faEdit} /> </button>
                    <button className="btn" onClick={() => eliminarSeccion(item.idseccion)}>  <FontAwesomeIcon icon={faTrash} /> </button>
                    {item.nombre_seccion}
                  </>
                }

                <ul className="list-group w-100 mt-3">
                  {
                    videosdelaSeccion.map(vid => (
                      item.idseccion === vid.idseccion &&
                      <li className="list-group-item py-0" key={vid.idvideo}>
                        {editaVideo && vid.idvideo === idvideo
                          ?
                          <div className='my-3'>
                            <input type="text" value={nombreVideo} onChange={e => setNombreVideo(e.target.value)} placeholder='Ingrese nuevo titulo del video' className="form-control" />
                            <input type="file" onChange={onChange} />
                            <div className="progress mb-2">
                              <div className="progress-bar progress-bar-striped progress-bar-animated " style={{ width: `${progress}%` }}>{progress}%</div>
                            </div>  <br />
                            <button className="btn btn-outline-danger btn-sm" onClick={() => editaVideoBD('NO CANCELAR')}> <FontAwesomeIcon icon={faSave} /> Guardar Cambios</button>
                            <button className="btn btn-outline-danger ml-3 btn-sm" onClick={() => editaVideoBD('CANCELAR')}> <FontAwesomeIcon icon={faClose} /> Cancelar</button>

                          </div>
                          : <>
                            <button className='btn btn-link btn-sm'>{vid.titulo}</button>
                            <button className="btn float-right" onClick={() => eliminarVideo(vid.idvideo)} >  <FontAwesomeIcon icon={faTrash} /> </button>
                            <button className="btn float-right" onClick={() => editarVideo(vid.idvideo, vid.titulo)}>  <FontAwesomeIcon icon={faEdit} /> </button>
                            <button className="btn float-right" onClick={() => opVerVid(vid.urlvideo, vid.idvideo)}>  <FontAwesomeIcon icon={faEye} /> </button>
                          </>
                        }
                        {verVideo && vid.idvideo === idvideo &&
                          <VideoPlayer urlVideo={link} />
                        }
                      </li>
                    ))
                  }
                </ul>

              </div>
            </div>
          ))
        }
        <button className='btn btn-outline-success mb-2' onClick={agregaSec}> Agregar sección</button>
        {agregaSeccion &&
          <>
            <SeccionesCurso idCursoP={dataCurso.idcurso} />
            <center>

              <button className='btn btn-outline-success mb-2' onClick={finalizar}> finalizar</button>
            </center>
          </>
        }
      </>

      <Modal isOpen={isOpen}>
        <ModalHeader className='center'>
          {idvideo ? '¿Eliminar video?' : ' ¿Eliminar la seccion y todo su contenido?'}
        </ModalHeader>
        <ModalFooter>
          {idvideo ?
            <>
              < Button color="secondary" onClick={eliminaVidBD}>Eliminar</Button>
              < Button color="secondary" onClick={abrirModalELimina}>Cerrar</Button>
            </>
            :
            <>
             < Button color="secondary" onClick={eliminaSecBD}>Eliminar</Button>
              < Button color="secondary" onClick={abrirModalELimina}>Cerrar</Button>
            </>
        }
        </ModalFooter>
      </Modal>

    </>
  )
}

export default EditarCursoInstructor