import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

//Material UI
import { FormControl, InputLabel, Select, MenuItem, } from '@mui/material';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';

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
  const [matchName, setMatchName] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setMatchName(event.target.value);
  };

  const navigateToMatchPage = () => {
    navigate(`/matchPage/${ matchName }`);
  };

  useEffect(() => {
    renderNameButton();
  }, []);

  const renderNameButton = () => {
    if (matchName) {
      return (
        <ArrowForwardOutlinedIcon onClick={navigateToMatchPage} />
      );
    } else {
      return null;
    }
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="medium">
      <InputLabel id="demo-simple-select-label">Matches</InputLabel>
      <Select
        value={matchName}
        label="Matches"
        onChange={handleChange}
      >
        {exampleData.map((user) => (
          <MenuItem key={user.name} value={user.name}>
            {user.name}
          </MenuItem>
        ))}
      </Select>
      {renderNameButton()}
    </FormControl>
  );
};

export default MatchSelect;
