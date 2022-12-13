import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Papa from "papaparse";
import axios from 'axios';
import '../static/SearchBar.css'

function SearchBar() {
    const [email, setEmail] = useState("")
    const [subject, setSubject] = useState("")
    const [body, setBody] = useState("")

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

  return (
    <div style={{ margin: "auto", top: "20%", width: "50%", display: "block", alignItems: "center" }}>
    <input className='search-autocomplete'
      type='text'
      placeholder='Email Addresses (seperated by ";")'
      value={email}
      onChange={(e) => handleChangeEmail(e)}
      href="/"
    />
    <div>You can also upload a MailHippo CSV &#40;or any CSV as long as it has a column named 'Email'&#41;</div>
    <input
        onChange={(e) => handleFileChange(e)}
        id="csvInput"
        name="file"
        type="File"
    />
    <button onClick={(e) => handleParse(e)} id="parseButton">Parse CSV</button>   

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

    <button className="btn-option">
      Initiate Search
    </button>

    </div> 

  );
}

export default SearchBar;