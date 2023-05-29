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
import Stack from '@mui/material/Stack';
import { Card, CardContent, CardActions, } from '@mui/material';
import Box from '@mui/material/Box';


// Material UI:
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';


const UserProfile = ({ user, setUser, }) => {
  const navigate = useNavigate();

  const [isHovered, setIsHovered] = useState(false);
  const [isBioHovered, setIsBioHovered] = useState(false);
  const [editing, setEditing] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);


  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsBioHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsBioHovered(false);
  };


  //Edited states of the user profile info
  const [editedName, setEditedName] = useState(user.name);
  const [editedUsername, setEditedUsername] = useState(user.username);
  const [editedLocation, setEditedLocation] = useState(user.location);
  const [editedGender, setEditedGender] = useState(user.gender);
  const [editedAge, setEditedAge] = useState(user.age);

  //Edit bio is separate since it's a textbox:
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
    <Grid container >
      <Grid item xs={12} style={{ height: '100%', width: '100%', }}>
        <Stack direction="column" spacing={1} sx={{ height: '100%', width: '100%' }}>
          <Stack key={user.username} direction="row" sx={{ height: '100%', width: '100%' }} spacing={1}>
            <Card key={user.name} sx={{ height: '100%', width: '100%' }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <Box sx={{ display: 'flex', height: '100%', width: '100%' }}>
                <Avatar
                  alt={user.name}
                  src={user.picture}
                  sx={{ width: 180, height: 180, objectFit: 'cover', marginLeft: 1, marginTop: 1 }}
                />
                <CardContent sx={{ flex: 1 }}>
                  <Box display="flex" alignItems="center">
                    { editing ? <EditName user={ user } editedName={ editedName } setEditedName={ setEditedName }/> : <Typography gutterBottom variant="h5" component="div">{user.name}</Typography>}
                    { editing ? <EditUsername user={ user } editedUsername={ editedUsername } setEditedUsername={ setEditedUsername }/> : <Typography variant="body2" color="text.secondary" marginLeft={1}>@{user.username}</Typography> }
                  </Box>
                  { isEditingBio ? <EditBio user={ user } setEditedBio={ setEditedBio } setIsEditingBio={ setIsEditingBio } editedBio={ editedBio } submitNewBio={ submitNewBio }/> 
                    : <Typography
                      marginTop={1}>{user.bio}</Typography>}
                  {(isBioHovered && !isEditingBio) && (
                    <Box>
                      <EditIcon sx={{ cursor: 'pointer' }} variant="outlined" size="medium"onClick={() => setIsEditingBio(true)}>Edit Bio</EditIcon>
                    </Box>
                  )}

                  <Box display="flex" alignItems="center" marginTop={3}>
                    { editing ? <EditGender user={ user } editedGender={ editedGender } setEditedGender={ setEditedGender }/> : <Typography >Gender: {user.gender}</Typography>}
                    { editing ? <EditAge user={ user } editedAge={ editedAge } setEditedAge={ setEditedAge }/> : <Typography marginLeft={2}>Age: {user.age}</Typography> }
                  </Box>
                  { editing ? <EditLocation user={ user } editedLocation={ editedLocation } setEditedLocation={ setEditedLocation }/> : <Typography marginTop={1}>Lives in {user.location}</Typography>}
                  <Typography id="vibe" marginTop={1} ><Vibe bio={user.bio} dbVibe={user.vibe}/></Typography>
                </CardContent>
                {(isHovered && !editing) && (
                  <Box>
                    <EditIcon sx={{ cursor: 'pointer' }} variant="outlined" size="medium"onClick={() => setEditing(true)}>Edit Profile</EditIcon>
                  </Box>
                )}
              </Box>
              <CardActions>
              </CardActions>
            </Card>
          </Stack>
        </Stack>
        { editing ? (<div>
          <Button variant="outlined" color="secondary" size="medium" onClick={ submitNewUserInfo }>Save Profile</Button>
          <Button variant="outlined" color="error" size="medium" onClick={ handleCancelClick }>Cancel Edit</Button>
        </div>) : null}
      </Grid>

      {/* <Grid container spacing={1}>
        <Grid container item xs={12} spacing={3}>
          <>
            <Grid item xs={4} container direction="column" justifyContent="center" alignItems="center">
              <Grid item>
                <Avatar alt="User Profile Image" src={user.picture} sx={{ width: 100, height: 100 }} referrerPolicy="no-referrer" />
              </Grid>
              <Grid item>
                { editing ? <EditName user={ user } editedName={ editedName } setEditedName={ setEditedName }/> : <Typography id="name" gutterBottom>{ user.name }</Typography>}
              </Grid>
            </Grid>

            <Grid item xs={4} container direction="column" alignItems="center">
              <Grid item>
                { editing ? <EditUsername user={ user } editedUsername={ editedUsername } setEditedUsername={ setEditedUsername }/> : <Typography id="username" gutterBottom>Username: {user.username}</Typography> }
              </Grid>
              <Grid item>
                { editing ? <EditGender user={ user } editedGender={ editedGender } setEditedGender={ setEditedGender }/> : <Typography id="gender" gutterBottom>Gender: {user.gender}</Typography>}
              </Grid>
              <Grid item>
                { editing ? <EditAge user={ user } editedAge={ editedAge } setEditedAge={ setEditedAge }/> : <Typography id="age" gutterBottom>Age: {user.age}</Typography> }
              </Grid>
              <Grid item>
                <Typography id="vibe" gutterBottom><Vibe bio={user.bio} dbVibe={user.vibe}/></Typography>
              </Grid>

            </Grid>
            <Grid item xs={4} container direction="column" alignItems="center">
              <Grid item>
                { editing ? <EditLocation user={ user } editedLocation={ editedLocation } setEditedLocation={ setEditedLocation }/> : <Typography id="location" gutterBottom> Location: {user.location}</Typography>}
              </Grid>
              <Grid item>
                <Typography id="bio" gutterBottom>Bio: </Typography>
                { isEditingBio ? <EditBio user={ user } setEditedBio={ setEditedBio } setIsEditingBio={ setIsEditingBio } editedBio={ editedBio } submitNewBio={ submitNewBio }/> : (<div>
                  <TextField id="bio" value={user.bio} variant="outlined" InputProps={{ readOnly: true }} multiline rows={3} style={{ paddingRight: '2px', paddingBottom: '3px' }} />
                </div>)}
              </Grid>
            </Grid>
          </>
        </Grid>
      </Grid>
      { editing ? (<div>
        <Button variant="outlined" color="secondary" size="medium" onClick={ submitNewUserInfo }>Save Profile</Button>
        <Button variant="outlined" color="error" size="medium" onClick={ handleCancelClick }>Cancel Edit</Button>
      </div>) : null}
      <Grid item xs={12} alignItems="center">
        <Photos id={user.id} />
      </Grid> */}
    </Grid>
  );
};




export default UserProfile;


