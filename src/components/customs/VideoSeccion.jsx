import React, { useState } from 'react'
import shortid from "shortid";

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../Firebase";

const VideoSeccion = () => {

  const [video, setVideo] = React.useState('')
  const [listaVideos, setListaVideos] = React.useState([])

  const [progress, setProgress] = useState(0)

  const onChange = (e) => {
    const file = e.target.files[0]
    console.log('*******************')
    uploadFiles(file)
  }
  const uploadFiles = (file) => {
    if (!file) return;
    const storageRef = ref(storage, `/files/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on("state_changed", (snapshot) => {
      const prog = Math.round((snapshot.bytesTransferred * 100) / snapshot.totalBytes)
      setProgress(prog)
    },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => console.log(url))
      })
  }
  const agregarRecurso = e => {
    e.preventDefault()
    if (!video.trim()) {
      console.log('elemento vacio')
      return
    }
    console.log(video)
    setListaVideos([
      ...listaVideos, { id: shortid.generate(), nombreVideo: video }
    ])
    setVideo('')
  }
  const eliminarTarea = id => {
    console.log(id)
    const arrayFiltrado = listaVideos.filter(item => item.id !== id)
    setListaVideos(arrayFiltrado)
  }
  return (
    <>
    <h2>dddddddddddd</h2>
    <div className='row'>
      <ul className="list-group">
        {
          listaVideos.map(item => (
            <li className="list-group-item" key={item.id}>
              <span className="lead">{item.nombreVideo}</span>
              <button className="btn btn-danger btn-sm float-end mx-2"
                onClick={() => eliminarTarea(item.id)}>
                Eliminar
              </button>

              <button className="btn btn-warning btn-sm float-end">Editar</button>
            </li>
          ))
        }
      </ul>
      </div>

      {/**********************PETICION DE DATOS***********************/}
      <div className="card m-3">
        <div className="card-body">
          <form onSubmit={agregarRecurso}></form>
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
          <h5>Progreso de carga... {progress}%</h5>
          <button className="btn btn-info btn-block" type="submit">Agregar archivo</button>
        </div>
      </div>
    </>
  )
}

export default VideoSeccion