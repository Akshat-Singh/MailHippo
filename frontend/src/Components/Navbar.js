import React, { Component } from 'react';
import {Navbar, Nav, Container} from 'react-bootstrap';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";

import Home from "./Home.js";
import Format from "./Format.js";
import Scraper from "./Scraper.js";
import EmailSend from "./EmailSend.js";

export default class NavbarComp extends Component {
    render() {
        return (
            <Router> 
                <div>
                    <Navbar style={{backgroundColor: 'rgba(255, 255, 255, 0.9)'}}>
                        <Container>
                            <Navbar.Brand href="#home"><span style={{color: "#283592", fontSize: "150%"}}>Mail</span><span style={{color: "#E01E85", fontSize: "150%"}}>Hippo</span></Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link as = {Link} to = {"/home"}> Home </Nav.Link>
                                <Nav.Link as = {Link} to = {"/scraper"}> LinkedIn Scraper </Nav.Link>
                                <Nav.Link as = {Link} to = {"/format"}> Email format </Nav.Link>
                                <Nav.Link as = {Link} to = {"/emailsend"}> Email sender </Nav.Link>
                            </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>  
                </div>

                <div>
                    <Routes>
                        <Route path="/home" element = {<Home />}/>

                        <Route path = "/scraper" element = {<Scraper />}/>

                        <Route path = "/format" element = {<Format />}/>

                        <Route path = "/emailsend" element = {<EmailSend />}/>
                    </Routes>
                </div>
            </Router>
        )
    }
}