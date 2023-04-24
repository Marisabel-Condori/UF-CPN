import React, { useState, useEffect, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { Apiurl } from '../../api/UsuariosApi'
import axios from 'axios'
import { Alert } from 'reactstrap'

import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../Firebase";

const NuevoCursoDatos = ({ functionP, idPersona }) => {
    const [idChild, setIdChild] = useState(null)
    const [error, setError] = useState(null)
    const [deshabilitarBoton, setDeshabilitarBoton] = useState(false)
    const [linkPortada, setLinkPortada] = useState('')
    const [progress, setProgress] = useState(0)

    const [disabled, setDisabled] = useState(false);

    ///////// foto portada ////////////////////////
    const onChange = e => {
        const file = e.target.files[0]
        console.log('********PORTADA***********')
        console.log(file.name);
        uploadFiles(file)
    }
    const uploadFiles = file => {
        if (!file) return;
        const storageRef = ref(storage, `/files/${file.name}`)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on("state_changed", (snapshot) => {
            const prog = Math.round((snapshot.bytesTransferred * 100) / snapshot.totalBytes)
            setProgress(prog)
        },
            (err) => console.log(err),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log(url)
                    setLinkPortada(url)
                })
            })
    }
    ////////////////////////////////////////////////

    useEffect(() => {
        if (idChild) {
            console.log('mostrnado idchild useEfect: ' + idChild);
            functionP(idChild)
        }
    }, [idChild])

    const { register, formState: { errors }, handleSubmit } = useForm();

    const onSubmit = (data, e) => {
        setProgress(0)
        console.log(data);
        //  e.target.reset()
        if (data.categoria === 'Elige una Categoria') {
            setError('Debes elegir una categoria')
            return
        }
        setDisabled(true)
        setDeshabilitarBoton(true)
        registraCurso(data, linkPortada)
        setError(null)
    }

    /************** REGISTRO CURSO - POST****************/
    const registraCurso = useCallback(async (data, linkPort) => {
        adicionaCurso(data, linkPort)
    }, [])
    /********** INGRESA DATOS CURSO A BD *******/
    const adicionaCurso = (data, linkPortada) => {
        console.log('liiiiiiiiiiiiiiiink BD');
        console.log(linkPortada);
        console.log('///ENVIADOOOOO CURSOOOOO///')
        let url = Apiurl + "curso"
        axios.post(url, null, {
            params: { titulo_curso: data.tituloCurso, descripcion_curso: data.descripcion, requisitos: data.requisitos, categoria: data.categoria, portada_curso: linkPortada, idInstructor: idPersona }
        },)
            .then((response) => {
                console.log('++++++++++++ response')
                console.log(response)
                console.log('id => ' + response.data.idC)
                setIdChild(response.data.idC)
            }).catch(err => console.log(err))
    }
// d                       VER disabled
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <div className="row">
                        <div className="col-md-2"> <label >Titulo del curso</label>  </div>
                        <div className="col-md-10">
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
                    </div>
                </div>

                <div className="form-group">
                    <div className="row">
                        <div className="col-md-2"> <label>Descripcion del Curso</label>  </div>
                        <div className="col-md-10">
                            <textarea disabled={disabled}
                                {...register('descripcion', {
                                    required: { value: true, message: 'La descripcion es requerida' }
                                })
                                }
                                name='descripcion' className="form-control" rows="3" 
                            />
                            {errors.descripcion && <div className='alert alert-danger mt-1 p-1'>{errors.descripcion.message}</div>}
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <div className="row">
                        <div className="col-md-2"><label >Requisitos del curso</label></div>
                        <div className="col-md-10">
                            <textarea disabled={disabled}
                                {...register('requisitos', {
                                    required: { value: true, message: 'Los requisitos son requeridos' }
                                })
                                }
                                name='requisitos' className="form-control" rows="3"
                            />
                            {errors.requisitos && <div className='alert alert-danger mt-1 p-1'>{errors.requisitos.message}</div>}
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <div className="row">
                        <div className="col-md-2"> <label>Categoria</label>   </div>
                        <div className="col-md-10">
                            <select disabled={disabled}
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
                            {error && <Alert color="danger">  {error}  </Alert>}
                        </div>
                    </div>
                </div>

                <div className="form-group">
                    <div className="row">
                        <div className="col-md-2"><label >Portada del Curso</label></div>
                        <div className="col-md-10">
                            <input disabled={disabled}
                                {...register('portada', {
                                    required: { value: true, message: 'La portada es requerida' }
                                })
                                }
                                onChange={onChange} type="file" name='portada' className="form-control-file" placeholder="Adjunte imagen"
                            />
                            {errors.portada && <div className='alert alert-danger mt-1 p-1'>{errors.portada.message}</div>}
                            <div className="progress my-2">
                                <div className="progress-bar progress-bar-striped progress-bar-animated " style={{ width: `${progress}%` }}>{progress}%</div>
                            </div>
                        </div>
                    </div>
                </div>

                <center>
                    <button disabled={deshabilitarBoton ? true : false} type='onSubmit' className='btn btn-success mb-4'> Guardar Datos Curso</button>
                </center>
            </form>

        </>
    )
}

export default NuevoCursoDatos