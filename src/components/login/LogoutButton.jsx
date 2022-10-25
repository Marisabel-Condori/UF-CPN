import React from 'react';

const LogoutButton = () => {
    const logout = () =>{
        localStorage.clear()
        window.location.reload()
    }
    return (
        <button className="btn btn-dark float-right ml-2" onClick={logout}>
            Salir
        </button>
    )
}

export default LogoutButton