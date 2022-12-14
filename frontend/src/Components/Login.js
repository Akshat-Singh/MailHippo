import React, { Component, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import jwt_decode from "jwt-decode"
import PageFormat from './PageFormat.js'

export default function Login() {

    const [user, setUser] = useState({});

    function handleCallbackResponse(response) {
        console.log("Encoded JWT ID token: " + response.credential);
        var userObject = jwt_decode(response.credential);
        console.log(userObject);
        setUser(userObject);

        const payload = {
          email: userObject["email"],
          name: userObject["name"],
          given_name: userObject["given_name"]
        }

        axios.get("http://172.28.1.4:3001" + "/user_add", payload)
          .then(res => {
          setEntries(res.data)
          console.log(res.data)
        });

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

    return (

      <div>

        <div className = "App">
          <div id = "signInDiv"> </div>
        </div>

        <PageFormat />


      </div>

    );
}