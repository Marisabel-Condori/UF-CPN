// import React, { useState } from 'react'
// import VideoSeccion from './VideoSeccion'

// const SeccionCurso = ({idCurso}) => {
   
//   const [nombreSeccion, setNombreSeccion] = useState('')
  
//   return (
//     <>
//       <h6>props ultimo idCurso {idCurso}</h6>
//         <div className="card" >
//           <div className="card-body">
//             <div className='form-group'>
//               <div className='row'>
//                 <div className='col-md-2'> <label>Nombre Seccion</label> </div>
//                 <div className='col-md-10'>
//                   {/* ---------------- titulo seccion */}
//                   <input
//                     type="text" className="form-control" placeholder="Ingresa titulo de la seccion"
//                     onChange={e => setNombreSeccion(e.target.value)} value={nombreSeccion}
//                   />
//                 </div>
//               </div>
//             </div>
//             <center>
//                 <h3>Agregar Recurso o Video</h3>
//               <div className='col-md-7'>
//                 <VideoSeccion idCurso={idCurso} nomSeccion={nombreSeccion}/>
//               </div> 
//             </center>
//           </div>
//         </div>
//     </>
//   )
// }

// export default SeccionCurso