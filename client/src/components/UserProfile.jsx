import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import Vibe from './Vibe.jsx';
import Photos from './Photos.jsx';
import EditName from './EditProfileComp.jsx/EditName.jsx';
import EditUsername from './EditProfileComp.jsx/EditUsername.jsx';
import EditLocation from './EditProfileComp.jsx/EditLocation.jsx';
import EditGender from './EditProfileComp.jsx/EditGender.jsx';
import EditAge from './EditProfileComp.jsx/EditAge.jsx';
import EditBio from './EditProfileComp.jsx/EditBio.jsx';

// Material UI:
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

const UserProfile = ({ user, setUser, editing, setEditing }) => {
  const navigate = useNavigate();

  //Edited states of the user profile info
  const [editedName, setEditedName] = useState(user.name);
  const [editedUsername, setEditedUsername] = useState(user.username);
  const [editedLocation, setEditedLocation] = useState(user.location);
  const [editedGender, setEditedGender] = useState(user.gender);
  const [editedAge, setEditedAge] = useState(user.age);

  //Edit bio is separate since it's a textbox:
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [editedBio, setEditedBio] = useState(user.bio);


  const submitNewUserInfo = async () => {

    //This is taking all of the info that they inputted and are sending it to the database to be stored/displayed on the user profile.
    const newUserInfo = {
      name: editedName,
      username: editedUsername,
      gender: editedGender,
      location: editedLocation,
    };
    //if new bio, add that as a key/value pair so Bryan's api doesn't wrack up

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

  const submitNewBio = async () => {
    //If they click save bio, need to double check that they aren't editing the bio anymore and it's a different bio than before
    const newBio = {
      bio: editedBio
    };
    try {
      const response = await axios.put(`/users/edit/${ user.id }`, newBio);
      if (!response.data) {
        throw response;
      }
      console.log(response.data.bio);
      setUser(response.data);
      setIsEditingBio(false);
    } catch (error) {
      console.log('Client Side Update of Bio Did Not Work', error);
    }
  };


  //Cancelling adding new user profile data
  const handleCancelClick = () => {
    setEditedName((prevState) => prevState);
    setEditedUsername((prevState) => prevState);
    setEditedLocation((prevState) => prevState);
    setEditing(false);
  };


  return (
    <div>
      <div>
        <Box sx={{ display: 'flex', border: '1px solid #ccc', margin: '0 auto' }}>
          <Grid container spacing={1}>
            <Grid item xs={3}>
              <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: '10px', marginTop: '10px' }}>
                <Avatar alt="User Profile Image" src={user.picture} sx={{ width: 100, height: 100 }} referrerPolicy="no-referrer" />
              </Box>
              { editing ? <EditName user={ user } editedName={ editedName } setEditedName={ setEditedName }/> : <Typography id="name" gutterBottom style={{ textAlign: 'center' }}>{ user.name }</Typography>}
            </Grid>
            <Grid item xs={9}>
              { editing ? <EditUsername user={ user } editedUsername={ editedUsername } setEditedUsername={ setEditedUsername }/> : <Typography id="username" gutterBottom>Username: {user.username}</Typography> }
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  { editing ? <EditGender user={ user } editedGender={ editedGender } setEditedGender={ setEditedGender }/> : <Typography id="gender" gutterBottom>Gender: {user.gender}</Typography>}
                  { editing ? <EditAge user={ user } editedAge={ editedAge } setEditedAge={ setEditedAge }/> : <Typography id="age" gutterBottom>Age: {user.age}</Typography> }
                  <Typography id="vibe" gutterBottom><Vibe bio={user.bio} dbVibe={user.vibe}/></Typography>
                </Grid>
                <Grid item xs={6}>
                  { editing ? <EditLocation user={ user } editedLocation={ editedLocation } setEditedLocation={ setEditedLocation }/> : <Typography id="location" gutterBottom> Location: {user.location}</Typography>}
                  <Typography id="bio" gutterBottom>Bio: </Typography>
                  { isEditingBio ? <EditBio user={ user } setEditedBio={ setEditedBio } setIsEditingBio={ setIsEditingBio } editedBio={ editedBio } submitNewBio={ submitNewBio }/> : (<div>
                    <TextField id="bio" value={user.bio} variant="outlined" InputProps={{ readOnly: true }} multiline rows={3} style={{ paddingRight: '2px', paddingBottom: '3px' }} />
                    <Button variant="outlined" color="secondary" size="medium" onClick={ () => setIsEditingBio(true) }>Edit Bio</Button>
                  </div>)}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </div>
      <Photos id={user.id}/>
      { editing ? (<div>
        <Button variant="outlined" color="secondary" size="medium" onClick={ submitNewUserInfo }>Save Profile</Button>
        <Button variant="outlined" color="error" size="medium" onClick={ handleCancelClick }>Cancel Edit</Button>
      </div>) : null}
    </div>
  );
};




export default UserProfile;


