import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';

const MatchPage = () => {
  const navigate = useNavigate();
  const { matchName } = useParams();
  const [stateMatchName, setStateMatchName] = useState(null);

  useEffect(() => {
    setStateMatchName(matchName);
  }, [matchName]);

  const navigateToHome = () => {
    navigate('/');
  };

  return (
    <div>
      <h1>Welcome to {stateMatchName}'s Profile</h1>
      <Button onClick={navigateToHome} variant="contained">
        Back to Home
      </Button>
    </div>
  );
};

export default MatchPage;
