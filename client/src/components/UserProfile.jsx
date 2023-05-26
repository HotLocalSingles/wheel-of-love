import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Vibe from './Vibe.jsx';

// Material UI:
import { Avatar, Box, TextField, Typography, Grid } from '@mui/material';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

const UserProfile = ({ user, setUser }) => {


  //If the user clicks the edit button, show a text box where they can edit their name and submit it
  return (
    <div>
      {/* <Typography variant="h5" gutterBottom align="center">Your Profile</Typography> */}
      <div>
        <Box sx={{ display: 'flex', border: '1px solid #ccc', borderRadius: '4px', padding: '8px', margin: '0 auto' }}>
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <Avatar alt="User Profile Image" src={ user.picture } sx={{ width: 100, height: 100 }} referrerPolicy="no-referrer"/>
              <Typography id="name" gutterBottom>{ user.name }</Typography>
            </Grid>
            <Grid item xs={9}>
              <Typography id="username" gutterBottom>Username: {user.username}</Typography>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Typography id="gender" gutterBottom>Gender: {user.gender}</Typography>
                  <Typography id="age" gutterBottom>Age: {user.age}</Typography>
                  <Typography id="vibe" gutterBottom><Vibe bio={user.bio} dbVibe={user.vibe}/></Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography id="bio" gutterBottom>Bio: {user.bio}</Typography>
                  <Typography id="location" gutterBottom> Location: {user.location}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};




export default UserProfile;


