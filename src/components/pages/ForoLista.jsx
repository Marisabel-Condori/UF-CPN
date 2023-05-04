import { useState, useEffect } from 'react'
import 'swiper/css'
import 'swiper/css/free-mode'
import { Apiurl } from '../../api/UsuariosApi'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faSearch } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'

const ForoLista = () => {

    let idPer = ''
    if (localStorage.getItem('id')) {
        idPer = localStorage.getItem('id')
    }

    const [cursosInst, setCursosInst] = useState([])
    const [tablaBusqueda, setTablaBusqueda] = useState([])
    const [busqueda, setBusqueda] = useState('')
    const [esBusqueda, setEsBusqueda] = useState(false)

    useEffect(() => {
        getCursosInst()
    }, [])

    console.log(' +++++++++++++++cursos foro lista  NUEVO notificacion+++++++++++');
    console.log(cursosInst);

    ///////////// obtiene cursos bd ///////////
    const getCursosInst = async () => {
        try {
            let url = Apiurl + "notificacionByIdInstructor"
            let cursosLista = await axios.get(url, {
                params: { idInstructor: idPer }
            })
            setCursosInst(cursosLista.data)
            return cursosLista;
        } catch (error) {
            console.log(error);
        }
    }

    /**************** BUSQUEDA ********** */
    const procesarDatos = (e) => {
        // e.preventDefault()

        setBusqueda(e.target.value)
        console.log('busqueda ' + e.target.value);
        filtrar(e.target.value)
        // filtrar(busqueda)
    }
    const filtrar = (terminoBusqueda) => {
        if (terminoBusqueda) setEsBusqueda(true)
        else setEsBusqueda(false)

        var resultadosBusqueda = cursosInst.filter((elem) => {
            if (elem.titulo_curso.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())) {
                return elem
            }
        })
        setTablaBusqueda(resultadosBusqueda)
    }

    return (
        <div>
            <h1 className='text-center'>Foro </h1>
            {cursosInst.length > 0
                ? <div>
                    <button className="btn btn-outline-dark float-right">  <FontAwesomeIcon icon={faSearch} /> </button>
                    <div className='float-right'>
                        <input className='form-control inputBuscar' value={busqueda} placeholder='Buscar titulo curso' onChange={procesarDatos} />
                    </div> <br /><br />

                    <div className='d-flex justify-content-center align-items-center h-100'>
                        <div className='row'>
                            {esBusqueda
                                ? tablaBusqueda.length === 0 ? <h3>No se han encontrado resultados</h3>
                                    : tablaBusqueda.map(card => (
                                        <div key={card.idcurso} >
                                            <div className="card ">
                                                <div className='card-header'>
                                                    <h5>{card.titulo_curso} + {card.nroNot}
                                                        <NavLink to='/Foro' state={{ data: card }} className="btn mr-2 float-right "> <FontAwesomeIcon icon={faBell} className='green' /> {card.nroNot} </NavLink>
                                                    </h5>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                :
                                cursosInst.map(card => (
                                    <div className='col-md-4 mb-2' key={card.idcurso} >
                                        {/* className={`btn ${esFavorito ? 'btn-success' : 'btn-outline-primary'} rounded-0 m-2`}      "card bg-info"*/}
                                        <div className={`card ${card.nroNot > 0 && 'bg-info'}`} >
                                            <div className='card-header'>
                                                <h5 style={{ color: card.nroNot > 0 && 'white' }} >{card.titulo_curso}
                                                    <NavLink to='/Foro' state={{ data: card }} className="btn mr-2 float-right" style={{ color: card.nroNot > 0 && 'white' }}> <FontAwesomeIcon icon={faBell} color={card.nroNot > 0 && 'white'} /> {card.nroNot} </NavLink>
                                                </h5>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                :
                <center> <br /><br /><p>AUN NO TIENES CURSOS, CREA UN CURSO -- FORO LISTA</p> </center>

            }
        </div>
    )
}

export default ForoLista
