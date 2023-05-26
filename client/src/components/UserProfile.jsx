import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import Vibe from './Vibe.jsx';
import EditUsername from './EditProfileComp.jsx/EditUsername.jsx';

// Material UI:
import { Avatar, Box, TextField, Typography, Grid, Button } from '@mui/material';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

const UserProfile = ({ user, setUser, editing, setEditing }) => {
  const navigate = useNavigate();

  const [editedName, setEditedName] = useState(user.name);
  const [editedUsername, setEditedUsername] = useState(user.username);
  const [editedLocation, setEditedLocation] = useState(user.location);

  const submitNewUserInfo = async () => {

    //This is taking all of the info that they inputted and are sending it to the database to be stored/displayed on the user profile.
    const newUserInfo = {
      name: editedName,
      username: editedUsername,
      location: editedLocation,
    };

    try {
      //Sending the object created in newUserInfo to the database to be stored
      const response = await axios.put(`/users/edit/${ user.id }`, newUserInfo);

      if (!response.data) {
        throw response;
      }
      //THIS IS UPDATING THE APP STATE, PASSED DOWN FROM PARENT
      setEditing(false);
      navigate('/');
      setUser(response.data);

    } catch (error) {
      console.log('Client Side Update of Profile Did Not Work', error);
    }

  };

  const handleCancelClick = () => {
    setEditedName((prevState) => prevState);
    setEditedUsername((prevState) => prevState);
    setEditedLocation((prevState) => prevState);
    setEditing(false);
  };


  return (
    <div>
      <div>
        <Box sx={{ display: 'flex', border: '1px solid #ccc', borderRadius: '4px', padding: '8px', margin: '0 auto' }}>
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <Avatar alt="User Profile Image" src={ user.picture } sx={{ width: 100, height: 100 }} referrerPolicy="no-referrer"/>
              <Typography id="name" gutterBottom style={{ textAlign: 'center' }}>{ user.name }</Typography>
            </Grid>
            <Grid item xs={9}>
              { editing ? <EditUsername user={ user } editedUsername={ editedUsername } setEditedUsername={ setEditedUsername }/> : <Typography id="username" gutterBottom>Username: {user.username}</Typography> }
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <Typography id="gender" gutterBottom>Gender: {user.gender}</Typography>
                  <Typography id="age" gutterBottom>Age: {user.age}</Typography>
                  <Typography id="vibe" gutterBottom><Vibe bio={user.bio} dbVibe={user.vibe}/></Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography id="location" gutterBottom> Location: {user.location}</Typography>
                  <Typography id="bio" gutterBottom>Bio: {user.bio}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </div>
      { editing ? (<div>
        <Button variant="outlined" color="secondary" size="medium" onClick={ submitNewUserInfo }>Save Profile</Button>
        <Button variant="outlined" color="error" size="medium" onClick={ handleCancelClick }>Cancel Edit</Button>
      </div>) : null}
    </div>
  );
};




export default UserProfile;


