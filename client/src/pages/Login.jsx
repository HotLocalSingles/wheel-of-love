import React from 'react';
import { Button } from '@mui/material';


const Login = ({ login }) => {
  
  //The login function is from the App.jsx and changes the state there. Using the material UI Button

  return (
    <div>
      <h1>Login with Google</h1>
      <Button variant="contained" size="medium" onClick={login}>Login with Google</Button>
    </div>
  );
};

export default Login;
