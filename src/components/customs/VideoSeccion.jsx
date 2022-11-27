import React, { useState } from 'react'
import shortid from "shortid";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../Firebase";

import { Apiurl } from '../../api/UsuariosApi'
import axios from 'axios'

const VideoSeccion = ({ idCurso, nomSeccion, functionCambiaIdSec }) => {

  const IDcurso = idCurso
  const NOMBREseccion = nomSeccion

  const [video, setVideo] = useState('')
  const [link, setLink] = useState('')
  const [listaVideos, setListaVideos] = useState([])
  const [progress, setProgress] = useState(0)

  const [idSeccion, setIdSeccion] = useState(-1)  

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
    e.preventDefault()
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
    console.log('prueba 2 => ' + idSeccion);
  }
  const eliminarTarea = id => {
    console.log(id)
    const arrayFiltrado = listaVideos.filter(item => item.id !== id)
    setListaVideos(arrayFiltrado)
  }

  const enviaBD = async () => {
    console.log('lista de videos y enviar a la bd ')
    console.log(listaVideos)
    if (idSeccion === -1) {
      console.log('NO existe id Seccion POST')
      await registraSeccion(IDcurso, NOMBREseccion)
    } else {
      /*****************PUT***************** */
      console.log('...PUT SECCION....' + idSeccion)
    }
    if (idSeccion !== -1) {
      console.log('condicion seccion dist -1, muestra idseccion CORRECTO ' + idSeccion);
    }
    console.log('prueba 4. => ' + idSeccion);
  }
  /************************************************************************************************************ */
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
  /********** INGRESA DATOS VIDEO A BD CONDICION PARA ID CORRECTO *******/
  const enviaVIDEObd = () => {
    if (idSeccion !== -1) {
      console.log('id correcto => ' + idSeccion);
      for (let index = 0; index < listaVideos.length; index++) {
        const item = listaVideos[index];
        console.log('video for ' + index)
        console.log('nombre video: ' + item.nombreVideo + ' link video: ' + item.linkVideo)
        registraVideo(item.nombreVideo, item.linkVideo, idSeccion)
      }
    }
  }
  
  enviaVIDEObd()
  
  /************************************************************************************************** */
  /*****************REGISTRO SECCION - POST***************** */
  const registraSeccion = async (idCur, nombreSec) => {
    console.log('prueba 3. => ' + idSeccion);
    await adicionaSeccion(idCur, nombreSec)
    console.log('prueba 2. => ' + idSeccion);
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
    console.log('prueba 1. => ' + idSeccion);
  }


  /**************EXISTE ID SECCION**********************/
  const existeIdSeccion = async () => {
    let url = Apiurl + "seccionbyid"
    let obtID = await axios.get(url, {
      params: { idseccion: idSeccion }
    })
    console.log('!!!!! OBTIENE ID SECCION !!!!!!')
    console.log(obtID.data)
    return obtID.data
  }


  return (
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
            <button className="btn btn-info btn-block" type="submit">Agregar archivo</button>
          </form>
        </div>
      </div>
      {/*************************************************************** */}

      <ul className="list-group">
        {
          listaVideos.map(item => (
            <li className="list-group-item" key={item.id}>
              <span className="float-left">{item.nombreVideo}</span>
              <button className="btn btn-danger btn-sm float-right mx-2"
                onClick={() => eliminarTarea(item.id)}>
                Eliminar
              </button>

              <button className="btn btn-warning btn-sm float-right ml-2">Editar</button>
            </li>
          ))
        }
      </ul>
      <center>
        <button disabled={IDcurso && listaVideos.length > 0 ? false : true} type='button' className='btn btn-success mt-4' onClick={enviaBD}> Guardar Datos Seccion</button>
      </center>
    </>
  )
}

export default VideoSeccion