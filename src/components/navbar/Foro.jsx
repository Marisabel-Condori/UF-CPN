import React from 'react'

const Foro = () => {

  const [equipo, setEquipo] = React.useState([])

  const obtenerDatos = async()=>{
    const data = await fetch('https://jsonplaceholder.typicode.com/users')
    const users = await data.json()
    console.log(users)
    setEquipo(users)
  }

  React.useEffect(()=>{
    console.log('UseEffect')
    obtenerDatos()
  },[])

  return (
    <div>
        <h1>Foro</h1>
        <ul>
          {equipo.map((item)=> <li key={item.id}>{item.name}</li>)}
        </ul>
    </div>
  )
}

export default Foro