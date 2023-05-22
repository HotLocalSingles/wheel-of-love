import React from 'react';

// Material UI:
import { Avatar} from '@mui/material';

const UserProfile = ({ profile }) => {
//user is the logged in user
console.log(profile);

  return (
    <div>
      <h1>User Profile</h1>
      <Avatar
        alt="User Profile Image"
        src={ profile.picture }
        sx={{ width: 80, height: 80 }}
      />
      <p>Name: { profile.name }</p>
      <p>Email Address: { profile.email }</p>
    </div>
  );
};

export default UserProfile;
