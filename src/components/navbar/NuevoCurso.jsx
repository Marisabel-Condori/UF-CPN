import React from 'react'
import NuevaSeccion from '../NuevaSeccion'

const NuevoCurso = () => {

  const seccion1 = false
  console.log('**************** val seccion1 '+seccion1)
  return (
    <div>
        <h1>Nuevo Curso</h1>

    <form>
      <div className="form-group">
        <label >Titulo del curso</label>
        <input type="text" className="form-control" placeholder="Ingresa titulo del curso"/>
      </div>
      <div className="form-group">
        <label>Descripcion del Curso</label>
        <textarea className="form-control" rows="3"></textarea>
      </div>
      <div className="form-group">
        <label >Requisitos</label>
        <textarea className="form-control" rows="3"></textarea>
      </div>
      <div className="form-group">
        <label for="exampleFormControlSelect1">Categoria</label>
        <select className="form-control" id="exampleFormControlSelect1">
          <option>Informatica</option>
          <option>Matematica</option>
          <option>Biologia</option>
          <option>Fisica</option>
          <option>Quimica</option>
          <option>Estadistica</option>
        </select>
      </div>

      {/* <div className="form-group">
        <button type="button" className="btn btn-light" onClick={<NuevaSeccion/>}>+ Seccion</button>
        {seccion1===true}
        {console.log('---------------- valor '+seccion1)}
        
      </div> */}


  
    </form>
    </div>
  )
}

export default NuevoCurso