import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Papa from "papaparse";
import axios from 'axios';
import '../static/EmailSend.css'
import { Button } from "../styles/Button.js";

function SearchBar() {
    const [email, setEmail] = useState("")
    const [subject, setSubject] = useState("")
    const [body, setBody] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [password, setPassword] = useState("")

    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const [file, setFile] = useState("");

    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }
    const handleChangeSubject = (e) => {
        setSubject(e.target.value)
    }
    const handleChangeBody = (e) => {
        setBody(e.target.value)
    }
    const handleChangeUserEmail = (e) => {
        setUserEmail(e.target.value)
    }
    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }



    const handleFileChange = (e) => {
        setError("");
         
        if (e.target.files.length) {
            const inputFile = e.target.files[0];

            const fileExtension = inputFile.type.split("/")[1];
            if (fileExtension !== "csv") {
                setError("Please input a csv file");
                return;
            }
 
            // If input type is correct set the state
            setFile(inputFile);
        }
    };

    const handleParse = (e) => {
         alert("Handle Parse Error")
        // If user clicks the parse button without
        // a file we show a error
        if (!file) return setError("Invalid File");
 
        // Initialize a reader which allows user
        // to read any file or blob.
        const reader = new FileReader();
         
        // Event listener on reader when the file
        // loads, we parse it and set the data.
        reader.onload = async ({ target }) => {
            const csv = Papa.parse(target.result, { header: true });
            const parsedData = csv.data;
            console.log(parsedData[0])
            if (!("Email" in parsedData[0])) {
                setError("Column titled 'Email' not found")
            }
            else {
                var str_mail = ""
                for (var row of parsedData) {
                    str_mail = str_mail + row["Email"] + "; "
                }
                setEmail(str_mail)
            }

            //setData(columns);
            //console.log(columns);
        };
        reader.readAsText(file);
    };

    const handleSubmit = (e) => {
        const payload = {
            email_string: email,
            sub: subject,
            body: body,
            user_email: userEmail,
            password: password
        }
        
        console.log(payload)

        axios.post("http://172.28.1.5:7500/send_email", payload)
            .then(res => {
                alert('Email Sent!')
            });
    };

  return (
    <div style={{ margin: "auto", top: "20%", width: "50%", display: "block", alignItems: "center" }}>

    <center>

    <input className='search-autocomplete'
      type='text'
      placeholder='Email Addresses (seperated by ";")'
      value={email}
      onChange={(e) => handleChangeEmail(e)}
      href="/"
    />
    <br />
    <div> <h3> You can also upload a MailHippo CSV &#40;or any CSV as long as it has a column named 'Email'&#41; </h3></div>

    <br />

    <input
        onChange={(e) => handleFileChange(e)}
        className="csvInput"
        name="file"
        type="File"
    />
    {/* <button className="btn-option" onClick={(e) => handleParse(e)} id="parseButton">Parse CSV</button>    */}

    &nbsp; &nbsp; <Button className = "btn hireme-btn" onClick = {(e) => handleParse(e)}> Parse CSV </Button>

    <div style={{ marginTop: "3rem" }}>
        {error ? error : data.map((col, idx) => <div key={idx}>{col}</div>)}
    </div>

    <input className='search-autocomplete'
      type='text'
      placeholder='Subject'
      value={subject}
      onChange={(e) => handleChangeSubject(e)}
    />

    <textarea className='search-autocomplete'
        rows='15'
        type='text'
        placeholder='Email Body'
        value={body}
        onChange={(e) => handleChangeBody(e)}
    />

    <input className = 'search-autocomplete'
        type = 'text'
        placeholder = 'EmailID'
        value = {userEmail}
        onChange = {(e) => handleChangeUserEmail(e)}

    />

    <input className = 'search-autocomplete'
        type = 'password'
        placeholder = 'Password'
        value = {password}
        onChange = {(e) => handleChangePassword(e)}

    />

    {/* <button className="btn-option" onClick={(e) => handleSubmit(e)}>
      Initiate Search
    </button> */}

    <br />
    <br />

    <Button className = "btn hireme-btn" onClick = {(e) => handleSubmit(e)}>
        Send Emails
    </Button>

    </center>

    </div> 

  );
}

export default SearchBar;