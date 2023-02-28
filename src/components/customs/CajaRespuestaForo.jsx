import axios from 'axios'
import { Alert } from 'reactstrap'
import React, { useCallback, useEffect } from 'react'
import { useState } from 'react'
import { Apiurl } from '../../api/UsuariosApi'

const CajaRespuestaForo = ({ objComentario }) => {

  const [respuesta, setRespuesta] = useState('')
  const [error, setError] = useState(null)

  const procesarRespuesta = async () => {
    console.log("###############idrespuesta FORO#################");
    console.log();
    console.log("###############idrespuesta FORO #################");
    console.log("################################");
    if (!respuesta.trim()) {
      console.log('respuesta vacio')
      setError('respuesta vacio')
      return
    }
    console.log('pasando validaciones')
    var today = new Date();
    var now = today.toLocaleString();
    await registraComentario(objComentario.idvideo, objComentario.idpersona, respuesta, now, objComentario.idcomentario)
    setError(null)
  }

  /************** REGISTRO COMENTARIO - POST****************/
  const registraComentario = useCallback(async (idVIDEO, idPER, COMEN, NOW, IDRESP) => {
    adicionaComentario(idVIDEO, idPER, COMEN, NOW, IDRESP)
  }, [])
  /********** INGRESA DATOS COMENTARIO A BD *******/
  const adicionaComentario = (idv, idp, comen, now, idresp) => {
    console.log("############### adicionaComentario #################");
    console.log('{ idvideo: ' + idv + ' idpersona: ' + idp + ' comentario ' + comen + ' fecha: ' + now + ' id respuesta ' + idresp + ' }');
    console.log('///ENVIADOOOOO COMENTARIO///')
    let url = Apiurl + "comentario"
    axios.post(url, null, {
      params: { idvideo: idv, idpersona: idp, comentario: comen, fecha: now, idrespuesta: idresp }
    },)
      .then((response) => {
        console.log('++++++++++++ response')
        console.log(response)
        console.log('idComentario => ' + response.data.id)
      }).catch(err => console.log(err))
  }

  return (
    <div className='col-sm-7' >
      <div>
        <div className=" border-success mb-2">
          {/* <h4>{objComentario.idcomentario}...----</h4> */}
          <div className="card-header bg-transparent border-success">{objComentario.titulo_curso}</div>
          <div className="card-body text-success">
            <h5 className="card-title">{objComentario.titulo}</h5>
            <p className="card-text">{objComentario.comentario}</p>
          </div>
          <div className="card-footer text-right bg-transparent border-success">Por: {objComentario.nombre}</div>

          <p>Seccion respuesta foro</p>
          <p>idvideo: {objComentario.idvideo} idpersona: {objComentario.idpersona}</p>
          {error && <Alert color="danger"> {error} </Alert>}
          <form className=" form-group" style={{ display: 'flex' }}  >
            {/* className={` ${!item.idrespuesta && "card-header"} form-control`}  */}
            <textarea className="form-control " onChange={e => setRespuesta(e.target.value)} placeholder='Responder' style={{ width: '300%' }}></textarea>
            <button type="button" onClick={() => procesarRespuesta()} className="btn btn-outline-secondary" style={{ width: '50%', height: '33px' }}>responder</button>
          </form>
        </div>
      </div>
    </div>


  )
}

export default CajaRespuestaForo