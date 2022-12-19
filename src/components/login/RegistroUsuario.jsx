
import { useCallback, useState } from 'react'
import '../css/Login.css'

import { Apiurl } from '../../api/UsuariosApi'

import axios from 'axios'
import Profile from './Profile'

const Login = () => {
    const [nombre, setNombre] = useState('')
    const [apellidos, setApellidos] = useState('')
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [depto, setDepto] = useState('')

    const [error, setError] = useState(null)
    const [esRegistro, setEsRegistro] = useState(true)

    const procesarDatos = async (e) => {
        e.preventDefault()
        if (!email.trim()) {
            console.log('**** AQUI VALIDAR email@gmail.com *****IF***')
            console.log('email vacio')
            setError('email vacio')
            return
        }
        if (!pass.trim()) {
            console.log('password vacio')
            setError('password vacio')
            return
        }
        if (esRegistro) {
            if (!nombre.trim()) {
                console.log('nombre vacio')
                setError('nombre vacio')
                return
            }
            if (!apellidos.trim()) {
                console.log('apellido vacio')
                setError('ape vacio')
                return
            }
            if (pass.length < 8) {
                console.log('pass menor a 8 caracteres')
                setError('ingrese pass mayor a 8 caracteres')
                return
            }
        }
        setError(null)
        console.log('pasando validaciones')
        if (esRegistro) {
            registrar()
        } else { login() }


        setNombre('')
        setApellidos('')
        setEmail('')
        setPass('')
        setError('')
    }

    /************* LOGIN GET************* */
    const login = useCallback(async () => {
        const dato = await existeEmail()
        // console.log("dato lenght...")
        // console.log(dato.length)
        if (dato.length > 0 && dato[0].correo === email && dato[0].password === pass) {
            console.log('ingresado con exito')
            /************ GUARDANDO DATOS LOCALMENTE SINGIN****** */
            localStorage.setItem('email', email)
            window.location.reload()
        } else {
            setError('Datos incorrectos')
        }
    },[])

    /************** REGISTRO PERSONA - POST****************/
    const registrar = useCallback(async () => {
        const dato = await existeEmail()
        if (dato.length > 0 && dato[0].correo === email)
            setError('ya existe el email')
        else {
            console.log('no reg')
            adicionaPersonaBD()
            /*********GUARDANDO DATOS LOCALMENTE REGISTRO********** */
            localStorage.setItem('email', email)
            window.location.reload()
        }
    }, [nombre, apellidos, email, pass, depto])

    /**************EXISTE EMAIL**********************/
    const existeEmail = async () => {
        let url = Apiurl + "personabyemail"
        let obtEmail = await axios.get(url, {
            params: { correo: email }
        })
        console.log('!!!!! OBTIENE EMAIL !!!!!!')
        console.log(obtEmail.data)
        return obtEmail.data
    }

    /********** INGRESA DATOS PERSONA A BD *******/
    const adicionaPersonaBD = () => {
        console.log('///ENVIADOOOOO///')
        let url = Apiurl + "persona"
        axios.post(url, null, {
            params: { nombre: nombre, ap_paterno: apellidos, correo: email, password: pass, departamento: depto }
        },)
            .then((response) => {
                console.log('++++++++++++ response')
                console.log(response)
            }).catch(err => console.log(err))
    }

    return (
        <>
            <div className="container h-100">
                <div className="d-flex justify-content-center h-100">
                    <div className="user_card">
                        <div className="d-flex justify-content-center">
                            <div className="brand_logo_container">
                                <img src="https://pbs.twimg.com/profile_images/1264255557986390017/ICFys8Z0_400x400.jpg" className="brand_logo" alt="Logo" />
                                <h6 className='mt-3'>
                                    {esRegistro ? 'registro de usuario' : 'login de acceso'}
                                </h6>

                            </div>
                        </div>

                        <div className="d-flex justify-content-center form_container">

                            {/* *****************FORMULARIO ********************* */}
                            <form onSubmit={procesarDatos}>
                                {
                                    error && (
                                        <div className="alert alet-danger">{error}</div>
                                    )
                                }
                                <div className="input-group mb-3">
                                    <div className="input-group-append">
                                        <span className="input-group-text"><i className="fas fa-user">E</i></span>
                                    </div>
                                    {/* --------------------email */}
                                    <input type="email" className="form-control" placeholder="Email" onChange={e => setEmail(e.target.value)} value={email} />
                                    {/* ...register('email',{pattern: /^[^\s@]+@[^\s@]+\.[^\s@+$/i]}) 
                                {errors.email?.type==='pattern'&&<P>formato incorrecto</P>}*/}
                                </div>
                                <div className="input-group mb-2">
                                    <div className="input-group-append">
                                        <span className="input-group-text"><i className="fas fa-key">P</i></span>
                                    </div>
                                    {/* -----------------password */}
                                    <input type="password" className="form-control input_pass" placeholder="Password" onChange={e => setPass(e.target.value)} value={pass} />
                                </div>
                                {
                                    esRegistro && (
                                        <>
                                            <div className="input-group mb-3">
                                                <div className="input-group-append">
                                                    <span className="input-group-text"><i className="fas fa-user">N</i></span>
                                                </div>
                                                {/* --------------------nombres */}
                                                <input type="text" className="form-control" placeholder="Nombre" onChange={e => setNombre(e.target.value)} value={nombre} />
                                            </div>
                                            <div className="input-group mb-3">
                                                <div className="input-group-append">
                                                    <span className="input-group-text"><i className="fas fa-user">A</i></span>
                                                </div>
                                                {/* --------------------apellidos */}
                                                <input type="text" className="form-control" placeholder="Apellido" onChange={e => setApellidos(e.target.value)} value={apellidos} />
                                            </div>

                                            {/* -----------------departamento */}
                                            <div className="form-group">
                                                <label>Departamento:</label>
                                                <select className="form-control" onChange={e => setDepto(e.target.value)} value={depto}>
                                                    <option>La Paz</option>
                                                    <option>Oruro</option>
                                                    <option>Potosi</option>
                                                    <option>Cochabamba</option>
                                                    <option>Sucre</option>
                                                    <option>Tarija</option>
                                                    <option>Pando</option>
                                                    <option>Beni</option>
                                                    <option>Santa Cruz</option>
                                                </select>
                                            </div>
                                        </>
                                    )
                                }

                                <div className="form-group">
                                    {/* mostrando profile prueba */}
                                    {/* { (!!estaLogueado) &&<Profile/> } */}
                                    {<Profile />}
                                    <div className="custom-control custom-checkbox">
                                        <input type="checkbox" className="custom-control-input" id="customControlInline" />
                                        <label className="custom-control-label" >Recuerdame</label>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-center mt-3 login_container">
                                    {/* ------------------------------button */}

                                    {/* <button type="submit" className="btn login_btn" onClick={()=>manejaBoton()} > */}
                                    <button type="submit" className="btn login_btn">
                                        {
                                            esRegistro ? 'Registrarse' : 'Ingresar'
                                        }
                                    </button>
                                </div>
                            </form>
                        </div>

                        <div className="mt-4">
                            <div className="d-flex justify-content-center links">
                                <button type='button' className='btn btn-info btn-sm btn-block' onClick={() => setEsRegistro(!esRegistro)}>

                                    {esRegistro ? 'ya estas registrado?' : 'no tienes cuenta?'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login