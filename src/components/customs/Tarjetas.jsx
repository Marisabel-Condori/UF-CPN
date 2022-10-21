import React from 'react'
import TarjetaCurso from './TarjetaCurso'

import {Swiper, SwiperSlide} from 'swiper/react'
import { FreeMode } from 'swiper'

import 'swiper/css'
import 'swiper/css/free-mode'

const Tarjetas = () => {

    const img1 = 'https://png.pngtree.com/thumb_back/fw800/back_our/20190619/ourmid/pngtree-family-story-cover-background-material-image_140957.jpg'
    const img2 = 'https://1.bp.blogspot.com/-OG3Yp-pSBxA/T0bes0hlSCI/AAAAAAAAxRo/iZBIo0MbWOM/s1600/paisajes-portada-facebook---www.bancodeimagenesgratuitas.com---7.jpg'
    const img3 = 'https://img.freepik.com/vector-gratis/portada-facebook-tecnologia-textura-degradada_23-2149076442.jpg'

    const cards = [
        {
            id:1,
            titulo:'Java Avanzado',
            image: img1,
            url: 'https://youtube.com',
            descripcion:'desc pruebaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaa aaaaa aaaaa',
            nombreDocente:'aaaa',
            precio:'50'
        },
        {
            id:2,
            titulo:'My Sql',
            image: img2,
            url: 'https://youtube.com',
            nombreDocente:'bbb',
            precio:'50'
        },
        {
            id:3,
            titulo:'Express',
            image: img3,
            url: 'https://youtube.com',
            nombreDocente:'cccc',
            precio:'50'
        },
        {
            id:4,
            titulo:'1 Java Avanzado',
            image: img1,
            url: 'https://youtube.com',
            descripcion:'desc pruebaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaa aaaaa aaaaa',
            nombreDocente:'dddd',
            precio:'50'
        },
        {
            id:5,
            titulo:'1 My Sql',
            image: img2,
            url: 'https://youtube.com',
            nombreDocente:'dddd',
            precio:'50'
        },
        {
            id:6,
            titulo:'1 Express',
            image: img3,
            url: 'https://youtube.com',
            nombreDocente:'dddd',
            precio:'50'
        },
        {
            id:7,
            titulo:'2 Java Avanzado',
            image: img1,
            url: 'https://youtube.com',
            descripcion:'desc pruebaaaa aaaaaaa aaaaaaaaa aaaaaaaaaaaaaaa aaaaa aaaaa',
            nombreDocente:'dddd',
            precio:'50'
        },
        {
            id:8,
            titulo:'2 My Sql',
            image: img2,
            url: 'https://youtube.com',
            nombreDocente:'dddd',
            precio:'50'
        },
        {
            id:9,
            titulo:'2 Express',
            image: img3,
            url: 'https://youtube.com',
            nombreDocente:'dddd',
            precio:'50'
        }
    ]
    console.log('++++CARDS')
    console.log(cards)
    console.log('+++++++++')

  return (
    <div className='py-4 px-4 justify-content-center'>
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
                        <TarjetaCurso titulo={card.titulo} imageSource={card.image} url={card.url} descripcion={card.descripcion} nombreDocente={card.nombreDocente} precio={card.precio}/>
                        {/* </div> */}
                    </SwiperSlide>
                ))
            }
            
        </Swiper>
    </div>


    // </div>
  )
}

export default Tarjetas