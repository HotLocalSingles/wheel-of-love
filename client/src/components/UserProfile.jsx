import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Material UI:
import { Avatar, Box, TextField } from '@mui/material';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

const UserProfile = ({ user, setUser }) => {

  const [isEditing, setEditState] = useState(false);
  const [editedName, setEditedName] = useState(user.name);


  //Click edit button, set state to true so conditional rendering occurs
  const handleEditClick = () => {
    setEditState((prevState) => !prevState);
  };

  //When the Submit Button is clicked, update the user name in the database
  const handleSubmitClick = async () => {

    try {
      const response = await axios.put(`/users/${ user.name }`, { name: editedName });

      if (!response.data) {
        throw response;
      }
      //THIS IS UPDATING THE APP STATE, PASSED DOWN FROM PARENT
      setUser(response.data);

    } catch (error) {
      console.log('Client Side Update of User Name Did Not Work', error);
    }

    //Setting the edit state back to false to now show the edit field
    setEditState((prevState) => !prevState);

  };

  const handleCancelClick = () => {
    setEditedName(user.name);
    setEditState((prevState) => !prevState);
  };

  //If the user clicks the edit button, show a text box where they can edit their name and submit it
  return (
    <div>
      <div>
        <Avatar alt="User Profile Image" src={ user.picture } sx={{ width: 80, height: 80 }} referrerPolicy="no-referrer"/>
        { isEditing ? <> </> : <EditOutlinedIcon onClick={ handleEditClick } size="small" />}
        {isEditing ? (
          <div>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <TextField
                  required
                  size="small"
                  id="outlined-basic"
                  label="Edit Name"
                  helperText="Please enter your new name"
                  defaultValue={ user.name }
                  onChange={(event) => setEditedName(event.target.value)}
                />
                <SaveAltIcon onClick={ handleSubmitClick } size="large" />
                <DeleteForeverRoundedIcon size="large" onClick={ handleCancelClick }/>
              </div>
            </Box>
          </div>) : ( user.name )}
      </div>
    </div>
  );
};




export default UserProfile;


