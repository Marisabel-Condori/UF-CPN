import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {useForm} from 'react-hook-form'
import {React, useState} from 'react'
import { storage } from "../Firebase";

const NuevoCurso = () => {

  const [progress, setProgress] = useState(0)

  const { register, formState:{ errors},handleSubmit} = useForm(); 

  const onSubmit = (data, e) => {
    console.log(data);
    e.target.reset()
  }

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
    <div>
        <h1>Nuevo Curso</h1>

    <form onSubmit={handleSubmit(onSubmit)}>

      <div className="form-group">
        <label >Titulo del curso</label>
        <input 
          type="text" 
          { ...register('tituloCurso',{ 
            required:{value:true, message:'El titulo es requerido'}})
          } 
          name='tituloCurso' className="form-control" placeholder="Ingresa titulo del curso"
        />

        {errors.tituloCurso&& <div className='alert alert-danger mt-1 p-1'>{errors.tituloCurso.message}</div>}
        
      </div>

      <div className="form-group">
        <label>Descripcion del Curso</label>
        <textarea 
          {...register('descripcion', { 
            required:{value:true, message: 'La descripcion es requerida'}})
          } 
          name='descripcion' className="form-control" rows="3"
        />
        {errors.descripcion&& <div className='alert alert-danger mt-1 p-1'>{errors.descripcion.message}</div>}
      </div>

      <div className="form-group">
        <label >Requisitos del curso</label>
        <textarea {...register('requisitos', { 
          required:{value:true, message:'Los requisitos son requeridos'}})
          } 
          name= 'requisitos' className="form-control" rows="3"
        />
        {errors.requisitos&& <div className='alert alert-danger mt-1 p-1'>{errors.requisitos.message}</div>}

      </div>

      <div className="form-group">
        <label>Categoria</label>
        <select 
          {...register('categoria')  } 
          name='categoria' className="form-control">
          
          <option>Informatica</option>
          <option>Matematica</option>
          <option>Biologia</option>
          <option>Fisica</option>
          <option>Quimica</option>
          <option>Estadistica</option>
        </select>
      </div>
      
      <div className='form-group'>
        <input type="file" className='form-control-file' name='video' onChange={onChange}/>
        {/* //// SOLUCIONAR EL MENSAJE DE ALERTA******
        { ...register('video',{ 
          required:{value:true, message:'El video es requerido'}})
        }
        
        {errors.video&& <div className='alert alert-danger mt-1 p-1'>{errors.video.message}</div>} */}
        <h3>Upload{progress}%</h3>
      </div>

      <div className="form-group">
        <button type="button" className="btn btn-light">+ Seccion</button>
      </div>
        
        
      <input type="submit" value={"enviar"} />


  
    </form>
    </div>
  )
}

export default NuevoCurso