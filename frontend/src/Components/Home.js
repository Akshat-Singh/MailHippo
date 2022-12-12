import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

class Home extends Component {
    render() {
        return (
            <div className = "App">

                <header className = "App-header">

                <h2>  Welcome to <span style={{color: "#283592", fontSize: "150%"}}> Mail </span> <span style={{color: "#E01E85", fontSize: "150%"}}> Hippo! </span> </h2>
                <br />

                <h5> Your one stop solution for getting email IDs for working professionals, and automatically sending them
                    emails. 
                </h5>

                </header>

                
                
            </div>
        );
    }
}

export default Home;