import React, { Component } from 'react';

class Home extends Component {
    render() {
        return (
            <div style={{height: "90vh", background: "linear-gradient(0deg, rgba(250, 149, 247, 0.3), rgba(250, 149, 247, 0.3)), url(https://primech.co.nz/wp-content/uploads/2019/02/team-meeting-1920-1080.jpg)", backgroundSize: "cover"}}>
                <div style={{width: "150vh", height: "80vh", background: "linear-gradient(0deg, rgba(10, 10, 10, 0.7), rgba(10, 10, 10, 0.7))", position: "relative", margin: "auto"}}>
                <span style={{fontSize: "250%", color: "white"}}>Easy fix to your cold-outreach problems</span>
                <table>
                    <tr>
                        <td>For Students</td>
                        <td>For Professionals</td>
                    </tr>
                </table>
                </div>
                
            </div>
        );
    }
}

export default Home;