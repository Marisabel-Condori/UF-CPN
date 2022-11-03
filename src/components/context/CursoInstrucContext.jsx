import React, { createContext } from 'react'

const CursoInstrucContext = createContext();

const CursoInstrucProvider =  ({children}) => {
  return (
    <CursoInstrucContext.Provider value={data}>
        {children}
    </CursoInstrucContext.Provider>
  )
}

export {CursoInstrucProvider}
export default CursoInstrucContext