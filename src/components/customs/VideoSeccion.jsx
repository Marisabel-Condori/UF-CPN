import React, { useState } from 'react'
import shortid from "shortid";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../Firebase";

const VideoSeccion = () => {

  const [video, setVideo] = useState('')
  const [link, setLink] = useState('')
  const [listaVideos, setListaVideos] = useState([])

  const [progress, setProgress] = useState(0)

  const onChange = async e => {
    const file = e.target.files[0]
    console.log('*******************')
    await uploadFiles(file)
  }
  const uploadFiles = async file => {
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
        //...listaVideos, { id: shortid.generate(), nombreVideo: video }
        ...listaVideos, { id: shortid.generate(), nombreVideo: video, linkVideo: link }
      ])
      console.log('imprimiendo lista de videos completa')
      console.log(listaVideos)
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
                  {/* <input type="file" className='form-control-file' onChange={onChange} /> */}
                  <input type="file" className='form-control-file' onChange={onChange} />
                </div>
                {/* //// SOLUCIONAR EL MENSAJE DE ALERTA****** */}
              </div>
            </div>
            <div className="progress mb-2">
              <div className="progress-bar progress-bar-striped progress-bar-animated " style={{width:`${progress}%`}}>{progress}%</div>
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

      {/* <center>
        <button type='submit' className='btn btn-success mt-4' onClick={procesarDatos}> Guardar Datos Seccion</button>
      </center> */}
      <center>
        <button type='submit' className='btn btn-success mt-4' > Guardar Datos Seccion</button>
      </center>
    </>
  )
}

export default VideoSeccion