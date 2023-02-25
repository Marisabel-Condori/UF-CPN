import React from 'react';
//import { useAuth0 } from '@auth0/auth0-react';

const LogoutButton = () => {
    const logout = () =>{
        localStorage.clear()
        window.location.reload()
    }

    //AUTH0
    //const { logout } = useAuth0()
    return (
        //AUTH0
        // <button className="btn btn-dark float-right mt-1 ml-2" onClick={()=> logout()}>
        //     Salir
        // </button>

        <button className="btn btn-dark float-right mt-1" onClick={() => logout()}>
            Salir
        </button>
    )
}

export default LogoutButton