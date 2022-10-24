import React, {useEffect} from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { usersApi } from "../../api/UserApi";
import { useState } from "react";
// import JSONPretty from 'react-json-pretty';

const Profile = () => {

/////// USEEFECT DE API
    // useEffect(() => {
    //     getUsers(); 
    //   }, []);
//////////
    // const {user, isAuthenticated, isLoading} = useAuth0();

    // if(isLoading) return <h1>Cargando...</h1>

    ///////////// API ///////////
    const getUsers = () => {
        usersApi.get('http://localhost:8000/persona') 
            .then(resp => {
                console.log(resp.data)
            });
    }
    ////////////

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