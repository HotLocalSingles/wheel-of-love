import React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import styles from '../../../styles/login.css';
import '@fontsource/sacramento';


const Login = ({ login }) => {

  //The login function is from the App.jsx and changes the state there. Using the material UI Button

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} alignItems="center" style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <div className="neonBorderLogin" onClick={login} style={{ cursor: 'pointer' }}>
          <div className="neonText">
            <Typography variant="h1" fontFamily="Sacramento">Wheel of Love</Typography>
          </div>
        </div>
      </Grid>
    </Grid>

  );

};

export default Login;
