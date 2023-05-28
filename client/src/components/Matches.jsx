import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

//Material UI
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';


const Matches = ({ user }) => {
  const [matches, setMatches] = useState([]);
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
  };

  const navigateToMatchPage = (matchName) => {
    navigate(`/matchPage/${ matchName }`);
  };

  useEffect(() => {
    getMatches();
  }, []);


  if (matches.length === 0) {
    return (
      <div>
        {/* <Typography variant="h5" align="center" gutterBottom>Matches</Typography> */}
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <ListItem><ListItemText sx={{ marginLeft: '16px' }} primary="No Matches" /></ListItem>
        </List>
      </div>
    );
  }

  return (
    <div>
      {/* <Typography variant="h5" align="center" gutterBottom>Matches</Typography> */}
      <List sx={{ width: '100%',}}>
        {matches.map((match) => (
          <div key={match.id}>
            <ListItem>
              <ListItemAvatar>
                <Avatar onClick={() => navigateToMatchPage(match.name)} alt="Match Profile Image" src={match.picture} sx={{ width: 80, height: 80, cursor: 'pointer' }} referrerPolicy="no-referrer" />
              </ListItemAvatar>
              <ListItemText sx={{ marginLeft: '16px' }} primary={match.name} />
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        ))}
      </List>
    </div>
  );


};



export default Matches;
