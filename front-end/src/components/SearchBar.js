import './SearchBar.css';
import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';





function SearchBar() {
  const [ recommendations, setRecommendations ] = useState([]);
  const [ search, setSearch ] = useState("");
  const [ data, setData ] = useState([]);
  let history = useHistory();


  useEffect(() => {
    async function fetchData() {
      let response = await axios("http://localhost:5000/restaurants");
      setData([...response.data.places]);

    }

    fetchData();

  }, []);

  function updateSearch(e) {
    setSearch(e.target.firstChild.data);
    clearSuggestions();
  }

  function displaySuggestions(suggestions) {
    if (suggestions.length === 0) return null;

    return (
      <ul className="suggestion-container">
        {suggestions.map((item, idx) => <li   onClick={(e)=>updateSearch(e)} key = {idx} className="suggestions">{item}</li>)}
      </ul>
    );
  }

  function findSuggestions(e) {
    const { value } = e.target;
    let regex = new RegExp(`${value}`, "ig");
    let matches = data.filter((item) => regex.test(item.name));
    matches = matches.map(match => match.name);
    setRecommendations([
      ...matches
    ]);
  }

  function updateState(e) {
    findSuggestions(e);
    setSearch(e.target.value);
  }

  function clearSuggestions() {
    setRecommendations([]);
  }

  function submit(e) {
    e.preventDefault();
    history.push(`/search?name=${search}`);
  }


  return (
    <div onClick={()=> clearSuggestions()} className="background-container">

      <div className="search-container">
        <form onSubmit={submit}>
            <input value={search} onChange={(e) => updateState(e)} className="search" type="search" name ="q" placeholder="Where do you want to go?" autoComplete="off"></input>
            <button type="submit">Search</button>
        </form>
        {
          (search) ? displaySuggestions(recommendations) : null
        }
      </div>
  </div>

  );
}

export default SearchBar;


