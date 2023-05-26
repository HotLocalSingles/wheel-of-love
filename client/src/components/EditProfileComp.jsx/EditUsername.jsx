
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

// Material UI:
import { Avatar, Box, TextField, Typography, Grid, Button, Alert } from '@mui/material';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

const EditUsername = ({ user, editedUsername, setEditedUsername }) => {

  return (
    <div>
      <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '25ch' },}} noValidate autoComplete="off">
        <div>
          <Typography id="username" gutterBottom>Username:</Typography>
          <TextField required size="small" id="outlined-basic" label="Edit Username" value={ editedUsername } onChange={(event) => setEditedUsername(event.target.value)} />
          { editedUsername === user.username ? null : <DeleteForeverRoundedIcon size="large" onClick={ () => setEditedUsername(user.username) }/>}
        </div>
      </Box>
    </div>
  );
};




export default EditUsername;


