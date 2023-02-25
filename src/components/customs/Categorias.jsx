import {React, useState} from 'react'
import { Link } from 'react-router-dom'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'

const Categorias = () => {
    const [dropdown, setDropdown] = useState(false)
    const abrirDropdown = () => {
        setDropdown(!dropdown)
    }

    return (
        <Dropdown className='float-left mt-1 mr-2' isOpen={dropdown} toggle={abrirDropdown}>
            <DropdownToggle color='dark'>
                Categoria
            </DropdownToggle>
            <DropdownMenu >
                <DropdownItem><Link to="/" className="btn"> Todos </Link></DropdownItem>
                <DropdownItem><Link to="Informatica" className="btn"> Informatica </Link></DropdownItem>
                <DropdownItem><Link to="Matematica" className="btn"> Matematica </Link></DropdownItem>
                <DropdownItem><Link to="Biologia" className="btn"> Biologia </Link></DropdownItem>
                <DropdownItem><Link to="Quimica" className="btn"> Quimica </Link></DropdownItem>
                <DropdownItem><Link to="Fisica" className="btn"> Fisica </Link></DropdownItem>
                <DropdownItem><Link to="Estadistica" className="btn"> Estadistica </Link></DropdownItem>
            </DropdownMenu>
        </Dropdown>
    )
}
export default Categorias

