import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Material UI:
import { Avatar, Box, TextField } from '@mui/material';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

const UserProfile = ({ user, setUser }) => {

  const [isEditing, setEditState] = useState(false);
  const [editedName, setEditedName] = useState(user.name);


  const handleEditClick = () => {
    setEditState((prevState) => !prevState);
  };

  const handleSubmitClick = async () => {

    try {
      const response = await axios.put(`/users/${ user.name }`, { name: editedName });

      if (!response.data) {
        throw response;
      }
      setUser(response.data);

    } catch (error) {
      console.log('Client Side Update of User Name Did Not Work', error);
    }

    setEditState((prevState) => !prevState);

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


