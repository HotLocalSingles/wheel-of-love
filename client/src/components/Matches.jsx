import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { Avatar, Typography, List, ListItem, ListItemText, ListItemAvatar, Divider, Box } from '@mui/material';


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
      console.log(filteredMatches);
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
        <Typography variant="h5" gutterBottom>Matches</Typography>
        <Typography variant="h7" gutterBottom>No Matches</Typography>
      </div>
    );
  }

  return (
    <div>
      <Typography variant="h5" gutterBottom>Matches</Typography>
      <Box sx={{ maxHeight: 400, maxWidth: 360, overflow: 'auto', border: '1px solid #ccc', borderRadius: '4px', padding: '8px' }}>
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
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
      </Box>
    </div>
  );


};



export default Matches;
