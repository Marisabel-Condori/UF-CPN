import React from 'react'
import TarjetaCurso from './TarjetaCurso'

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

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
            descripcion:'desc pruebaaaa aaaaaaaaaaaaaaaa aaaaaaaaaaaaaaa aaaaa aaaaa'
        },
        {
            id:2,
            titulo:'My Sql',
            image: img2,
            url: 'https://youtube.com'
        },
        {
            id:3,
            titulo:'Express',
            image: img3,
            url: 'https://youtube.com'
        }
    ]
    console.log('++++CARDS')
    console.log(cards)
    console.log('+++++++++')

    /******************SETTINGS SLIDES***********************/
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
      };
    /***************************************************** */

  return (
    <div className='container d-flex justify-content-center align-items-center h-100'>
        <div className='row'>
          {/* <Slider {...settings}> */}
                {
                    cards.map(card => (
                        // <div key={card.id}>
                        <div className='col-md-4' key={card.id}> 
                            <TarjetaCurso titulo={card.titulo} imageSource={card.image} url={card.url} descripcion={card.descripcion}/>
                        </div>
                    ))
                }
        {/* </Slider> */}
        </div>
    </div>
  )
}

export default Tarjetas