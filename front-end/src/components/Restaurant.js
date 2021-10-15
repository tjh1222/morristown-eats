import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';


function Restaurant(props) {
  const { id } = useParams('id');

  const [ data, setData ] = useState({});
  const [ reviews, setReviews ] = useState([]);


  useEffect(() => {
    async function fetchData() {
      let restaurantData = await axios(`http://localhost:5000/restaurants/${id.slice(1)}`);
      let reviewData = await axios(`http://localhost:5000/restaurants/${id.slice(1)}/reviews`)
      setData({ ...restaurantData.data })
      setReviews([...reviewData.data.items]);
    }
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>{data.name} has an id of {id.slice(1)}!</h1>
      <ul>
        <li>Name: {data.name}</li>
        <li>Website Link: {data.website}</li>
      </ul>
      
      <h1>Reviews</h1>
      <ul>
        {
          reviews.map((review, idx) => {
            return (
              <li key={idx}>{review.username} {review.body} {review.star_rating}/5</li>
            );
          })
        }
      </ul>
    </div>

  );
}

export default Restaurant;



