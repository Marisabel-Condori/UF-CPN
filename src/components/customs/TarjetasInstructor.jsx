import { useState, useEffect } from 'react'

import 'swiper/css'
import 'swiper/css/free-mode'
import { Apiurl } from '../../api/UsuariosApi'
import axios from 'axios'
import TarjetaCursoInstructor from './TarjetaCursoInstructor'

const TarjetasInstructor = () => {

    const [cursosInst, setCursosInst] = useState([])

    useEffect(()=>{
        getCursosInst()
    },[])
    ///////////// obtiene personas bd ///////////
    const getCursosInst = async() => {
        let url = Apiurl + "curso"
        let cursosLista = await axios.get(url)
            .then(response => {
                console.log('+++++ response - lista de cursos instructor')
                console.log(response.data)
                setCursosInst(response.data)
            }).catch(err => console.log(err));
        return cursosLista;
    }
    const url = 'https://youtube.com'
    // const cards = [
    //     {
    //         id:1,
    //         titulo:'Java Avanzado',
    //         image: img1,
    //         url: 'https://youtube.com',
    //         descripcion:'desc pruebaaaa aaaaaaa aaaa aaa aaa aaaa aaa aa aaaaaaaaa aaaaaa aaaaaaaaa aaaaa aaaaa',
    //         nombreDocente:'aaaa',
    //         precio:'50'
    //     }]

  return (  
    <div className='d-flex justify-content-center align-items-center h-100'>
        <div className='row'>
            {
                cursosInst.map(card => (
                    <div className='col-md-4' key={card.idcurso}>
                        <TarjetaCursoInstructor objCursoBD={card} idCurso={card.idcurso} titulo={card.titulo_curso} imageSource={card.portada_curso} descripcion={card.descripcion_curso} url={url} nombreDocente={"Mari...."} precio={"50"}/>
                    </div>
                ))
            }
        </div>   
    </div>
  )
}

export default TarjetasInstructor
