import React from 'react'

import Tarjetas from '../customs/TarjetasInstructor';
//import { useAuth0 } from '@auth0/auth0-react'

const TodosCursos = () => {
  //const { isAuthenticated, isLoading } = useAuth0()

  return (
    <div className="mt-5">
      {/* AUTH0 */}
      {/* {isAuthenticated? <Profile/>
          :<h3>no inicio sesion aun</h3>
          } */}
      <h3> todos los CURSOS</h3>
      <Tarjetas />
    </div>
  )
}

export default TodosCursos