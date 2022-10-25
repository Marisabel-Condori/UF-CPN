import {useState} from 'react'

const useEstaLogueado = () => {
  const [estaLogueado, setEstaLogueado] = useState(false)

  const guardarDato =(email, valorEstaLogueado) => {
    localStorage.setItem('email', email)
    setEstaLogueado(valorEstaLogueado)
  }
  return [
    estaLogueado, guardarDato
  ]
}

export default useEstaLogueado