import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import { CSVLink, CSVDownload } from "react-csv";



export default function App() {
    const queryParameters = new URLSearchParams(window.location.search)
    const org = queryParameters.get("org")
    const pos = queryParameters.get("pos")

    const [CSV, setCSV] = useState([]);
  

    useEffect(() => {        
        /* First, pull data from the scraper */
        axios.get("http://127.0.0.1:8000" + "/scrape?org=" + org + "&pos=" + pos)
          .then(res => {
            console.log(res.data)
            /* Then pull the email-format */
            axios.get("http://127.0.0.1:3500" + "/pull?org=" + org)
                .then(resp => {
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
                })
            });

      }, []);

    
    if (CSV.length === 0) return (<h1>Loading...</h1>)
    return (
      <div>
        <CSVLink filename={org + "_" + pos + "by MailHippo"} data={CSV}>Download email IDs from {org}</CSVLink>;
      </div>
    )
  }