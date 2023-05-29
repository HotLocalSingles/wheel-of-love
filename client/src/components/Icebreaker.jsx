import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const Icebreaker = ({ googleId }) => {

  const [icebreaker, setIcebreaker] = useState(null);

  const fetchIcebreaker = () => {
    axios.get('/api/icebreaker')
      .then(response => setIcebreaker(response.data))
      .catch(err => {
        console.error('Failed to GET icebreaker from API', err);
      });
  };
  const handleNewIcebreakerClick = () => {
    fetchIcebreaker();
  };
  const handleSaveIcebreakerClick = () => {
    axios.post('/api/icebreaker', { googleId, icebreaker })
      .then(user => user)
      .catch(err => {
        console.error('Failed to POST icebreaker to DB', err);
      });
  };
  return (
    <Grid container >
      <Grid container item xs={12} >
        <Typography variant="h4" align="center">{ icebreaker }</Typography>
      </Grid>
      <Grid container item xs={12} >
        <button onClick={handleNewIcebreakerClick}>Create New Icebreaker</button>
        <button onClick={handleSaveIcebreakerClick}>Save Favorite Icebreaker</button>
      </Grid>
      {/* <div >
        <button onClick={handleNewIcebreakerClick}>Create New Icebreaker</button>
        <button onClick={handleSaveIcebreakerClick}>Save Favorite Icebreaker</button>
      </div>
      <div>{icebreaker}</div> */}
    </Grid>
  );
};

export default Icebreaker;
