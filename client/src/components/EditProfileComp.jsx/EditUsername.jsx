
import React from 'react';

// Material UI:
import { Box, TextField, Typography, } from '@mui/material';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

const EditUsername = ({ user, editedUsername, setEditedUsername }) => {

  return (
    <div>
      <Box component="form" sx={{'& .MuiTextField-root': { m: 1, },}} noValidate autoComplete="off">
        <div>
          {/* <Typography id="username" gutterBottom>Username:</Typography> */}
          <TextField required size="small" id="outlined-basic" label="Edit Username" value={ editedUsername } onChange={(event) => setEditedUsername(event.target.value)} />
          { editedUsername === user.username ? null : <DeleteForeverRoundedIcon size="large" onClick={ () => setEditedUsername(user.username) }/>}
        </div>
      </Box>
    </div>
  );
};

export default EditUsername;
