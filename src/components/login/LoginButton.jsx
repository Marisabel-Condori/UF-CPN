import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const LoginButton = () => {

    const {loginWithRedirect} = useAuth0();
  return (
    <button className="btn btn-dark float-right ml-2" onClick={login } >Ingresar</button>

  )
}

export default LoginButton