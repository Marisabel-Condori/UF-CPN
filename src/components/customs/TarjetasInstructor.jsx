import React, { useEffect } from 'react'

import 'swiper/css'
import 'swiper/css/free-mode'
import { Apiurl } from '../../api/UsuariosApi'
import axios from 'axios'
import { useState } from 'react'
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
    //     },
    //     {
    //         id:2,
    //         titulo:'My Sql',
    //         image: img2,
    //         url: 'https://youtube.com',
    //         nombreDocente:'bbb',
    //         precio:'50'
    //     },
    //     {
    //         id:3,
    //         titulo:'Express',
    //         image: img3,
    //         url: 'https://youtube.com',
    //         nombreDocente:'cccc',
    //         precio:'50'
    //     }
    //    
    // ]
    // console.log('++++CARDS')
    // console.log(cards)
    // console.log('+++++++++')

  return (  
    <div className='container d-flex justify-content-center align-items-center h-100'>
        <div className='row'>
            {
                cursosInst.map(card => (
                    <div className='col-md-4' key={card.idcurso}>
                        <TarjetaCursoInstructor titulo={card.titulo_curso} imageSource={card.portada_curso} descripcion={card.descripcion_curso} url={url} nombreDocente={"Mari...."} precio={"50"}/>
                    </div>
                ))
            }
        </div>   
    </div>
  )
}

export default TarjetasInstructor
// -------------------------- Tarjetas tipo slide -----------------------------
{/*    <div className='py-4 px-4 justify-content-center'>   AUMENTAR DIV AL FINAL LUEGO DE </SWIPER>
<Swiper
        freeMode={true} 
        grabCursor={true} 
        modules={[FreeMode]}
        className='mySwiper'
        breakpoints={{
            0:{
                slidesPerView:1,
                spaceBetween:10
            },
            480:{
                slidesPerView:2,
                spaceBetween:10
            },
            768:{
                slidesPerView:3,
                spaceBetween:10
            },
            1024:{
                slidesPerView:4,
                spaceBetween:10
            },
            1280:{
                slidesPerView:5,
                spaceBetween:10
            }
        }}
        >
            {
                cards.map(card => (
                    <SwiperSlide key={card.id}>
                        {/* <div key={card.id}>  */}
                        // <TarjetaCurso titulo={card.titulo} imageSource={card.image} url={card.url} descripcion={card.descripcion} nombreDocente={card.nombreDocente} precio={card.precio}/>
                        {/* </div> */}
        //             </SwiperSlide>
        //         ))
        //     }
            
        // </Swiper> */}