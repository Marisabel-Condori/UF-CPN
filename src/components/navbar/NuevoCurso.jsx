//import NuevaSeccion from '../NuevaSeccion'
import {app} from '../Firebase'
import {useForm} from 'react-hook-form'
import React from 'react'

const NuevoCurso = () => {

  const { register, formState:{ errors},handleSubmit} = useForm(); 
  // const [secciones, setSecciones] = useState([])

  const onSubmit = (data, e) => {
    console.log(data);
    e.target.reset()

    // para input tipo file
    const storage = app.storage().register();
    const fileRef = storage.child(data.video[0].name);
    fileRef.put(data.video[0].then(()=>{
      console.log('subiendo video....')
    }))
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
        <input type="file" 
        { ...register('video',{ 
          required:{value:true, message:'El video es requerido'}})
        }
        className='form-control-file' name='video' />
        {errors.video&& <div className='alert alert-danger mt-1 p-1'>{errors.video.message}</div>}

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