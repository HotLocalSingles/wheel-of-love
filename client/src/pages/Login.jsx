import React from 'react';
import { Button, Typography, Box } from '@mui/material';


const Login = ({ login }) => {

  //The login function is from the App.jsx and changes the state there. Using the material UI Button

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>Login with Google</Typography>
        <Button variant="contained" size="medium" onClick={login}>
            Login with Google
        </Button>
      </div>
    </Box>
  );
  
};

export default Login;
