import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import '@fontsource/sacramento';

const Icebreaker = ({ googleId }) => {

  const [icebreaker, setIcebreaker] = useState(icebreaker);

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
        <div className="neonText">
          <Typography variant="h4" align="center" fontFamily="Sacramento">{ icebreaker }</Typography>
        </div>
      </Grid>
      <Grid container item xs={12} >
        <Button variant="outlined" color="error" size="medium" onClick={handleNewIcebreakerClick} sx={{ mx: 'auto', mt: 2 }}>Create New Icebreaker</Button>
        <Button variant="outlined" color="error" size="medium" onClick={handleSaveIcebreakerClick} sx={{ mx: 'auto', mt: 2 }}>Save Favorite Icebreaker</Button>
      </Grid>
    </Grid>
  );
};

export default Icebreaker;
