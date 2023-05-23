import React from 'react';

// Material UI:
import { Avatar } from '@mui/material';

const UserProfile = ({ user }) => {
//User is the logged in user
//The referrerPolicy allows us to print the image that google gives us

  return (
    <div>
      <h1>User Profile</h1>
      <Avatar
        alt="User Profile Image"
        src={ user.picture }
        sx={{ width: 80, height: 80 }}
        referrerPolicy="no-referrer"/>
      <p>Name: { user.name }</p>

    </div>
  );
};

export default UserProfile;


