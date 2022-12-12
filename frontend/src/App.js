import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import './App.css'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import NavbarComp from './Components/Navbar.js'
import jwt_decode from "jwt-decode"

function App() {

  const [user, setUser] = useState({});

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    var userObject = jwt_decode(response.credential);
    console.log(userObject);
    setUser(userObject);
    document.getElementById("signInDiv").hidden = true;
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id: "16473489388-a8lvnk37eu5o5l16mqd7j21fqf89etct.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {theme: "outline", size: "large"}
    );

  }, []);

  // If we have no user, show log in
  // If we have a user, then show log out

  const [date, setData] = useState([{}])

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
    <div className = "App">

      <div>
      <NavbarComp />

      <h3> {user && <div> Welcome to Mail Hippo! </div>} {user.name} </h3>

      </div>

      <div id = "signInDiv">

        {/* { user &&
        
          <div>

            <h3> {user.name} </h3>


          </div>
        
        
        } */}

      </div>
    </div>
  )
}

export default App
