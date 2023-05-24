import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';

// Material UI:
import { Avatar, Button, Box, TextField } from '@mui/material';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const UserProfile = ({ user, setUser }) => {
//User is the logged in user
//The referrerPolicy allows us to print the image that google gives us
  const [isEditing, setEditState] = useState(false);
  const [editedName, setEditedName] = useState(user.name);


  const handleEditClick = () => {
    setEditState((prevState) => !prevState);
  };

  const handleSubmitClick = async () => {
    setEditState((prevState) => !prevState);

    try {
      const response = await axios.put(`/users/${ user.name }`, { name: editedName });

      if (!response.data) {
        throw response;
      }


    } catch (error) {
      console.log('put request did not work')
    }

  };

  return (
    <div>
      <div>
        <Avatar alt="User Profile Image" src={ user.picture } sx={{ width: 80, height: 80 }} referrerPolicy="no-referrer"/>
        { isEditing ? <> </> : <EditOutlinedIcon onClick={ handleEditClick } size="small"></EditOutlinedIcon>}
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
                  defaultValue={ user.name }
                  onChange={(event) => setEditedName(event.target.value)}
                />
                <SaveAltIcon onClick={ handleSubmitClick } size="large"></SaveAltIcon>
              </div>
            </Box>
          </div>) : ( user.name )}
      </div>
    </div>
  );
};




export default UserProfile;


