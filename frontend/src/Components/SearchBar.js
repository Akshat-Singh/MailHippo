import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import '../static/SearchBar.css'

function SearchBar() {
  const [entries, setEntries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchPos, setSearchPos] = useState('');
  const [db_server_addr, set_db_server_addr] = useState('')
  const [suggestions, setSuggestions] = useState([]);


  // Use axios to send a request to the backend to retrieve a list of entries
  useEffect(() => {
    set_db_server_addr("http://172.28.1.4:3001")
    
    axios.get("http://172.28.1.4:3001" + "/get_comp_list")
      .then(res => {
        setEntries(res.data)
        console.log(res.data)
      });
  }, []);
  
  // Use the search term to filter the entries and provide autocomplete suggestions
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    
    if (searchTerm && searchTerm !== '') {
      document.getElementById('search_box').style = 'display: block';
      const regex = RegExp(`^${searchTerm}`, 'i');
      setSuggestions(entries.sort().filter(entry => regex.test(entry)));
    }
  };

  let navigate = useNavigate(); 
  const handleSubmit = (e) =>{ 
    navigate('/fetch_details?org=' + searchTerm + '&pos=' + searchPos);
  }
  
  const handlePosChange = (event) => {
    event.preventDefault();
    setSearchPos(event.target.value);
  };

  const handleOnClick = (modifier) => {
    setSearchTerm(modifier);
    document.getElementById('search_box').style = 'display: none';

  }
  

  /*if (searchTerm === '') {
    document.getElementById('search_box').style = 'display: block';
  }*/

  if (!entries) return (<h1>Loading....</h1>)

  return (
    <search style={{ margin: "auto", top: "20%", width: "50%", display: "block", alignItems: "center" }}>
    
    <input className='search-autocomplete'
        type='text'
        placeholder='Search for your target firms here!'
        value={searchTerm}
        onChange={handleChange}
    />
    
    <div id="search_box" className="search_results">
      <ul>
      {suggestions.map((suggest, index) => {
        return(
          <li className="li-suggest"><button className="btn-option" onClick={(e) => handleOnClick(suggest)}>{suggest}</button></li>
        )
      })}
      </ul>
    </div>

    <input className='search-autocomplete'
      type='text'
      placeholder='Position in Firm'
      value={searchPos}
      onChange={handlePosChange}
    />

    <button className="btn-option" onClick={(e) => handleSubmit(e)}>
      Initiate Search
    </button>

    </search> 

  );
}

export default SearchBar;