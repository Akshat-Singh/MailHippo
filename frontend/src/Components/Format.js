import React, { Component, useState } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Format() {
        const [value, setValue] = useState('');

        const handleSelect = (e) => {
            console.log(e);
            setValue(e)
        }
        return (

        <div className = "App">
            <header className = "App-header">
                <h3> Select the email format that you want from the drop down menu. </h3>
                <DropdownButton id="dropdown-basic-button" title="Companies" onSelect = {handleSelect}>
                <Dropdown.Item eventKey = "McKinsey">McKinsey</Dropdown.Item>
                <Dropdown.Item eventKey = "Google">Google</Dropdown.Item>
                <Dropdown.Item eventKey = "Bain">Bain</Dropdown.Item>
                <Dropdown.Item eventKey = "Microsoft">Microsoft</Dropdown.Item>
            </DropdownButton>

            </header>

        </div>
                
        );
}
