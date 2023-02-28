import React from 'react'


const TarjetaForo = ({ dataComentario }) => {

  const muestra = () => {
    console.log('*************** DATA TARHETA ');
    console.log(dataComentario);
  }
  return (
    <div>
      {/* <button onClick={muestra}>mostrar comentarios</button> */}

      <div className='container'>
        <div className="card border-success mb-3">
          <div className="card-header bg-transparent border-success"><h5>{dataComentario.titulo_curso}</h5></div>
          <div className="card-body text-success">
            <h5 className="card-title">{dataComentario.titulo}</h5>
            <p className="card-text">{dataComentario.comentario}</p>
          </div>
          <div className="card-footer text-right bg-transparent border-success">Por: {dataComentario.nombre} {dataComentario.ap_paterno }</div>

        </div>
      </div>

    </div>
  )
}

export default TarjetaForo