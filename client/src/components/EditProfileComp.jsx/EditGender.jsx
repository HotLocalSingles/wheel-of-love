
import React from 'react';

// Material UI:
import { Typography, FormControl, InputLabel, Select, MenuItem,} from '@mui/material';

const EditGender = ({ user, editedGender, setEditedGender }) => {

  const genderChoices = ['Male', 'Female', 'Queer'];

  return (
    <div>
      {/* <Typography id="gender" gutterBottom>Gender:</Typography> */}
      <FormControl sx={{ m: 1, }} size="small">
        <InputLabel id="demo-simple-select-label">Genders</InputLabel>
        <Select value={editedGender} label="Genders" onChange={ (event) => setEditedGender(event.target.value) }>
          {genderChoices.map((gender) => (
            <MenuItem key={gender} value={gender}>{gender}</MenuItem>
          ))}
        </Select>
      </FormControl>

    </div>
  );
};

export default EditGender;
