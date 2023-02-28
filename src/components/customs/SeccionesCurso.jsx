import React, { useState, useEffect } from 'react'
import shortid from "shortid";

import { Apiurl } from '../../api/UsuariosApi'
import axios from 'axios'

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../Firebase";

const SeccionesCurso = ({ idCursoP }) => {
  console.log('dato recibido desde el padre: ' + idCursoP);

  const [idSeccion, setIdSeccion] = useState(null)
  const [nombreSeccion, setNombreSeccion] = useState('')
  const [seccionLista, setSeccionLista] = useState([])

  const [video, setVideo] = useState('')
  const [link, setLink] = useState('')
  const [listaVideos, setListaVideos] = useState([])
  const [progress, setProgress] = useState(0)

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
  const agregarRecurso = e => {
    if (!video.trim()) {
      console.log('titulo video vacio')
      return
    }
    if (link) {
      console.log('tiene datos... a;adir ' + link)
      console.log('imprimiendo nombre video ' + video);
      setListaVideos([
        ...listaVideos, { id: shortid.generate(), nombreVideo: video, linkVideo: link }
      ])
    } else { console.log('no hay archivo') }
    setVideo('')
    setLink('')
    setProgress(0)
  }
  const eliminarTarea = id => {
    console.log(id)
    const arrayFiltrado = listaVideos.filter(item => item.id !== id)
    setListaVideos(arrayFiltrado)
  }

  // ----------------------  SECCION  ----------------------------------
  const agregarSeccion = async e => {
    e.preventDefault()
    if (!nombreSeccion.trim()) {
      console.log('nombre seccion vacio')
      return
    }
    if (idSeccion === null) {
      console.log('NO existe id Seccion POST')
      await registraSeccion(idCursoP, nombreSeccion)
    } else {
      /*****************PUT***************** */
      console.log('...PUT SECCION....' + idSeccion)
    }
  }
  /************************************************************************************************** */
  /********** INGRESA DATOS VIDEO A BD *******/
  const adicionaVideo = (nomVid, link, idSec) => {
    console.log('///ENVIADOOOOO VIDEO///')
    let url = Apiurl + "video"
    axios.post(url, null, {
      params: { titulo: nomVid, urlvideo: link, idseccion: idSec }
    },)
      .then((response) => {
        console.log('++++++++++++ response VIDEO')
        console.log(response)
        console.log('id video bd=> ' + response.data.insertId)
        //setIdSeccion(response.data.insertId)
      }).catch(err => console.log(err))
  }
  /*****************REGISTRO VIDEO - POST***************** */
  const registraVideo = async (nomVid, link, idSec) => {
    adicionaVideo(nomVid, link, idSec)
  }
  /*****************REGISTRO VIDEO - POST***************** */
  useEffect(() => {
    if (idSeccion) {
      console.log('mostrando si ya seteo el IDSECCION ' + idSeccion);
      for (let index = 0; index < listaVideos.length; index++) {
        const item = listaVideos[index];
        console.log('video for ' + index)
        console.log('nombre video: ' + item.nombreVideo + ' link video: ' + item.linkVideo)
        registraVideo(item.nombreVideo, item.linkVideo, idSeccion)
      }
      setSeccionLista([...seccionLista, { id: idSeccion, nomSeccion: nombreSeccion, objVideos: listaVideos }])
      setNombreSeccion('')
      setIdSeccion(null)
      setListaVideos([])
    }
  }, [idSeccion])


  /************************************************************************************************** */
  /*****************REGISTRO SECCION - POST***************** */
  const registraSeccion = async (idCur, nombreSec) => {
    await adicionaSeccion(idCur, nombreSec)
  }
  /********** INGRESA DATOS SECCION A BD *******/
  const adicionaSeccion = async (idCur, nombreSec) => {
    console.log('///ENVIADOOOOO SECCION///')
    let url = Apiurl + "seccion"
    await axios.post(url, null, {
      params: { idcurso: idCur, nombre_seccion: nombreSec }
    },)
      .then((response) => {
        console.log('++++++++++++ response SECCION')
        console.log(response)
        console.log('id sec bd => ' + response.data.insertId)
        setIdSeccion(response.data.insertId)
      }).catch(err => console.log(err))
  }
  /************************************************************************************************** */

  /************************************************************************************************** */
  const eliminarSeccion = id => {
    console.log('mostrando index eliminar secciooooooooooooon' + id)
    const arrayFiltrado = seccionLista.filter(seccion => seccion.id !== id)
    setSeccionLista(arrayFiltrado)
  }
  /************************************************************************************************** */


  return (
    <>
      <h5>dato recibido desde el padre {idCursoP}</h5>
      {/**********************PETICION DE DATOS***********************/}
      <div className="card" >
        <div className="card-body">
          {/* <form onSubmit={agregarSeccion}> */}
          <div className='row'>
            <div className='col-md-2'> <label>Nombre Seccion</label> </div>
            <div className='col-md-10'>
              {/* ---------------- titulo seccion */}
              <input
                type="text" className="form-control" placeholder="Ingresa titulo de la seccion"
                value={nombreSeccion} onChange={e => setNombreSeccion(e.target.value)}
              />
            </div>
          </div>

          {/********************** PETICION DE DATOS VIDEO ***********************/}
          <center>
            <h3>Agregar Recurso o Video</h3>
            <div className='col-md-7'>
              {/* <VideoSeccion idCurso={idCursoP} nomSeccion={nombreSeccion} /> */}
              <>
                {/**********************PETICION DE DATOS***********************/}
                <div className="card m-3">
                  <div className="card-body">
                    <form onSubmit={agregarRecurso}>
                      <div className='row'>
                        <div className='col-md-2'>  <label>Titulo: </label> </div>
                        <div className='col-md-10'>
                          <input
                            type="text" className="form-control" placeholder="Ingresa titulo del video o recurso"
                            value={video} onChange={e => setVideo(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className='row'>
                        <div className='col-md-2'>  <label className='mt-2'>Archivo: </label> </div>
                        <div className='col-md-9 mt-3'>
                          <div className='form-group'>
                            <input type="file" className='form-control-file' onChange={onChange} />
                          </div>
                          {/* //// SOLUCIONAR EL MENSAJE DE ALERTA****** */}
                        </div>
                      </div>
                      <div className="progress mb-2">
                        <div className="progress-bar progress-bar-striped progress-bar-animated " style={{ width: `${progress}%` }}>{progress}%</div>
                      </div>
                      <button disabled={link ? false : true} className={link ? 'btn btn-info btn-block' : 'btn btn-secondary btn-block'} type="button" onClick={agregarRecurso}>Agregar archivo</button>
                    </form>
                  </div>
                </div>
                {/*************************************************************** */}

                <ul className="list-group">
                  {listaVideos.map(item => (
                    <li className="list-group-item" key={item.id}>
                      <span className="float-left">{item.nombreVideo}</span>
                      <button className="btn btn-warning btn-sm float-right ml-2">Editar</button>
                      <button className="btn btn-danger btn-sm float-right mx-2"
                        onClick={() => eliminarTarea(item.id)}>
                        Eliminar
                      </button>
                    </li>


                  ))
                  }
                </ul>
              </>
            </div>
          </center>

          <center>
            <button disabled={idCursoP && listaVideos.length > 0 ? false : true} className='btn btn-success mt-4' onClick={agregarSeccion}> Guardar Seccion</button>
            {/* <button  className='btn btn-success mt-4' onClick={agregarSeccion}> Guardar Seccion</button> */}
            {/* <button disabled={idCursoP && listaVideos.length > 0 ? false : true} type='button' className='btn btn-success mt-4' onClick={enviaBD}> Guardar Datos Seccion</button> */}
          </center>
          {/* </form> */}

        </div>
      </div>
      {/*************************************************************** */}

      <ul className=" list-group">
        {
          seccionLista.map(item => (
            <li className="list-group-item my-2" key={item.id}>
              <h6>IDSECCION : {item.id}</h6>
              <span >Nombre Seccion: {item.nomSeccion}</span>
              <div className='ml-5'>
                <ul className="list-group my-2">
                  {
                    item.objVideos.map(item => (
                      <li className="list-group-item mr-5" key={item.id}>
                        <span className="float-left">{item.nombreVideo}</span>
                      </li>
                    ))
                  }
                </ul>
              </div>
              <button className='btn btn-danger btn-sm float-right mx-2' onClick={() => eliminarSeccion(item.id)}>Eliminar seccion</button>
              <button className="btn btn-warning btn-sm float-right ml-2">Editar Seccion</button>

            </li>
            // <button type="button" className="btn btn-success mt-2" onClick={() => agregaNuevaSeccion(seccion.id)}>+ Seccion</button>
          ))
        }
      </ul>
    </>
  )
}

export default SeccionesCurso