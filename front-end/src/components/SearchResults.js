import { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';
import "./SearchResults.css"
import axios from 'axios';

function SearchResults(props) {

  const [ places, setPlaces ] = useState([]);
  const { name, page } = props;
  const ITEMS_PER_PAGE = 5;
  const END_INDEX = page * ITEMS_PER_PAGE - 1;
  const START_INDEX = END_INDEX - (ITEMS_PER_PAGE - 1);


  useEffect(() => {
    async function fetchData() {
      let response = await axios(`http://localhost:5000/search?name=${name}`);
      setPlaces([...response.data.places])
    }
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function renderNextLink() {
    if (Math.ceil(places.length / ITEMS_PER_PAGE) === Number(page)) return null; 
    return (
      <Link className="next-page" to={`/search?name=${name}&page=${Number(page) + 1}`}>Next</Link>
    )
  }

  function renderPreviousLink() {
    if (Number(page) === 1) return null;
    return (
      <Link className="next-page" to={`/search?name=${name}&page=${Number(page) - 1}`}>Previous</Link>
    )
  }


  return (
    <div className="search-page-container">
      <h1>Search Results for {name}</h1>
      <div className="search-results-container">
        <ol>
          {places.slice(START_INDEX, END_INDEX + 1).map((place, idx) => <li className="test" key={idx}><Link to={`/restaurant/:${place.id}`}>{place.name}</Link></li>)}
        </ol>
      </div>
      <div>
        {renderPreviousLink()}
        {renderNextLink()}
      </div>

    </div>
  );
}

export default SearchResults;



