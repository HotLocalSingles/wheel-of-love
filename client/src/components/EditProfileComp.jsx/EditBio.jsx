
import React from 'react';

// Material UI:
import { Box, TextField, Button } from '@mui/material';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

const EditBio = ({ user, setIsEditingBio, editedBio, setEditedBio, submitNewBio }) => {

  const handleCancelBio = () => {
    setEditedBio(user.bio);
    setIsEditingBio(false);
  };

  const handleDoneBio = () => {
    submitNewBio();
  };

  return (
    <div>
      <TextField id="bio" value={editedBio} variant="outlined" onChange={ (event) => setEditedBio(event.target.value) }multiline rows={3} style={{ paddingRight: '2px', paddingBottom: '3px' }} />
      <Button variant="contained" color="secondary" size="medium" onClick={ handleDoneBio }>Save Bio</Button>
      <Button variant="outlined" color="error" size="medium" onClick={ handleCancelBio }>Cancel</Button>
    </div>
  );
};

export default EditBio;
