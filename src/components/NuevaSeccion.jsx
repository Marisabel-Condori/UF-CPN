import React from 'react'

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {storage} from "./Firebase"

const NuevaSeccion = () => {
  const [progress, setProgress] = React.useState(0)

  const formHandler = (e)=>{
    e.preventDefault();
    const file = e.target[0].files[0]
    console.log('*******************')
    uploadFiles(file)
  };

  const uploadFiles = (file)=>{
    if(!file) return;
    const storageRef = ref(storage, `/files/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on("state_changed", (snapshot)=>{
      const prog = Math.round(snapshot.bytesTransferred / snapshot.totalBytes)*100
    
      setProgress(prog)
    },
    (err) => console.log(err),
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((url)=> console.log(url))
    })
  }

  return (
    <div onSubmit={formHandler}>
      {/* <form onSubmit={formHandler}> */}
        <div className="form-group">
          <label >Seccion 1:</label>
          <input type="text" className="form-control" placeholder="Ingresa titulo de la seccion"/>
          <input type="file" className='form-control-file my-1' />
          <button type='submit' className='btn btn-light'>Subir video</button>
        </div>

        <div className='form-group'>
          <button type="button" className="btn btn-outline-dark ml-5 mr-2">+ video</button>
          <button type="button" className="btn btn-outline-dark ">+ recurso</button> 
        </div>
      {/* </form> */}
      <h6>Upload................. {progress}%</h6>

    </div>
  )
}

export default NuevaSeccion