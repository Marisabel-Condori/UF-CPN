import { green } from '@material-ui/core/colors'
import axios from 'axios'
import React, { useCallback, useEffect } from 'react'
import { useState } from 'react'
import { Apiurl } from '../../api/UsuariosApi'

const CajaComentario = ({ idvideo, idper }) => {

  const [comentario, setComentario] = useState('')
  const [respuesta, setRespuesta] = useState('')
  const [listaComentarios, setListaComentarios] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    getComentarios()
  }, [])

  ///////////// obtiene cursos bd ///////////
  const getComentarios = async () => {
    console.log('id videooooo: ' + idvideo);
    try {
      let url = Apiurl + "comentariosByIdVideo"
      let comentariosLista = await axios.get(url, {
        params: { idvideo: idvideo }
      })
      console.log(comentariosLista);
      setListaComentarios(comentariosLista.data)
      return comentariosLista;
    } catch (error) {
      console.log(error)
    }
  }

  const procesarRespuesta = async (idrespuesta) => {
    console.log("###############idrespuesta#################");

    console.log("###############idrespuesta#################");
    console.log(idrespuesta);
    console.log("################################");
    if (!respuesta.trim()) {
      console.log('respuesta vacio')
      setError('respuesta vacio')
      return
    }
    console.log('pasando validaciones')
    var today = new Date();
    var now = today.toLocaleString();
    await registraComentario(idvideo, idper, respuesta, now, idrespuesta)
    // setListaComentarios([...listaComentarios, comentario])
    setError(null)
    setComentario(null)
  }

  const procesarComentario = async (e) => {
    e.preventDefault()
    if (!comentario.trim()) {
      console.log('comentario vacio')
      setError('comentario vacio')
      return
    }
    console.log('pasando validaciones')
    // crea un nuevo objeto `Date`
    var today = new Date();
    // obtener la fecha y la hora
    var now = today.toLocaleString();
    await registraComentario(idvideo, idper, comentario, now)
    // setListaComentarios([...listaComentarios, comentario])
    setError(null)
    setComentario(null)
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
        getComentarios()
        //  setIdChild(response.data.insertId)
      }).catch(err => console.log(err))
  }

  return (
    <div className='my-5'>
      <hr />
      <p>Seccion comentarios</p>
      <p>idvideo: {idvideo} idpersona: {idper}</p>
      {
        error && (
          <div className="alert alet-danger">{error}</div>
        )
      }
      <form className="form-group" style={{ display: 'flex' }} onSubmit={procesarComentario} >
        <textarea className="form-control" onChange={e => setComentario(e.target.value)} placeholder='Ingresa tu comentario' style={{ width: '100%' }}></textarea>
        <button type="submit" className="btn btn-outline-secondary" style={{ width: '15%', height: '33px' }}>Enviar</button>
      </form>

      <div className="card">
        {
          listaComentarios.map((item, index) => (
            <div className={item.idrespuesta && 'pl-5 pr-2'} key={index} >
              <div class={!item.idrespuesta && "card-header"}>
                <h6>Mari C</h6>
                <p>{item.comentario} idvideo = {item.idvideo} idcomentario = {item.idcomentario}</p>
              </div>
              <form className=" form-group" style={{ display: 'flex' }}  >
                {
                  item.idrespuesta === null &&
                  <>
                    <textarea className="form-control" onChange={e => setRespuesta(e.target.value)} placeholder='Responder comentario' style={{ width: '300%' }}></textarea>
                    <button type="button" onClick={() => procesarRespuesta(item.idcomentario)} className="btn btn-outline-secondary" style={{ width: '50%', height: '33px' }}>responder</button>
                  </>
                }
              </form>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default CajaComentario