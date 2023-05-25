import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

const exampleData = [
  {
    name: 'Alex',
    location: 'New Orleans',
  },
  {
    name: 'Bryan',
    location: 'New Orleans',
  },
  {
    name: 'Cynthia',
    location: 'New Orleans',
  },
  {
    name: 'Logan',
    location: 'New Orleans',
  }
];

const MatchSelect = () => {
  const [personName, setPersonName] = React.useState('');

  const handleChange = (event) => {
    setPersonName(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="medium">
      <InputLabel id="demo-simple-select-label">Matches</InputLabel>
      <Select
        value={personName}
        label="Matches"
        onChange={handleChange}
      >
        {exampleData.map((user) => (
          <MenuItem
            key={user.name}
            value={user.name}
          >
            {user.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default MatchSelect;
