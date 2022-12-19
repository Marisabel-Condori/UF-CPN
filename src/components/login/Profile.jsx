import React, {useEffect, useState} from "react";
import { Apiurl } from "../../api/UsuariosApi";
import axios from "axios";

import { useAuth0 } from "@auth0/auth0-react";

const Profile = () => {

    const {user, isAuthenticated} = useAuth0();

    useEffect(()=>{
        getPersonas()
    },[])
    ///////////// obtiene personas bd ///////////
    const getPersonas = async() => {
        let url = Apiurl + "persona"
        let personasLista = await axios.get(url)
            .then(response => {
                console.log('+++++ response - lista de personas')
                console.log(response.data)
            }).catch(err => console.log(err));
        return personasLista;
    }

    //////////// obtiene Storage
    // const [datoEmail, setDatoEmail] = useState('')
    // useEffect(()=>{
    //     setDatoEmail(getData())
    // },[])
    // const getData =() =>{
    //     return localStorage.getItem('email')
    // }

    const nombre = user.given_name
    const apellidos = user.family_name
    const email = user.email

    /********** INGRESA DATOS PERSONA A BD *******/
    const adicionaPersonaBD = () => {
        console.log('///ENVIADOOOOO///')
        let url = Apiurl + "persona"
        axios.post(url, null, {
            params: { nombre: nombre, ap_paterno: apellidos, correo: email}
        },)
            .then((response) => {
                console.log('++++++++++++ response')
                console.log(response)
            }).catch(err => console.log(err))
    } 
    return( 
        //<h2>hola {datoEmail}</h2>
        isAuthenticated && (
            <div>
                <h4>mostrando datos AUTH0...</h4>
                <img src = {user.picture} alt ={user.name}/>
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                
                {/* <JSONPretty data={user}/> */}
                <pre>{JSON.stringify(user)}</pre>

                <h2>Bienvenid@  {user.given_name}</h2>

            </div>
        )
    );
};  

export default Profile;