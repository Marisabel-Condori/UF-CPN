
// import { useCallback, useState } from 'react'
// import '../css/Login.css'

// import { Apiurl } from '../../api/UsuariosApi'

// import axios from 'axios'
// import Profile from './Profile'
// import { useEffect } from 'react'

// const Login = () => {
//     const [nombre, setNombre] = useState('')
//     const [apellidos, setApellidos] = useState('')
//     const [email, setEmail] = useState('')
//     const [pass, setPass] = useState('')
//     const [depto, setDepto] = useState('')

//     const [error, setError] = useState(null)
//     const [esRegistro, setEsRegistro] = useState(true)

//     const [idPersona, setIdPersona] = useState('')
//     const enviaIdEstudiante = (idPerEstudiante)=>{
//         let url = Apiurl + "estudiante"
//         axios.post(url, null, {
//           params: { idpersona: idPerEstudiante }
//         })
//     }
//     useEffect(()=>{
//         if (idPersona) {
//             console.log('id persona en registro usuario');
//             console.log(idPersona);
//             enviaIdEstudiante(idPersona)
//         }
//     })

//     const procesarDatos = async e => {
//         e.preventDefault()
//         if (!email.trim()) {
//             console.log('**** AQUI VALIDAR email@gmail.com *****IF***')
//             console.log('email vacio')
//             setError('email vacio')
//             return
//         }
//         if (!pass.trim()) {
//             console.log('password vacio')
//             setError('password vacio')
//             return
//         }
//         if (esRegistro) {
//             if (!nombre.trim()) {
//                 console.log('nombre vacio')
//                 setError('nombre vacio')
//                 return
//             }
//             if (!apellidos.trim()) {
//                 console.log('apellido vacio')
//                 setError('ape vacio')
//                 return
//             }
//             if (pass.length < 8) {
//                 console.log('pass menor a 8 caracteres')
//                 setError('ingrese pass mayor a 8 caracteres')
//                 return
//             }
//         }
//         setError(null)
//         console.log('pasando validaciones')
//         if (esRegistro) {
//             registrar(nombre, pass, apellidos, email)
//         } else { login() }

//         setNombre('')
//         setApellidos('')
//         setEmail('')
//         setPass('')
//         setError('')


//     return (
//         <>
//             <div className="container h-100">
//                 <div className="d-flex justify-content-center h-100">
//                     <div className="user_card">
//                         <div className="d-flex justify-content-center">
//                             <div className="brand_logo_container">
//                                 <img src="https://pbs.twimg.com/profile_images/1264255557986390017/ICFys8Z0_400x400.jpg" className="brand_logo" alt="Logo" />
//                                 <h6 className='mt-3'>
//                                     {esRegistro ? 'registro de usuario' : 'login de acceso'}
//                                 </h6>

//                             </div>
//                         </div>

//                         <div className="d-flex justify-content-center form_container">

//                             {/* *****************FORMULARIO ********************* */}
//                             <form onSubmit={procesarDatos}>
//                                 {
//                                     error && (
//                                         <div className="alert alet-danger">{error}</div>
//                                     )
//                                 }
//                                 <div className="input-group mb-3">
//                                     <div className="input-group-append">
//                                         <span className="input-group-text"><i className="fas fa-user">E</i></span>
//                                     </div>
//                                     {/* --------------------email */}
//                                     <input type="email" className="form-control" placeholder="Email" onChange={e => setEmail(e.target.value)} value={email} />
//                                     {/* ...register('email',{pattern: /^[^\s@]+@[^\s@]+\.[^\s@+$/i]}) 
//                                 {errors.email?.type==='pattern'&&<P>formato incorrecto</P>}*/}
//                                 </div>
//                                 <div className="input-group mb-2">
//                                     <div className="input-group-append">
//                                         <span className="input-group-text"><i className="fas fa-key">P</i></span>
//                                     </div>
//                                     {/* -----------------password */}
//                                     <input type="password" className="form-control input_pass" placeholder="Password" onChange={e => setPass(e.target.value)} value={pass} />
//                                 </div>
//                                 {
//                                     esRegistro && (
//                                         <>
//                                             <div className="input-group mb-3">
//                                                 <div className="input-group-append">
//                                                     <span className="input-group-text"><i className="fas fa-user">N</i></span>
//                                                 </div>
//                                                 {/* --------------------nombres */}
//                                                 <input type="text" className="form-control" placeholder="Nombre" onChange={e => setNombre(e.target.value)} value={nombre} />
//                                             </div>
//                                             <div className="input-group mb-3">
//                                                 <div className="input-group-append">
//                                                     <span className="input-group-text"><i className="fas fa-user">A</i></span>
//                                                 </div>
//                                                 {/* --------------------apellidos */}
//                                                 <input type="text" className="form-control" placeholder="Apellido" onChange={e => setApellidos(e.target.value)} value={apellidos} />
//                                             </div>

