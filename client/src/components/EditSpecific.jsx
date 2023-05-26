
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

// Material UI:
import { Avatar, Box, TextField, Typography, Grid, Button } from '@mui/material';
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
    console.log(newUserInfo);

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
      <div>
        <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}} noValidate autoComplete="off">
          <div>
            <TextField required size="small" id="outlined-basic" label="Edit Name" defaultValue={user.name} onChange={(event) => setEditedName(event.target.value)} />
          </div>
        </Box>
        <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}} noValidate autoComplete="off">
          <div>
            <TextField required size="small" id="outlined-basic" label="Edit Username" defaultValue={user.username} onChange={(event) => setEditedUsername(event.target.value)} />
          </div>
        </Box>
        <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}} noValidate autoComplete="off">
          <div>
            <TextField required size="small" id="outlined-basic" label="Edit Location" defaultValue={user.location} onChange={(event) => setEditedLocation(event.target.value)} />
          </div>
        </Box>
      </div>
      <Button variant="contained" onClick={ submitNewUserInfo }>Submit</Button>
      <Button variant="outlined" color="error" size="medium" onClick={ handleCancelClick }>Cancel Edit</Button>
    </div>
  );
};




export default EditSpecific;


