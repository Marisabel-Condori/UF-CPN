import React, {useEffect} from "react";
import { useState } from "react";
import { Apiurl } from "../../api/UsuariosApi";
import axios from "axios";

const Profile = () => {

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
    const [datoEmail, setDatoEmail] = useState('')
    useEffect(()=>{
        setDatoEmail(getData())
    },[])
    const getData =() =>{
        return localStorage.getItem('email')
    }

    return( 
        <h2>hola {datoEmail}</h2>
        // isAuthenticated && (
        //     <div>
        //         <h1>mostrando datos de la persona que esta logueado</h1>
        //         <img src = {user.picture} alt ={user.name}/>
        //         <h2>{user.name}</h2>
        //         <p>{user.email}</p>
                
        //         {/* <JSONPretty data={user}/> */}
        //         <pre>{JSON.stringify(user)}</pre>
        //     </div>
        // )
    );
};  

export default Profile;