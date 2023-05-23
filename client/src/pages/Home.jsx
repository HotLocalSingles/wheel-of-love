import React from 'react';
import { Button } from '@mui/material';
import UserProfile from '../components/UserProfile.jsx';

const Home = ({ user, handleLogout }) => {

  return (
    <div>
      <h1>Home</h1>
      <UserProfile user={ user }/>
      <Button variant="outlined" color="error" size="medium" onClick={ handleLogout }>Logout</Button>

    </div>
  );
};

export default Home;
