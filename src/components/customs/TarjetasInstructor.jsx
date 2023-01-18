import { useState, useEffect } from 'react'
import 'swiper/css'
import 'swiper/css/free-mode'
import { Apiurl } from '../../api/UsuariosApi'
import axios from 'axios'
import TarjetaCursoInstructor from './TarjetaCursoInstructor'

const TarjetasInstructor = () => {

    const [cursosInst, setCursosInst] = useState([])

    useEffect(() => {
        getCursosInst()
    }, [])

    ///////////// obtiene cursos bd ///////////
    const getCursosInst = async () => {
        try {
            let url = Apiurl + "curso"
            let cursosLista = await axios.get(url)
            console.log('+++++ response - lista de cursos instructor')
            console.log(cursosLista.data);
            setCursosInst(cursosLista.data)
            return cursosLista;
        } catch (error) {
            console.log(error)
        }
    }

    const url = 'https://youtube.com'

    return (
        <div className='d-flex justify-content-center align-items-center h-100'>
            <div className='row'>
                {
                    cursosInst.map(card => (
                        <div className='col-md-4' key={card.idcurso}>
                            <TarjetaCursoInstructor objCursoBD={card} url={url} nombreDocente={"Mari...."} precio={"50"} />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default TarjetasInstructor
