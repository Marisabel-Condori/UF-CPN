import React from 'react'
import { useForm } from 'react-hook-form'
// import { useState } from 'react'
import Recurso from './Recurso'
import VideoSeccion from './VideoSeccion'

const SeccionCurso = () => {

  // const [seccion, setSeccion] = useState('')

  // const agregaNuevaSeccion = e =>{
  //   e.preventDefault()
  //   // preguntar por campos vacios: if(!dato.trim()){seterror('escriba algo) return}
  //   console.log('adicionando seccioooooooon')
  //   setSeccion([...seccionLista, <SeccionCurso/>])
  // }

  // const {register, formState:{errors}, handleSubmit} = useForm()

  const onSubmit = (data, e) => {
    console.log('seccioooooooooooooooooooon')
    console.log(data)
    e.target.reset()
  }

  return (
    <div>
      {/* //   <form onSubmit={handleSubmit(onSubmit)}> */}
      <div className="card" >
        <div className="card-body">

          <div className='row'>
            <div className='col-md-2'> <label>Nombre Seccion</label> </div>
            <div className='col-md-10'>
              <input
                type="text"
                //  { ...register('tituloSeccion',{ 
                //    required:{value:true, message:'El titulo seccion es requerido'}})
                //  } 
                name='tituloSeccion' className="form-control" placeholder="Ingresa titulo de la seccion"
              />
            </div>
          </div>

          <VideoSeccion />
          <Recurso />
          <input type="submit" value={"+ video"} className='m-2' />
          <input type="submit" value={"+ recurso"} />
        </div>
      </div>
      {/* //   </form> */}
    </div>
  )
}

export default SeccionCurso