import {useForm} from 'react-hook-form'

import SeccionCurso from "../customs/SeccionCurso";

const NuevoCurso = () => {
  // SETCONTEXT FORMULARIO

  const { register, formState:{ errors},handleSubmit} = useForm(); 

  const onSubmit = (data, e) => {
    console.log(data);
    e.target.reset()
  }

  

  
  
  return (
    <div className="container">
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
          
          <option>Elige una Categoria</option>
          <option>Informatica</option>
          <option>Matematica</option>
          <option>Biologia</option>
          <option>Fisica</option>
          <option>Quimica</option>
          <option>Estadistica</option>
        </select>
      </div>
      {/******************* SECCION ************/}
      <SeccionCurso/>
      

      <div className="form-group">
        <button type="button" className="btn btn-light">+ Seccion</button>
      </div>

      <input type="submit" value={"enviar"} className='mx-4'/>
      <input type="submit" value={"Vista Previa"} />


  
    </form>
    </div>
  )
}

export default NuevoCurso