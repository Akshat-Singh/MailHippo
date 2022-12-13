import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import NavbarComp from './Components/Navbar.js'
import jwt_decode from "jwt-decode"
import { ThemeProvider } from "styled-components";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import Home from "./Components/Home.js";
import Format from "./Components/Format.js";
import Scraper from "./Components/Scraper.js";
import EmailSend from "./Components/EmailSend.js";
import Login from "./Components/Login.js";
import Navbar from "./Components/Navbar.js";
import Footer from "./Components/Footer.js";
import DisplayResults from './Components/DisplayResults.js'

import { GlobalStyle } from './GlobalStyle';

function App() {

  const theme = {
    colors: {
      heading: "rgb(24 24 29)",
      text: "rgb(24 24 29)",
      white: "#fff",
      black: " #212529",
      helper: "#8490ff",
      bg: "rgb(249 249 255)",
      footer_bg: "#0a1435",
      btn: "rgb(98 84 243)",
      border: "rgba(98, 84, 243, 0.5)",
      hr: "#ffffff",
      gradient:
        "linear-gradient(0deg, rgb(132 144 255) 0%, rgb(98 189 252) 100%)",
      shadow:
        "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;",
      shadowSupport: " rgba(0, 0, 0, 0.16) 0px 1px 4px",
    },
    media: { mobile: "768px", tab: "998px" },
  };

  // const [user, setUser] = useState({});

  // function handleCallbackResponse(response) {
  //   console.log("Encoded JWT ID token: " + response.credential);
  //   var userObject = jwt_decode(response.credential);
  //   console.log(userObject);
  //   setUser(userObject);
  //   document.getElementById("signInDiv").hidden = true;
  // }

  // useEffect(() => {
  //   /* global google */
  //   google.accounts.id.initialize({
  //     client_id: "16473489388-a8lvnk37eu5o5l16mqd7j21fqf89etct.apps.googleusercontent.com",
  //     callback: handleCallbackResponse,
  //   });

  //   google.accounts.id.renderButton(
  //     document.getElementById("signInDiv"),
  //     {theme: "outline", size: "large"}
  //   );

  // }, []);

  // If we have no user, show log in
  // If we have a user, then show log out


  // useEffect (() => {
  //   fetch("/test").then(
  //     res => res.text()
  //   ).then(
  //     data => {
  //       setData(data)
  //       console.log(data)
  //     }
  //   )
  // }, [])

  return (
    <ThemeProvider theme = {theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path = "/" element = {<Login />}/>

          <Route path="/home" element = {<Home />}/>

          <Route path = "/scraper" element = {<Scraper />}/>

          <Route path = "/format" element = {<Format />}/>

          <Route path = "/emailsend" element = {<EmailSend />}/>

          <Route path = "/fetch_details" element = {<DisplayResults />}/>
        </Routes>

        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
