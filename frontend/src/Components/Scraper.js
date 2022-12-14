import React, { Component, useState } from 'react';
import Form from 'react-bootstrap/Form';
import axios from "axios";
import SearchBar from './SearchBar';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'


export default function Format() {
    const [value, setValue] = useState('');
    const [format, setFormat] = useState('');
    const [company, setCompany] = useState('');

    const handleSelect = (e) => {
        console.log(e);
        setValue(e);

        axios.get('http://172.28.1.2:3000/pull?org=' + e)
            .then(res => {
                console.log(res);
                console.log(res.data.example);
                console.log(res.data.format);

                setFormat(res.data.format);
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
                console.log(res.data.example);
                console.log(res.data.format);

                setFormat(res.data.format);
            })
    }
    
    return (
        <div>
            <center> 
                <h3> Pull email addresses of employees of your preferred firms </h3>
            </center>
            <br />
            <br /> 
            <SearchBar/>
        </div>
    );
}


