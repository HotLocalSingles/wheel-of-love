import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { Avatar } from '@mui/material';


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
        <h2>Matches</h2>
        <p>No Matches</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Matches</h2>
      <ul>
        {matches.map((match) => (
          <li key={match.name}>
            <Avatar onClick={() => navigateToMatchPage(match.name)} alt="Match Profile Image" src={ match.picture } sx={{ width: 80, height: 80 }} referrerPolicy="no-referrer"/>
            { match.name }
          </li>
        ))}
      </ul>
    </div>
  );

};



export default Matches;