//                                             {/* -----------------departamento */}
//                                             <div className="form-group">
//                                                 <label>Departamento:</label>
//                                                 <select className="form-control" onChange={e => setDepto(e.target.value)} value={depto}>
//                                                     <option>La Paz</option>
//                                                     <option>Oruro</option>
//                                                     <option>Potosi</option>
//                                                     <option>Cochabamba</option>
//                                                     <option>Sucre</option>
//                                                     <option>Tarija</option>
//                                                     <option>Pando</option>
//                                                     <option>Beni</option>
//                                                     <option>Santa Cruz</option>
//                                                 </select>
//                                             </div>
//                                         </>
//                                     )
//                                 }

//                                 <div className="form-group">
//                                     {/* mostrando profile prueba */}
//                                     {/* { (!!estaLogueado) &&<Profile/> } */}
//                                     {<Profile />}
//                                     <h3>{idPersona&& idPersona}</h3>
//                                     {/* <h3>..{dataPersona}</h3> */}
//                                     <div className="custom-control custom-checkbox">
//                                         <input type="checkbox" className="custom-control-input" id="customControlInline" />
//                                         <label className="custom-control-label" >Recuerdame</label>
//                                     </div>
//                                 </div>
//                                 <div className="d-flex justify-content-center mt-3 login_container">
//                                     {/* ------------------------------button */}

//                                     {/* <button type="submit" className="btn login_btn" onClick={()=>manejaBoton()} > */}
//                                     <button type="submit" className="btn login_btn">
//                                         {
//                                             esRegistro ? 'Registrarse' : 'Ingresar'
//                                         }
//                                     </button>
//                                 </div>
//                             </form>
//                         </div>

//                         <div className="mt-4">
//                             <div className="d-flex justify-content-center links">
//                                 <button type='button' className='btn btn-info btn-sm btn-block' onClick={() => setEsRegistro(!esRegistro)}>

//                                     {esRegistro ? 'ya estas registrado?' : 'no tienes cuenta?'}
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Login


import React, { useCallback, useEffect, useState } from "react"
import { Alert, Button, Form, FormFeedback, FormGroup, Input, Label, Modal, ModalBody } from "reactstrap"

