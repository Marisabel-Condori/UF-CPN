import {React, useState} from 'react'
import { Link } from 'react-router-dom'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'

const Categorias = () => {
    const [dropdown, setDropdown] = useState(false)
    const abrirDropdown = () => {
        setDropdown(!dropdown)
    }

    return (
        <Dropdown className='float-left mt-2 mr-2' isOpen={dropdown} toggle={abrirDropdown}>
            <DropdownToggle color='dark'>
                Categoria
            </DropdownToggle>
            <DropdownMenu >
                <DropdownItem><Link to="/" className="btn"> Todos </Link></DropdownItem>
                <DropdownItem><Link to="Informatica" className="btn"> Informática </Link></DropdownItem>
                <DropdownItem><Link to="Matematica" className="btn"> Matemática </Link></DropdownItem>
                <DropdownItem><Link to="Biologia" className="btn"> Biología </Link></DropdownItem>
                <DropdownItem><Link to="Quimica" className="btn"> Química </Link></DropdownItem>
                <DropdownItem><Link to="Fisica" className="btn"> Física </Link></DropdownItem>
                <DropdownItem><Link to="Estadistica" className="btn"> Estadística </Link></DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}
export default Categorias

