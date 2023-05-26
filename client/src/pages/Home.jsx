import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@mui/material';
import UserProfile from '../components/UserProfile.jsx';
import Icebreaker from '../components/Icebreaker.jsx';
import Vibe from '../components/Vibe.jsx';
import Matches from '../components/Matches.jsx';
import NewUser from './NewUser.jsx';

import Wheel from '../components/Wheel.jsx';

const Home = ({ user, handleLogout, setUser }) => {
  //The handleLogout is referring to the function in App.jsx and is changing the state in there
  //Button is from the material ui
  const navigate = useNavigate();

  useEffect(() => {
    if (user.username === null) {
      navigate('/newUser');
    }
  }, []);


  return (
    <div>
      <h1>Home</h1>
      <UserProfile user={ user } setUser={ setUser }/>
      <Vibe />
      <Icebreaker user={ user } />
      {/* <NewUser user={ user } setUser={ setUser }/> */}
      <Matches user={ user }/>
      <br />
      <br />
      <Button variant="outlined" color="error" size="medium" onClick={ handleLogout }>Logout</Button>
      <br/>
      <br />
      <Wheel user={ user }/>
    </div>
  );
};

export default Home;