import axios from "axios"
import { Apiurl } from '../../api/UsuariosApi'
const Login = ({ functionIDpersona }) => {

    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [pass2, setPass2] = useState('')
    const [nombre, setNombre] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [error, setError] = useState(null)

    const [validate, setValidate] = useState(false)
    const [validatePassword, setValidatePassword] = useState(false)
    const [validatePassword2, setValidatePassword2] = useState(false)
    const [validateNombre, setValidateNombre] = useState(false)
    const [validateApellido, setValidateApellido] = useState(false)

    const [esRegistro, setEsRegistro] = useState(true)

    const [idChildPersona, setIdChildPersona] = useState(null)
    useEffect(() => {
        if (idChildPersona) {
            //console.log('mostrnado idchildPersona useEfect: ' + idChildPersona);
            functionIDpersona(idChildPersona)
        }
    }, [idChildPersona])

    //*************** VALIDA CAMPOS - email password******************** */
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    // const validateEmailFun = (e) => {
    //     if (emailRex.test(e.target.value)) {
    //         setValidate(true)
    //     } else {
    //         setValidate(false)
    //     }
    // }
    const validateEmailFun = (e) => {
        setValidate(true)
    }
    const validatePassFun = (e) => {
        if (e.target.value.length > 7) {
            setValidatePassword(true)
        } else {
            setValidatePassword(false)
        }
    }
    const validatePassFun2 = (e) => {
        if (e.target.value.length > 7) {
            setValidatePassword2(true)
        } else {
            setValidatePassword2(false)
        }
    }
    const validateNombreFun = (e) => {
        if (!e.target.value.trim()) {
            setValidateNombre(false)
        } else {
            setValidateNombre(true)
        }
    }
    const validateApellidoFun = (e) => {
        if (!e.target.value.trim()) {
            setValidateApellido(false)
        } else {
            setValidateApellido(true)
        }
    }

    //********************* MODAL ********************/
    const [isOpen, setIsOpen] = useState(true)

    const abrirModal = () => {
        setIsOpen(!isOpen)
        { isOpen && <Modal /> }
    }

    //****************** PROCESAR DATOS ******************** */
    const procesarDatos = (e) => {
        e.preventDefault()
        if (esRegistro) {
            registrar(nombre, pass, apellidos, email)
        } else { login(email, pass) }
        // setNombre('')
        // setApellidos('')
        // setEmail('')
        // setPass('')
        setError('')
        console.log('procesando datosssssssss ....');
    }
    /************* LOGIN - GET************* */
    const login = useCallback(async (emailU, passU) => {
        console.log('email... ' + emailU + ' pass ' + passU);
        const dato = await existeEmail()
        // console.log("dato lenght...")
        // console.log(dato)
        if (dato.length > 0 && dato[0].correo === emailU && dato[0].password === passU) {
            console.log('ingresado con exito')
            setIdChildPersona(dato[0].idpersona)
            /************ GUARDANDO DATOS LOCALMENTE SINGIN****** */
            localStorage.setItem('email', emailU)
            window.location.pathname = '/'
          
            abrirModal()
        } else {
            setError('Datos incorrectos')
        }
    }, [email, pass])
    /************** REGISTRO PERSONA - POST****************/
    const registrar = useCallback(async (nomU, passU, apeU, emaU) => {
        const dato = await existeEmail()
        console.log('REGISTRAR........DATO');
        console.log(dato);
        if (dato.length > 0 && dato[0].correo === email)
            setError('ya existe el email')
        else {
            console.log('no reg..........')
            adicionaPersonaBD(nomU, passU, apeU, emaU)
            /*********GUARDANDO DATOS LOCALMENTE REGISTRO********** */
            localStorage.setItem('email', emaU)
            // window.location.href = '/'
            window.location.pathname = '/'
            abrirModal()
        }
    }, [email])
    /**************EXISTE EMAIL**********************/
    const existeEmail = useCallback(async () => {
        let url = Apiurl + "personabyEmail"
        let obtEmail = await axios.get(url, {
            params: { correo: email }
        },)
        // si habilito esto, da error....
        // .then(response=>{
        //     console.log('response EMAIL');
        //     console.log(response);
        // }).catch(err => console.log(err))
        // console.log('!!!!! OBTIENE EMAIL !!!!!!')
        // console.log( obtEmail.data)
        return await obtEmail.data
    }, [email])
    /********** INGRESA DATOS PERSONA A BD *******/
    const adicionaPersonaBD = useCallback((nomU, passU, apeU, emaU) => {
        console.log('///ENVIADOOOOO///')
        let url = Apiurl + "persona"
        axios.post(url, null, {
            // params: { nombre: nomU, ap_paterno: apeU, correo: emaU, password: passU, departamento: depto }
            params: { nombre: nomU, ap_paterno: apeU, correo: emaU, password: passU, departamento: '??' }
        },)
            .then((response) => {
                console.log('++++++++++++ response registro de usuario')
                console.log(response)
                setIdChildPersona(response.data.insertId)
            }).catch(err => console.log(err))
    }, [])


    return (
        <div className="my-5">
            <Modal isOpen={isOpen}>
                <ModalBody>
                    {/* {esRegistro ? 'registro de usuario' : 'login de acceso'} */}
                    <center> <h5>{esRegistro ? 'registro de usuario' : 'login de acceso'}</h5> </center>
                    <Form className='form' >
                        {error &&
                            <Alert color="danger">
                                {error}
                            </Alert>
                        }
                        <FormGroup>
                            <Label for='exampleEmail'>Email</Label>
                            <Input type="email" name="email" id="exampleEmail" placeholder="email@email.com"
                                valid={validate === true} invalid={validate === false}
                                onChange={e => {
                                    setEmail(e.target.value);
                                    validateEmailFun(e)
                                }}
                            />
                            {validate === false && email !== '' && <FormFeedback > Email incorrecto</FormFeedback>}
                        </FormGroup>

                        <FormGroup>
                            <Label for='examplePassword'>Contraseña</Label>
                            <Input type="password" name="password" id="examplePassword" placeholder="********"
                                valid={validatePassword === true} invalid={validatePassword === false}
                                onChange={e => {
                                    setPass(e.target.value)
                                    validatePassFun(e)
                                }} />
                            {validatePassword === false && pass !== '' && <FormFeedback > Password MENOR 8</FormFeedback>}
                        </FormGroup>
                        {
                            esRegistro && (
                                <>
                                    <FormGroup>
                                        <Label for='examplePassword2'>Repite la contraseña</Label>
                                        <Input type="password" name="password2" id="examplePassword2" placeholder="********"
                                            valid={validatePassword2 === true} invalid={validatePassword2 === false}
                                            onChange={e => {
                                                setPass2(e.target.value)
                                                validatePassFun2(e)
                                            }}
                                        />
                                        {validatePassword2 === false && pass2 !== '' && <FormFeedback > Password MENOR 8 luego ver si SON IGUALES</FormFeedback>}
                                    </FormGroup>

                                    <FormGroup>
                                        <Label >Nombre</Label>
                                        <Input type="text" placeholder="Ingrese nombre"
                                            valid={validateNombre === true} invalid={validateNombre === false}
                                            onChange={e => {
                                                setNombre(e.target.value)
                                                validateNombreFun(e)
                                            }} />
                                        {validateNombre === false && nombre !== '' && <FormFeedback > no tiene nombre</FormFeedback>}

                                    </FormGroup>

                                    <FormGroup>
                                        <Label >Apellidos</Label>
                                        <Input type="text" placeholder="Ingrese apellidos"
                                            valid={validateApellido === true} invalid={validateApellido === false}
                                            onChange={e => {
                                                setApellidos(e.target.value)
                                                validateApellidoFun(e)
                                            }} />
                                        {validateApellido === false && apellidos !== '' && <FormFeedback > no tiene apellido</FormFeedback>}

                                    </FormGroup>
                                </>
                            )
                        }

                        <Button color="secondary" onClick={procesarDatos}
                            disabled={esRegistro
                                ? validate && validatePassword && validateNombre && validateApellido ? false : true
                                : validate && validatePassword ? false : true
                            }
                        >{esRegistro ? 'Registrarse' : 'Ingresar'}</Button>
                        <div className="mt-4">
                            <div className="d-flex justify-content-center links">
                                <Button className="btn btn-info btn-sm btn-block" onClick={() => setEsRegistro(!esRegistro)}>
                                    {esRegistro ? 'ya estas registrado?' : 'no tienes cuenta?'}
                                </Button>
                            </div>
                        </div>
                    </Form>
                </ModalBody>
            </Modal>
        </div>
    )
}


export default Login