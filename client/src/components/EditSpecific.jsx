
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

// Material UI:
import { Avatar, Box, TextField, Typography, Grid, Button, Alert } from '@mui/material';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

const EditSpecific = ({ user, setUser, setEditing }) => {
  const navigate = useNavigate();

  const [editedName, setEditedName] = useState(user.name);
  const [editedUsername, setEditedUsername] = useState(user.username);
  const [editedLocation, setEditedLocation] = useState(user.location);
  const [editedBio, setEditedBio] = useState(user.bio);




  const submitNewUserInfo = async () => {

    //This is taking all of the info that they inputted and are sending it to the database to be stored/displayed on the user profile.
    const newUserInfo = {
      name: editedName,
      username: editedUsername,
      location: editedLocation,
      // bio: editedBio,
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
      console.log('Client Side Update of User Name Did Not Work', error);
    }

  };

  const handleCancelClick = () => {
    setEditedName((prevState) => prevState);
    setEditedUsername((prevState) => prevState);
    setEditedLocation((prevState) => prevState);
    // setEditedBio((prevState) => prevState);
    setEditing(false);
  };

  //If the user clicks the edit button, show a text box where they can edit their name and submit it
  return (
    <div>
      <Typography variant="h5" gutterBottom align="center">EDITING</Typography>
      <div>
        <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}} noValidate autoComplete="off">
          <div>
            <TextField required size="small" id="outlined-basic" label="Edit Name" value={ editedName } onChange={(event) => setEditedName(event.target.value)} />
            { editedName === user.name ? null : <DeleteForeverRoundedIcon size="large" onClick={ () => setEditedName(user.name) }/>}
          </div>
        </Box>
        <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}} noValidate autoComplete="off">
          <div>
            <TextField required size="small" id="outlined-basic" label="Edit Username" value={ editedUsername } onChange={(event) => setEditedUsername(event.target.value)} />
            { editedUsername === user.username ? null : <DeleteForeverRoundedIcon size="large" onClick={ () => setEditedUsername(user.username) }/>}
          </div>
        </Box>
        <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}} noValidate autoComplete="off">
          <div>
            <TextField required size="small" id="outlined-basic" label="Edit Location" value={ editedLocation } onChange={(event) => setEditedLocation(event.target.value)} />
            { editedLocation === user.location ? null : <DeleteForeverRoundedIcon size="large" onClick={ () => setEditedLocation(user.location) }/>}
            { editedLocation === user.location ? null : <Alert severity="warning">You better be spelling that city name correctly!</Alert>}
          </div>
        </Box>
      </div>
      <Button variant="outlined" color="secondary" size="medium" onClick={ submitNewUserInfo }>Save Profile</Button>
      <Button variant="outlined" color="error" size="medium" onClick={ handleCancelClick }>Cancel Edit</Button>
    </div>
  );
};




export default EditSpecific;


