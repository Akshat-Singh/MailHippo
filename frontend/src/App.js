import React, {useState, useEffect} from 'react'

function App() {

  const [date, setData] = useState([{}])

  useEffect (() => {
    fetch("/test").then(
      res => res.text()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])

  return (
    <div>

    </div>
  )
}

export default App
