import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { Stack, TextField, Slider, Box, FormControlLabel, FormGroup, Radio, Typography, Button, Alert } from '@mui/material';


const NewUser = ({ user, setUser }) => {
  const navigate = useNavigate();

  const [selectedGender, setSelectedGender] = useState(null);
  const [username, setUsername] = useState('');
  const [age, setAge] = useState(18);
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');
  const [showBio, setShowBio] = useState(true);
  const [editUsername, setEditUsername] = useState(true);
  const [editGender, setEditGender] = useState(true);
  const [confirmedAge, setConfirmedAge] = useState(false);
  const [editLocation, setEditLocation] = useState(true);
  const [allSaved, setAllSaved] = useState(false);

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  const handleAgeChange = (event, value) => {
    setAge(value);
  };

  const handleBioChange = (event) => {
    setBio(event.target.value);
  };

  const handleGenderSave = () => {
    if (selectedGender !== null) {
      setEditGender(false);
    }
  };

  const handleBioSave = () => {
    if (bio !== '' && bio !== ' ') {
      setShowBio(false);
    }
  };

  const handleUsernameSave = () => {
    if (username !== '' && username !== ' ') {
      setEditUsername(false);
    }
  };

  const handleLocationSave = () => {
    if (location !== '' && location !== ' ') {
      setEditLocation(false);
    }
  };


  const areAllSaved = () => {
    if (!showBio && !editUsername && !editGender && confirmedAge) {
      setAllSaved(true);
    } else {
      setAllSaved(false);
    }
  };

  const submitNewUserInfo = async () => {

    //This is taking all of the info that they inputted and are sending it to the database to be stored/displayed on the user profile.
    const newUserInfo = {
      username: username,
      gender: selectedGender,
      age: age,
      location: location,
      bio: bio,
    };

    try {
      //Sending the object created in newUserInfo to the database to be stored
      const response = await axios.put(`/users/edit/${ user.id}`, newUserInfo);

      if (!response.data) {
        throw response;
      }
      //THIS IS UPDATING THE APP STATE, PASSED DOWN FROM PARENT
      setUser(response.data);
      navigate('/');

    } catch (error) {
      console.log('Client Side Update of User Name Did Not Work', error);
    }

  };

  useEffect(() => {
    areAllSaved();
  }, [showBio, editUsername, editGender, confirmedAge, editLocation]);

  return (
    <Box mt={4}>
      <Typography variant="h5" gutterBottom>
        Create account:
      </Typography>

      {editUsername ? (
        <Box mt={2}>
          <Typography variant="body1" gutterBottom>
            Username:
          </Typography>
          <Stack mt={2} direction="row" spacing={2} alignItems="center">
            <TextField
              required
              size="small"
              id="outlined-basic"
              label="Username"
              onChange={(event) => setUsername(event.target.value)}
            />
            <Button variant="contained" onClick={handleUsernameSave}>
              Save
            </Button>
          </Stack>
        </Box>
      ) : (
        <Box mt={2}>
          <Typography variant="body1" gutterBottom>
            Username: {username}
          </Typography>
          <Button variant="contained" onClick={() => setEditUsername(true)}>
            Edit Username
          </Button>
        </Box>
      )}

      <Typography variant="body1" gutterBottom>
        Gender Selected: {selectedGender}
      </Typography>
      {editGender ? (
        <Box mt={2}>
          <Stack mt={2} direction="row" spacing={2} alignItems="center">
            <FormGroup row>
              <FormControlLabel
                value="Male"
                control={<Radio />}
                label="Male"
                checked={selectedGender === 'Male'}
                onChange={handleGenderChange}
              />
              <FormControlLabel
                value="Female"
                control={<Radio />}
                label="Female"
                checked={selectedGender === 'Female'}
                onChange={handleGenderChange}
              />
              <FormControlLabel
                value="Queer"
                control={<Radio />}
                label="Queer"
                checked={selectedGender === 'Queer'}
                onChange={handleGenderChange}
              />
            </FormGroup>
            <Button variant="contained" onClick={handleGenderSave}>
              Set Gender
            </Button>
          </Stack>
        </Box>
      ) : (
        <Box mt={2}>
          <Button variant="contained" onClick={() => setEditGender(true)}>
            Edit Gender
          </Button>
        </Box>
      )}

      <Typography variant="body1" gutterBottom>
        Age: {age}
      </Typography>
      {confirmedAge ? (
        <Box mt={2}>
          <Button variant="contained" onClick={() => setConfirmedAge(false)}>
            Edit Age
          </Button>
        </Box>
      ) : (
        <Box mt={2}>
          <Stack mt={2} direction="row" spacing={2} alignItems="center">
            <Slider
              id="age-slider"
              value={age}
              min={18}
              max={100}
              step={1}
              onChange={handleAgeChange}
              aria-labelledby="age-slider"
              sx={{ width: '10%' }}
            />
            <Button variant="contained" onClick={() => setConfirmedAge(true)}>
              Set Age
            </Button>
          </Stack>
        </Box>
      )}
      {editLocation ? (
        <Box mt={2}>
          <Typography variant="body1" gutterBottom>
            Location:
          </Typography>
          {editLocation && location.length > 0 && (
            <Alert severity="warning">You better be spelling that city name correctly!</Alert>
          )}
          <Stack mt={2} direction="row" spacing={2} alignItems="center">
            <TextField
              required
              size="small"
              id="outlined-basic"
              label="Location"
              onChange={(event) => setLocation(event.target.value)}
            />
            <Button variant="contained" onClick={handleLocationSave}>
            Save
            </Button>
          </Stack>
        </Box>
      ) : (
        <Box mt={2}>
          <Typography variant="body1" gutterBottom>
            Location: {location}
          </Typography>
          <Button variant="contained" onClick={() => setEditLocation(true)}>
            Edit Location
          </Button>
        </Box>
      )}

      {showBio ? (
        <Stack mt={2} direction="row" spacing={2} alignItems="center">
          <TextField
            id="outlined-textarea"
            label="Bio"
            multiline
            rows={4}
            value={bio}
            onChange={handleBioChange}
            variant="outlined"
            sx={{ width: '15%' }}
            margin="normal"
          />
        </Stack>
      ) : (
        <Box mt={2}>
          <Typography variant="body1" gutterBottom>
            Bio:
          </Typography>
          <Typography>{bio}</Typography>
          <Button variant="contained" onClick={() => setShowBio(true)}>
            Edit Bio
          </Button>
        </Box>
      )}

      {showBio && (
        <Button variant="contained" onClick={handleBioSave}>
          Set Bio
        </Button>
      )}

      {allSaved && (
        <Box mt={2}>
          <Typography variant="body1" gutterBottom>
            Ready to Submit?
          </Typography>
          <Button variant="contained" onClick={submitNewUserInfo}>
            Submit
          </Button>
        </Box>
      )}
    </Box>
  );
};


export default NewUser;
