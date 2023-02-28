import React, { useEffect } from 'react'
// import 'swiper/css'
// import 'swiper/css/free-mode'
import { Apiurl } from '../../api/UsuariosApi'
import axios from 'axios'
import { useState } from 'react'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import TarjetaCursoEstudiante from './TarjetaCursoEstudiante'

const TarjetasEstudiante = ({dataCursosInscritos, idPersona}) => {

    console.log('++++++++++CURSOS INSCRITOS TARJETA++++++++++++');
    console.log(dataCursosInscritos); 

    const [cursosInst, setCursosInst] = useState([])
    const [tablaBusqueda, setTablaBusqueda] = useState([])
    const [busqueda, setBusqueda] = useState('')
    const [esBusqueda, setEsBusqueda] = useState(false)
 
    useEffect(() => {
        getCursosEst()
    }, [])
    ///////////// obtiene cursos pors estudiante bd ///////////
    const getCursosEst = async () => {
        try {
          let url = Apiurl + "cursoByEstudiante"
          let cursosLista = await axios.get(url, {
            params: { idestudiante: idPersona }
          })
          setCursosInst(cursosLista.data)
          return cursosLista;
        } catch (error) {
          console.log(error);
        }
      }
    const url = 'https://youtube.com'

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
        <>
            <button className="btn btn-outline-dark float-right">  <FontAwesomeIcon icon={faSearch} /> </button>
            <div className='float-right'>
                <input className='form-control inputBuscar' value={busqueda} placeholder='Buscar titulo curso' onChange={procesarDatos} />
            </div>
            <br /><br />
            {
                <div className='d-flex justify-content-center align-items-center h-100'>
                    <div className='row'>
                        {esBusqueda ?
                            tablaBusqueda.length === 0 ? <h3>No se han encontrado resultados</h3>
                                : tablaBusqueda.map(card => (
                                    <div key={card.idcurso} >
                                        <TarjetaCursoEstudiante objCursoBD={card} url={url} nombreDocente={idPersona} precio={"50"} estaInscrito={true}/>
                                    </div> 
                                )) 
                            :
                            cursosInst.map(card => (
                                <div className='col-md-4' key={card.idcurso}>
                                    <TarjetaCursoEstudiante objCursoBD={card} url={url} nombreDocente={idPersona} precio={"50"} estaInscrito={true}/>
                                </div>
                            ))}
                    </div>
                </div>
            }
        </>
    )
}

export default TarjetasEstudiante