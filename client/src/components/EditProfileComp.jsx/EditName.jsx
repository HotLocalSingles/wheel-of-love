
import React from 'react';

// Material UI:
import { Box, TextField, } from '@mui/material';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

const EditName = ({ user, editedName, setEditedName }) => {

  return (
    <div>
      <Box component="form" sx={{'& .MuiTextField-root': { m: 1},}} noValidate autoComplete="off">
        <div>
          <TextField required size="small" id="outlined-basic" label="Edit Name" value={ editedName } onChange={(event) => setEditedName(event.target.value)} />
          { editedName === user.name ? null : <DeleteForeverRoundedIcon size="large" onClick={ () => setEditedName(user.name) }/>}
        </div>
      </Box>
    </div>
  );
};

export default EditName;
