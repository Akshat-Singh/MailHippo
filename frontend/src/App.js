import React, {useState, useEffect} from 'react'
import './App.css'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import NavbarComp from './Components/Navbar.js'

function App() {

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
      <NavbarComp />


    </div>
  )
}

export default App
