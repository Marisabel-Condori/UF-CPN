import React from 'react'

const Recurso = () => {
  return (
    <div className="card m-3">
        <div className="card-body">
            <label>Recurso: </label>
            <div className="form-group mt-1">
                <input 
                    type="file" 
                    className="form-control-file" placeholder="Adjunte pdf o link"
                />
            </div>
        </div>
    </div>
  )
}

export default Recurso