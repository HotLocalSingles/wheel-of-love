import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Stack, TextField, Slider, Box } from '@mui/material';


const NewUser = () => {
  const marks = [
    {
      value: 0,
      label: 'Gender 1',
    },
    {
      value: 50,
      label: 'Gender 2',
    },
    {
      value: 100,
      label: 'Gender 3',
    },
  ];

  const valuetext = (value) => {
    return `${value}`;
  };

  const valueLabelFormat = (value) => {
    return marks.findIndex((mark) => mark.value === value) + 1;
  };

  return (
    <div>
      <h1>Looks Like You're a New User. Time to Add Some Information so the Local Singles Know What They're Getting Into!</h1>
      <Box sx={{ width: 300 }}>
        <Slider
          aria-label="Restricted values"
          defaultValue={20}
          valueLabelFormat={valueLabelFormat}
          getAriaValueText={valuetext}
          step={null}
          valueLabelDisplay="auto"
          marks={marks}
        />
      </Box>
      <TextField
        id="outlined-textarea"
        label="Introduce Yourself"
        multiline
        rows={4}
      />
    </div>
  );
};

export default NewUser;
