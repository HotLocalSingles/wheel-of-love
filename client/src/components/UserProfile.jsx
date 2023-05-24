import React, { useEffect, useState } from 'react';
import { useNavigate, Navigate } from "react-router-dom";
import axios from 'axios';

// Material UI:
import { Avatar, Button, Box, TextField } from '@mui/material';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const UserProfile = ({ user }) => {
//User is the logged in user
//The referrerPolicy allows us to print the image that google gives us
  const [isEditing, setEditState] = useState(false);

  const handleEditClick = () => {
    setEditState((prevState) => !prevState);
  };

  return (
    <div>
      <div>
        <h1>User Profile</h1>
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
                />
                <SaveAltIcon onClick={ handleEditClick } size="large"></SaveAltIcon>
              </div>
            </Box>
          </div>) : ( user.name )}
      </div>
    </div>
  );
};




export default UserProfile;


