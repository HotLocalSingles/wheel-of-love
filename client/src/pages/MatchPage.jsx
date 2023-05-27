import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import { Button, Avatar, Typography, CircularProgress } from '@mui/material';

const MatchPage = () => {
  const navigate = useNavigate();
  const { matchName } = useParams();
  const [stateMatchInfo, setStateMatchInfo] = useState(null);

  const getMatchProfile = async () => {

    try {
      const matchInfo = await axios.get(`/users/match/${ matchName }`);

      if (!matchInfo) {
        throw matchInfo;
      }

      setStateMatchInfo(matchInfo.data);
    } catch (error) {
      console.error('Could not retrieve match info:', error);
      navigateToHome();
    }

  };

  useEffect(() => {
    getMatchProfile();
  }, []);

  const navigateToHome = () => {
    navigate('/');
  };

  if (stateMatchInfo === null) {
    return (      
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress disableShrink color="success" />
        <Typography
          variant="subtitle1"
          component="p"
          sx={{
            color: 'transparent',
            marginTop: '10px',
            fontWeight: 'bold',
            animation: 'colorSlide 3s linear infinite',
            animationDirection: 'alternate',
            animationDelay: '1s',
          }}
        >
        They're Coming
        </Typography>
        <style>
          {`
        @keyframes colorSlide {
          0% { color: transparent; }
          50% { color: #34243c; }
          100% { color: transparent; }
        }
        `}
        </style>
      </div>);
  }

  return (
    <div>
      <Typography variant="h2" align="center" gutterBottom>{ stateMatchInfo.name }'s Profile</Typography>
      <Avatar alt="User Profile Image" src={ stateMatchInfo.picture } sx={{ width: 200, height: 200 }} referrerPolicy="no-referrer"/>
      <br />
      <br />
      <Button onClick={ navigateToHome } variant="contained" sx={{ backgroundColor: '#926aa6' }}> Back to Home</Button>
    </div>
  );
};

export default MatchPage;
