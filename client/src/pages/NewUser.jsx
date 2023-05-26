import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Stack, TextField, Slider, Box, FormControlLabel, FormGroup, Radio, Typography, Button } from '@mui/material';


const NewUser = ({ user, setUser }) => {
  const [selectedGender, setSelectedGender] = useState(null);
  const [username, setUsername] = useState(null);
  const [age, setAge] = useState(18);
  const [bio, setBio] = useState('');
  const [showBio, setShowBio] = useState(true);
  const [editUsername, setEditUsername] = useState(true);
  const [editGender, setEditGender] = useState(true);
  const [confirmedAge, setConfirmedAge] = useState(false);
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
    if (bio !== '') {
      setShowBio(false);
    }
  };

  const handleUsernameSave = () => {
    if (username !== null) {
      setEditUsername(false);
    }
  };


  const areAllSaved = () => {
    if (!showBio && !editUsername && !editGender && confirmedAge) {
      setAllSaved(true);
    }
  };

  const submitNewUserInfo = async () => {

    const newUserInfo = {
      username: username,
      gender: selectedGender,
      age: age,
      bio: bio
    };

    try {
      const response = await axios.put(`/users/edit/${ user.id}`, newUserInfo);

      if (!response.data) {
        throw response;
      }
      //THIS IS UPDATING THE APP STATE, PASSED DOWN FROM PARENT
      setUser(response.data);

    } catch (error) {
      console.log('Client Side Update of User Name Did Not Work', error);
    }

  };

  useEffect(() => {
    areAllSaved();
  }, [showBio, editUsername, editGender, confirmedAge]);

  return (
    <div>
      <Typography variant="h5" gutterBottom>Looks Like You're a New User.</Typography>
      <Typography variant="h5" gutterBottom>Time to Add Some Information so the Local Singles Know What They're Getting Into!</Typography>

      {editUsername ? (
        <div>
          <Typography id="username-textbox" gutterBottom>Username:</Typography>
          <TextField required size="small" id="outlined-basic" label="Username" onChange={ (event) => setUsername(event.target.value) } />
          <Button variant="contained" onClick={ handleUsernameSave }>Save</Button>
        </div>
      ) : (
        <div>
          <Typography id="username-textbox" gutterBottom>Username: { username }</Typography>
          <Button variant="contained" onClick={ () => setEditUsername(true) }>Edit Username</Button>
        </div>
      )}

      <Typography id="gender-checkbox" gutterBottom>Gender Selected: { selectedGender }</Typography>
      {editGender ? (
        <div>
          <FormGroup>
            <FormControlLabel value="Male" control={ <Radio /> } label="Male" checked={ selectedGender === 'Male' } onChange={ handleGenderChange } />
            <FormControlLabel value="Female" control={ <Radio /> } label="Female" checked={ selectedGender === 'Female' } onChange={ handleGenderChange } />
            <FormControlLabel value="Queer" control={ <Radio /> } label="Queer" checked={ selectedGender === 'Queer' } onChange={ handleGenderChange } />
          </FormGroup>
          <Button variant="contained" onClick={ handleGenderSave }>Set Gender</Button>
        </div>
      ) : (
        <div>
          <Button variant="contained" onClick={ () => setEditGender(true) }>Edit Gender</Button>
        </div>
      )}

      <Typography id="age-slider" gutterBottom> Age: { age } </Typography>
      {confirmedAge ? (
        <div>
          <Button variant="contained" onClick={ () => setConfirmedAge(false) }>Edit Age</Button>
        </div>
      ) : (
        <div>
          <Slider id="age-slider" value={ age } min={ 18 } max={ 95 } step={ 1 } onChange={ handleAgeChange } aria-labelledby="age-slider" />
          <Button variant="contained" onClick={ () => setConfirmedAge(true) }>Set Age</Button>

        </div>
      )}

      { showBio ? (
        <TextField id="outlined-textarea" label="Bio" multiline rows={ 4 } value={ bio } onChange={ handleBioChange } />
      ) : (
        <div>
          <Typography id="bio-typography" gutterBottom>Bio:</Typography>
          <Typography>{ bio }</Typography>
          <Button variant="contained" onClick={ () => setShowBio(true) }>Edit Bio</Button>
        </div>
      ) }
      { showBio && (
        <Button variant="contained" onClick={ handleBioSave }>Set Bio</Button>
      ) }
      <div>
      </div>
      {allSaved ? (
        <div>
          <Typography id="confirm" gutterBottom> Ready to Submit? </Typography>
          <Button variant="contained" onClick={ submitNewUserInfo }>Submit</Button>
        </div>
      ) : null}
    </div>
  );
};

/**
 SLIDER IF NEEDED

   const marks = [
    {
      value: 0,
      label: 'Gender 1',
    },
    {
      value: 50,
      label: 'Gender 2',
    },
    {
      value: 100,
      label: 'Gender 3',
    },
  ];

  const valuetext = (value) => {
    return `${value}`;
  };

  const valueLabelFormat = (value) => {
    return marks.findIndex((mark) => mark.value === value) + 1;
  };

  <Slider
  aria-label="Restricted values"
  defaultValue={20}
  valueLabelFormat={valueLabelFormat}
  getAriaValueText={valuetext}
  step={null}
  valueLabelDisplay="auto"
  marks={marks}
  />
          <Typography variant="h7" gutterBottom>Your New Profile Information</Typography>
        <Typography id="username-test" gutterBottom>Username: { username }</Typography>
        <Typography id="gender-test" gutterBottom>Gender: { selectedGender }</Typography>
 */

export default NewUser;
