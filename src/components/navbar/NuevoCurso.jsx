import {useForm} from 'react-hook-form'

import React from 'react'

const NuevoCurso = () => {

  const { register, formState:{errors},handleSubmit} = useForm(); 
  // const [formFields, setFormFields] = useState([])

  const onSubmit = (data) => {
    console.log(data);
  }
  
  return (
    <div>
        <h1>Nuevo Curso</h1>

    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label >Titulo del curso</label>
        <input type="text" {...register('titulo', { required:true} )} 
          className="form-control" placeholder="Ingresa titulo del curso"/>
          {errors.titulo?.type==='required'&&<p>nombre es requerido MEJORAR</p>}
      </div>
      <div className="form-group">
        <label>Descripcion del Curso</label>
        <textarea {...register('descripcion', { required:true})} className="form-control" rows="3"></textarea>
      </div>
      <div className="form-group">
        <label >Requisitos del curso</label>
        <textarea {...register('requisitos', { required:true})} className="form-control" rows="3"></textarea>
      </div>
      <div className="form-group">
        <label>Categoria</label>
        <select {...register('categoria', { required:true})} className="form-control" id="exampleFormControlSelect1">
          <option>Informatica</option>
          <option>Matematica</option>
          <option>Biologia</option>
          <option>Fisica</option>
          <option>Quimica</option>
          <option>Estadistica</option>
        </select>
      </div>
      <div className="form-group">
        <label >Seccion 1:</label>
        <input type="text"  className="form-control" placeholder="Ingresa titulo de la seccion"/>
        <button type="button" className="btn btn-outline-dark mt-2 mr-5">+ video</button>
        <button type="button" className="btn btn-outline-dark mt-2">+ recurso</button> 
      </div>

      <input type="submit" value={"enviar"} />

      <div className="form-group">
        <button type="button" className="btn btn-light">+ Seccion</button>
        
        
      </div>


  
    </form>
    </div>
  )
}

export default NuevoCurso