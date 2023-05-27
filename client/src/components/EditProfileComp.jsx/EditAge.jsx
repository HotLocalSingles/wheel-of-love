import React from 'react';
import {Slider, Typography} from '@mui/material';

const EditAge = ({ user, editedAge, setEditedAge }) => {

  const range = 5;

  const maxAge = user.age + range;
  const minAge = user.age - range;

  return (
    <div>
      <Typography id="age" gutterBottom>Age: { editedAge }</Typography>
      <Slider id="age-slider" value={ editedAge } min={ minAge } max={ maxAge } step={ 1 } onChange={ (event) => setEditedAge(event.target.value) } aria-labelledby="age-slider" />
    </div>

  );
};

export default EditAge;
