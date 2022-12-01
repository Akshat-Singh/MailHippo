import React, { Component, useState } from 'react';
import axios from "axios";
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import Form from 'react-bootstrap/Form';

export default function Format() {
        const [value, setValue] = useState('');
        const [format, setFormat] = useState('');
        const [company, setCompany] = useState('');

        const handleSelect = (e) => {
            console.log(e);
            setValue(e)

            axios.get('http://172.28.1.2:3000/pull?org=' + e)
                .then(res => {
                    console.log(res);
                    console.log(res.data);

                    setFormat(res.data);
                })

        }

        const companyChangeHandler = (e) => {
            setCompany(e.target.value);
        };

        const submitHandler = (e) => {
            e.preventDefault();

            setCompany('');

            console.log("Entered value is " + company);

            axios.get('http://172.28.1.2:3000/pull?org=' + company)
                .then(res => {
                    console.log(res);
                    console.log(res.data);

                    setFormat(res.data);
                })
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

        <Form onSubmit = {submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label> Enter Company Name </Form.Label>
            <Form.Control type="company" placeholder="Enter company name" value = {company} onChange = {companyChangeHandler} required />
            <Form.Text className="text-muted">
            Enter the company if it is not an option in the dropdown list.
            </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">
            Submit
        </Button>
        </Form>

        <p> The email format of the company you have queried is {format} </p>

            </header>

        </div>
                
        );
}
