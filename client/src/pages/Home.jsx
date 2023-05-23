import React from 'react';
import { Avatar} from '@mui/material';


const Home = ({ user }) => {
  return (
    <div className="home">
      <h1>User Profile</h1>
      <Avatar
        alt="User Profile Image"
        src={ user.picture }
        sx={{ width: 80, height: 80 }}
      />
      <p>Name: { user.name }</p>
      <p>Email Address: { user.email }</p>
    </div>
  )
}

export default Home;

