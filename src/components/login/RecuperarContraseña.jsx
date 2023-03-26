import React, { useState } from 'react'
import { useCallback } from 'react'
import { Alert, Button, Form, FormFeedback, FormGroup, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap'

const RecuperarContraseña = () => {

    const [email, setEmail] = useState('')
    const [validate, setValidate] = useState(false)

    const [error, setError] = useState(null)
    const [isOpen, setIsOpen] = useState(true)


    const abrirModal = () => {
        setIsOpen(!isOpen)
        { isOpen && <Modal /> }
    }

    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const validateEmailFun = (e) => {
        if (emailRex.test(e.target.value)) {
            setValidate(true)
        } else {
            setValidate(false)
        }
    }
    const procesarDatos = (e) => {
        e.preventDefault()
        if (!email.trim()) {
            setError('Email vacio')
            setTimeout(() => {
                setError(null)
            }, 3000);
            return
        }
        enviarDatos()
        setError('')
    }

    const enviarDatos = useCallback(async (email) => {

    })

    return (
        <>
            <Modal isOpen={isOpen}>
                <ModalHeader>Olvidaste tu contraseña</ModalHeader>
                <ModalBody>
                    <Form className='form'>
                        {error && <Alert color="danger">  {error}  </Alert>}
                        <FormGroup>
                            <Label for='exampleEmail'>Ingresa tu email</Label>
                            <Input type="email" name="email" id="exampleEmail" placeholder="email@email.com"
                                valid={validate === true} invalid={validate === false}
                                onChange={e => {
                                    setEmail(e.target.value);
                                    validateEmailFun(e)
                                }}
                            />
                            {validate === false && email !== '' && <FormFeedback > Email incorrecto</FormFeedback>}
                        </FormGroup>

                        <Button className="btn btn-info btn-sm btn-block" onClick={procesarDatos}
                            disabled={validate ? false : true}>
                            Enviar
                        </Button>
                        <Button className="btn btn-info btn-sm btn-block" onClick={abrirModal}>Salir</Button>

                    </Form>
                </ModalBody>

            </Modal>
        </>
    )
}

export default RecuperarContraseña