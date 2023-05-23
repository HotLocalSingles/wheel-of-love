import React from 'react';
import { Button } from '@mui/material';


const Login = ({ login }) => {
  
  return (
    <div>
      <h1>Login with Google</h1>
      <Button variant="contained" size="medium" onClick={login}>Login with Google</Button>
    </div>
  );
};

export default Login;
