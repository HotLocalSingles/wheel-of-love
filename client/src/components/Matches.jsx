import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

//Material UI
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';


const style = {
  align: "center",
  border: '1px solid black'
};

const Matches = ({ user }) => {
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();


  const getMatches = async () => {
    try {
      const allMatches = await axios.get(`/matches/${user.id}`);

      if (!allMatches) {
        throw allMatches;
      }

      const filteredMatches = allMatches.data.map((match) => match.User2);
      setMatches(filteredMatches);

    } catch (error) {
      console.error('Could not retrieve all matches:', error);
    }

    setIsLoading(false);
  };

  const navigateToMatchPage = (matchName) => {
    navigate(`/matchPage/${ matchName }`);
  };

  useEffect(() => {
    getMatches();
  }, []);

  if (isLoading) {
    return (
      <Grid container item xs={ 12 } >
        <div className="main-loading-container">
          <CircularProgress align="center" className="main-loading-progress" color="success" />
          <Typography variant="h6" align="center">Loading your Matches</Typography>
        </div>
      </Grid>
    );
  }

  if (!isLoading && matches.length === 0) {
    return (
      <Grid container item xs={ 12 }>
        <Typography variant="h6" align="center">No Matches- Spin the Wheel!</Typography>
      </Grid>
    );
  }
  // const Matches = () => {
  //   return (
  //     <Grid container >
  //       {matches.map((match) => (
  //         <Grid item xs={12} style={style}>
  //           <Avatar onClick={() => navigateToMatchPage(match.name)} src={match.picture} sx={{ cursor: 'pointer' }} referrerPolicy="no-referrer" />
  //           <Typography variant="h6" align="center">{match.name}</Typography>
  //         </Grid>
  //       ))}
  //     </Grid>
  //   );
  // };

  return (
    <Grid container >
      {matches.map((match) => (
        <Grid item xs={12} style={style}>
          <Avatar onClick={() => navigateToMatchPage(match.name)} src={match.picture} sx={{ cursor: 'pointer' }} referrerPolicy="no-referrer" />
          <Typography variant="h6" align="center">{match.name}</Typography>
        </Grid>
      ))}
    </Grid>
  );


};



export default Matches;
