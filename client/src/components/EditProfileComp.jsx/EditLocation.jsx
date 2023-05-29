import React from 'react';
import { Box, TextField, Typography, Alert } from '@mui/material';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

const EditLocation = ({ user, editedLocation, setEditedLocation }) => (
  <div>
    <Box component="form" sx={{ '& .MuiTextField-root': { m: 1, } }} noValidate autoComplete="off">
      <div>
        <TextField required size="small" id="outlined-basic" label="Edit Location" value={editedLocation} onChange={(event) => setEditedLocation(event.target.value)} />
        {editedLocation === user.location ? null : <DeleteForeverRoundedIcon size="large" onClick={() => setEditedLocation(user.location)} />}
        { editedLocation === user.location ? null : <Alert severity="warning">You better be spelling that city name correctly!</Alert>}
      </div>
    </Box>
  </div>
);

export default EditLocation;
