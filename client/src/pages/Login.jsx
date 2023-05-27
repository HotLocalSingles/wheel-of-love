import React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import '../../../styles/login.css';


const Login = ({ login }) => {

  //The login function is from the App.jsx and changes the state there. Using the material UI Button

  return (
    <div className="login-container">
      <Grid
        container
        component="main"
        className="login-grid"
      >
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          className="login-paper"
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">Sign in</Typography>
            <Box sx={{ mt: 1 }}>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: '#926aa6' }}
                onClick={login}
              >
                Login with Google
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
