import React from 'react'
import { useState } from 'react'
import '../css/Login.css'

import {Apiurl} from '../../api/UsuariosApi'

import axios from 'axios'

const IniciarSesion = () => {

    const [datosUsuario, setDatosUsuario] = useState({usuario:"", password:""})
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')

    const procesarDatos = e =>{
        e.preventDefault()
        if (!email.trim()) {
            console.log('email vacio')
            setError('email vacio')
            return
        }
        if (!pass.trim()) {
            console.log('password vacio')
            setError('password vacio')
            return
        }
        setError(null)
        //usuario
        console.log("++++++++++ "+datosUsuario.usuario+","+datosUsuario.password)
        setDatosUsuario({ ...datosUsuario, usuario: '', password:'' })
        
    }
    /************** GET EMAIL ****************/
    const manejaBoton= () =>{
        console.log('///ENVIADOOOOO///')
        let url =Apiurl + "persona"
        axios.get(url, null, {
            params:{correo: datosUsuario.usuario, password:datosUsuario.password}
            },
            console.log("URL............ "+url+"datos usuario "+datosUsuario))
            .then((response) =>{
                console.log(response)
            }
            ).catch(err => console.log)
    }
  return (
    <>
    <div className="container h-100">
       <div className="d-flex justify-content-center h-100">
           <div className="user_card">
               <div className="d-flex justify-content-center">
                   <div className="brand_logo_container">
                       <img src="https://pbs.twimg.com/profile_images/1264255557986390017/ICFys8Z0_400x400.jpg" className="brand_logo" alt="Logo"/>
                   </div>
               </div>
               <div className="d-flex justify-content-center form_container">
                   {/* *****************FORMULARIO ********************* */}
                   <form onSubmit={procesarDatos}>
                       <div className="input-group mb-3">
                           <div className="input-group-append">
                               <span className="input-group-text"><i className="fas fa-user">U</i></span>
                           </div>
                           {/* --------------------email */}
                           <input type="text" className="form-control"  placeholder="usuario" onChange={e=>setEmail(e.target.value)} value={datosUsuario.usuario}/>
                       </div>
                       <div className="input-group mb-2">
                           <div className="input-group-append">
                               <span className="input-group-text"><i className="fas fa-key">P</i></span>
                           </div>
                           {/* -----------------password */}
                           <input type="password" className="form-control input_pass"  placeholder="password" onChange={e=>setPass(e.target.value)} value={datosUsuario.password}/>
                       </div>
                       <div className="form-group">
                           <div className="custom-control custom-checkbox">
                               <input type="checkbox" className="custom-control-input" id="customControlInline"/>
                               <label className="custom-control-label" for="customControlInline">Remember me</label>
                           </div>
                       </div>
                           <div className="d-flex justify-content-center mt-3 login_container">
                    {/* ------------------------------button */}
                    <button type="submit" className="btn login_btn" onClick={manejaBoton}>Iniciar Sesion</button>
                   {/* <input type="submit" value={'Login'} className="btn login_btn" onClick={manejaBoton}/> */}
                  </div>
                   </form>
               </div>
       
               <div className="mt-4">
                   <div className="d-flex justify-content-center links">
                       ¿No tienes una cuenta? <button>Registrate</button>
                   </div>
                   <div className="d-flex justify-content-center links">
                       <h6>¿Olvidaste tu contraseña?</h6>       
                   </div>
               </div>
           </div>
       </div>
   </div>
   </>
  )
}

export default IniciarSesion