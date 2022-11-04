import React, { useState } from 'react'

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../Firebase";

const VideoSeccion = () => {
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
  return (
    <div className="card m-3">
      <div className="card-body">
        <div className='row'>
          <div className='col-md-3'>  <label>Titulo del video: </label> </div>
          <div className='col-md-9'>
            <input
              type="text"
              name='tituloVideo' className="form-control" placeholder="Ingresa titulo del video"
            />
          </div>
        </div>

        <div className='row'>
          <div className='col-md-3'>  <label className='mt-2'>Video: </label> </div>
          <div className='form-group mt-3'>
            <div className='col-md-12'>
              <input type="file" className='form-control-file' name='video' onChange={onChange} />
            </div>
            {/* //// SOLUCIONAR EL MENSAJE DE ALERTA******
                { ...register('video',{ 
                required:{value:true, message:'El video es requerido'}})
                }
                {errors.video&& <div className='alert alert-danger mt-1 p-1'>{errors.video.message}</div>} */}
          </div>
        </div>
          <h5>Progreso de carga... {progress}%</h5>
        {/* <input type="submit" value={"+ recurso del video"} /> */}

      </div>
    </div>
  )
}

export default VideoSeccion