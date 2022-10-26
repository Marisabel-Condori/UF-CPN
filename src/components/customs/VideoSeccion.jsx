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
  const uploadFiles = (file)=>{
    if(!file) return;
    const storageRef = ref(storage, `/files/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on("state_changed", (snapshot)=>{
      const prog = Math.round((snapshot.bytesTransferred*100)/snapshot.totalBytes)
      setProgress(prog)
    },
    (err) => console.log(err),
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((url)=> console.log(url))
    })
  }
  return (
    <div className="card m-3">
        <div className="card-body">
            <label>Titulo del video: </label>
            <input 
                type="text" 
                name='tituloVideo' className="form-control" placeholder="Ingresa titulo del video"
            />
            <label className='mt-2'>Video: </label>
            <div className='form-group mt-1'>
                <input type="file" className='form-control-file' name='video' onChange={onChange}/>
                {/* //// SOLUCIONAR EL MENSAJE DE ALERTA******
                { ...register('video',{ 
                required:{value:true, message:'El video es requerido'}})
                }
                {errors.video&& <div className='alert alert-danger mt-1 p-1'>{errors.video.message}</div>} */}
                <h5>Progreso de carga... {progress}%</h5>
            </div>
            <input type="submit" value={"+ recurso del video"} />

        </div>
    </div>
  )
}

export default VideoSeccion