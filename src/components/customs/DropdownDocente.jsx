import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { DropdownToggle, DropdownMenu, DropdownItem, UncontrolledDropdown } from 'reactstrap';

const DropdownDocente = () => {

    return (
        <UncontrolledDropdown className="btn">
            <DropdownToggle
                caret
                color="dark"
            >  Docente
            </DropdownToggle>
            <DropdownMenu >
                <DropdownItem>
                    <Link to="/CursoInstructor" className="btn"> Creados </Link>
                </DropdownItem>
                <DropdownItem>
                    <NavLink to="/NuevoCurso" className="btn "> Nuevo Curso</NavLink>
                </DropdownItem>
                <DropdownItem>
                    <NavLink to="/ForoLista" className="btn "> Foro </NavLink>
                </DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>
    )
}

export default DropdownDocente