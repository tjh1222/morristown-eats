import './Background.css';
import { useState } from 'react';


let data = [
  "Laku Sushi",
  "Masago",
  "Pomodoros Pizza",
  "Rauls Empanadas",
  "Sterling Tavern",
  "South and Pine",
  "Sushi Lounge",
  "Nagano",
  "Tacoria",
  "The Office"
];




function Background() {
  const [ recommendations, setRecommendations ] = useState([]);
  const [ search, setSearch ] = useState("");


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
    let matches = data.filter((item) => regex.test(item));
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


  return (
    <div onClick={()=> clearSuggestions()}className="background-container">

      <div className="search-container">
        <form>
            <input value={search} onChange={(e) => updateState(e)} className="search" type="search" name ="q" placeholder="Where do you want to go?" autoComplete="off"></input><button type="submit">Search</button>
        </form>
        {
          (search) ? displaySuggestions(recommendations) : null
        }
      </div>
  </div>

  );
}

export default Background;


