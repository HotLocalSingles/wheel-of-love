import React from 'react';
import { Button } from '@mui/material';
import UserProfile from '../components/UserProfile.jsx';
import Icebreaker from '../components/Icebreaker.jsx';
import Vibe from '../components/Vibe.jsx';

import Wheel from '../components/Wheel.jsx';

const Home = ({ user, handleLogout }) => {
  //The handleLogout is referring to the function in App.jsx and is changing the state in there
  //Button is from the material ui

  return (
    <div>
      <h1>Home</h1>
      <UserProfile user={ user }/>
      <Vibe />
      <Icebreaker user={ user } />
      <Button variant="outlined" color="error" size="medium" onClick={ handleLogout }>Logout</Button>

      <br/>

      <br />
      <Wheel user={ user }/>
    </div>
  );
};

export default Home;
