import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


//Material MUI
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';


//CSS for this Match Page
import '../../../styles/matchPage.css';

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
      <div className="match-page-loading">
        <CircularProgress disableShrink className="match-page-progress" color="success" />
        <Typography
          variant="subtitle1"
          component="p"
          className="match-page-typography"
        >
          They're Coming for You
        </Typography>
      </div>
    );
  }

  return (
    <div>
      <Typography variant="h2" align="center" gutterBottom>{ stateMatchInfo.name }'s Profile</Typography>
      <Avatar alt="User Profile Image" src={ stateMatchInfo.picture } sx={{ width: 200, height: 200 }} referrerPolicy="no-referrer"/>
      <br />
      <br />
      {/* <Chat initialUser={ } selectedUser={ stateMatchInfo } */}
      <Button onClick={ navigateToHome } variant="contained" sx={{ backgroundColor: '#926aa6' }}> Back to Home</Button>
    </div>
  );
};

export default MatchPage;
