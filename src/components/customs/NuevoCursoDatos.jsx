import React, { useCallback } from 'react'

import { useForm } from 'react-hook-form'

// import { Apiurl } from '../../api/UsuariosApi'
// import axios from 'axios'
// import SeccionCurso from './SeccionCurso'

const NuevoCursoDatos = () => {

    const { register, formState: { errors }, handleSubmit } = useForm();

    const onSubmit = (data, e) => {
        console.log(data);
        e.target.reset()
        // registraCurso(data)
    }

    //   /************** REGISTRO CURSO - POST****************/
    //   const registraCurso = useCallback( async (data)=>{
    //         adicionaCurso(data)   
    //   }, [])
    //   /********** INGRESA DATOS CURSO A BD *******/
    //   const adicionaCurso= (data)=>{
    //     console.log('///ENVIADOOOOO CURSOOOOO///')
    //     let url = Apiurl + "curso"
    //     axios.post(url, null, {
    //         params:{titulo_curso:data.tituloCurso, descripcion_curso: data.descripcion, requisitos: data.requisitos}
    //     },)
    //     .then((response) =>{
    //         console.log('++++++++++++ response')
    //         console.log(response)
    //         }).catch(err => console.log(err))
    // }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label >Titulo del curso</label>
                    <input
                        type="text"
                        {...register('tituloCurso', {
                            required: { value: true, message: 'El titulo es requerido' }
                        })
                        }
                        name='tituloCurso' className="form-control" placeholder="Ingresa titulo del curso"
                    />
                    {errors.tituloCurso && <div className='alert alert-danger mt-1 p-1'>{errors.tituloCurso.message}</div>}
                </div>

                <div className="form-group">
                    <label>Descripcion del Curso</label>
                    <textarea
                        {...register('descripcion', {
                            required: { value: true, message: 'La descripcion es requerida' }
                        })
                        }
                        name='descripcion' className="form-control" rows="3"
                    />
                    {errors.descripcion && <div className='alert alert-danger mt-1 p-1'>{errors.descripcion.message}</div>}
                </div>

                <div className="form-group">
                    <label >Requisitos del curso</label>
                    <textarea
                        {...register('requisitos', {
                            required: { value: true, message: 'Los requisitos son requeridos' }
                        })
                        }
                        name='requisitos' className="form-control" rows="3"
                    />
                    {errors.requisitos && <div className='alert alert-danger mt-1 p-1'>{errors.requisitos.message}</div>}

                </div>

                <div className="form-group">
                    <label>Categoria</label>
                    <select
                        {...register('categoria')}
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
                <button type='onSubmit' className='btn btn-success'> Guardar Datos </button>
            </form>

        </>
    )
}

export default NuevoCursoDatos