import React, { useState } from 'react';
import axios from 'axios';
import '../static/SearchBar.css'

function SearchBar() {
  const [entries, setEntries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Use axios to send a request to the backend to retrieve a list of entries
  const fetchEntries = async () => {
    const response = await axios.get('/api/entries');
    setEntries(response.data);
  }

  // Use the search term to filter the entries and provide autocomplete suggestions
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  }

  return (
    <search style={{ margin: "auto", top: "20%", width: "50%", display: "block", alignItems: "center" }}>

    <input className='search-autocomplete'
        type='text'
        placeholder='Search for your target firms here!'
        //value={this.state.searchField}
        //onChange={this.onKeyUpHandler}
    />

    <div id="search_box" className="search_results">
        <ul>abc</ul>
    </div>
    </search>

     
  );
}

export default SearchBar;