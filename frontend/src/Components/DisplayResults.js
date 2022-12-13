import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import { CSVLink, CSVDownload } from "react-csv";
import ReactLoading from "react-loading";


export default function App() {
    const queryParameters = new URLSearchParams(window.location.search)
    const org = queryParameters.get("org")
    const pos = queryParameters.get("pos")

    const [CSV, setCSV] = useState([]);
    const [statusCode, changeStatusCode] = useState(0);
  

    useEffect(() => {        
        /* First, pull data from the scraper */
        axios.get("http://127.0.0.1:8000" + "/scrape?org=" + org + "&pos=" + pos)
          .then(res => {
            console.log(res.data)
            /* Then pull the email-format */
            axios.get("http://127.0.0.1:3500" + "/pull?org=" + org)
                .then(resp => {
                    console.log(resp.data)
                    if (parseInt(resp.data) === 404)
                      changeStatusCode(404);
                    else {
                      const CSVData = []
                      CSVData.push(['Name', 'Position', 'Organization', 'Email'])
                      for (const ele of res.data) {
                          var format = resp.data["format"]
                          format = format.replace("{first}", ele['Name'].toLowerCase().replace(".", "").split(" ")[0])
                          format = format.replace("{last}", ele['Name'].toLowerCase().replace(".", "").split(" ")[1])
                          format = format.replace("{f}", ele['Name'].toLowerCase().replace(".", "").split(" ")[0][0])
                          format = format.replace("{l}", ele['Name'].toLowerCase().replace(".", "").split(" ")[1][0])

                          CSVData.push([ele['Name'], ele['Position'], ele['Company'], format])
                      }
                      setCSV(CSVData)
                      changeStatusCode(200)
                    }
                })
            });

      }, []);

    
    if (statusCode === 0) return (
        <div style={{alignItems: 'center', justifyContent: 'center', flex: '1'}}>
            <ReactLoading type="spin" style={{margin: "0 auto", position: "relative", fill: "rgb(224, 30, 133)", height: "100px", width: "50px"}}/>
            <div style={{margin: "0 auto", position: "relative", color: "#283592", textAlign: 'center', fontSize: '200%'}}>Generating Email Addresses</div>
        </div>
    
        )


    else if (statusCode == 404) return (
      <div style={{margin: "0 auto", position: "relative", color: "#283592", textAlign: "center", justifyContent: 'center', flex: '1', fontSize: '200%'}}>
        Sorry, data not found!
      </div>
    )
    return (
      <div>
        <CSVLink filename={org + "_" + pos + "by MailHippo"} data={CSV}>Download email IDs from {org}</CSVLink>;
      </div>
    )
  }