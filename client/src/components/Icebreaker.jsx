import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Icebreaker = ({ user }) => {
  // console.log('icebrak uer', user)
  // const googleId = user.googleId;

  const [icebreaker, setIcebreaker] = useState(null);

  const fetchIcebreaker = () => {
    axios.get('/api')
      .then(response => setIcebreaker(response.data))
      .catch(err => {
        console.error('Failed to GET icebreaker from API', err);
      });
  };
  const handleNewIcebreakerClick = () => {
    fetchIcebreaker();
  };
  const handleSaveIcebreakerClick = () => {
    axios.post('/api', { googleId, icebreaker })
      .then(user => user)
      .catch(err => {
        console.error('Failed to POST icebreaker to DB', err);
      });
  };
  return (
    <>
      <div>
        <button onClick={handleNewIcebreakerClick}>Create New Icebreaker</button>
        <button onClick={handleSaveIcebreakerClick}>Save Favorite Icebreaker</button>
      </div>
      <h1>{icebreaker}</h1>
    </>
  );
};

export default Icebreaker;
