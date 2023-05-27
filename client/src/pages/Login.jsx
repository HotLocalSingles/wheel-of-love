import React from 'react';
import { Button, Typography, Box, Grid, Avatar, Paper } from '@mui/material';


const Login = ({ login }) => {

  //The login function is from the App.jsx and changes the state there. Using the material UI Button

  return (
    <div
      style={{
        height: '100vh',
        backgroundImage: 'url(https://i.imgur.com/rxlrajy_d.webp?maxwidth=760&fidelity=grand)',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Grid
        container
        component="main"
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
      >
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            p: 4,
            border: '10px solid #6a7ea6',
            boxShadow: '0 0 0 4px #140e17',
            borderRadius: '50%',
            //Get rid of these if you want the box back:
            width: '50vh',
            height: '50vh',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box sx={{ mt: 1 }}>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2, backgroundColor: '#926aa6' }}
                onClick={ login }
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
