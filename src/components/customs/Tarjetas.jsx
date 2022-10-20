import React from 'react'
import TarjetaCurso from './TarjetaCurso'

const Tarjetas = () => {

    const img1 = 'https://png.pngtree.com/thumb_back/fw800/back_our/20190619/ourmid/pngtree-family-story-cover-background-material-image_140957.jpg'
    const img2 = 'https://1.bp.blogspot.com/-OG3Yp-pSBxA/T0bes0hlSCI/AAAAAAAAxRo/iZBIo0MbWOM/s1600/paisajes-portada-facebook---www.bancodeimagenesgratuitas.com---7.jpg'
    const img3 = 'https://img.freepik.com/vector-gratis/portada-facebook-tecnologia-textura-degradada_23-2149076442.jpg'

    const cards = [
        {
            id:1,
            titulo:'Java Avanzado',
            image: img1,
            url: 'https://youtube.com'
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

  return (
    <div className='container d-flex justify-content-center align-items-center h-100'>
        <div className='row'>
            {
                cards.map(card => (
                    <div className='col-md-4' key={card.id}>
                        <TarjetaCurso titulo={card.titulo} imageSource={card.image} url={card.url}/>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Tarjetas