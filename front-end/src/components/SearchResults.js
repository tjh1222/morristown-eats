import { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';
import "./SearchResults.css"
import axios from 'axios';

function SearchResults(props) {

  const [ places, setPlaces ] = useState([]);
  const { name } = props;


  useEffect(() => {
    async function fetchData() {
      let response = await axios(`http://localhost:5000/search?name=${name}`);
      setPlaces([...response.data.places])
    }
    fetchData();
  }, []);


  return (
    <div className="search-page-container">
      <h1>Search Results for {name}</h1>
      <div className="search-results-container">
        <ol>
          {places.map((place, idx) => <li className="test" key={idx}><Link to={`/restaurant/:${place.id}`}>{place.name}</Link></li>)}
        </ol>
      </div>

    </div>
  );
}

export default SearchResults;



