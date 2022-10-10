import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
// import JSONPretty from 'react-json-pretty';

const Profile = () => {
    const {user, isAuthenticated, isLoading} = useAuth0();

    if(isLoading) return <h1>Cargando...</h1>

    return( isAuthenticated && (
            <div>
                <h1>mostrando datos de la persona que esta logueado</h1>
                <img src = {user.picture} alt ={user.name}/>
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                
                {/* <JSONPretty data={user}/> */}
                <pre>{JSON.stringify(user)}</pre>
            </div>
        )
    );
};  

export default Profile;