import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


//Material UI
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';


// import '../../../styles/login.css';

const style = {
  align: "center",
  border: '1px solid black'
};


const Main = ({ user, handleLogout, setUser }) => {

  return (
    <div className="pageContainer">
      <Grid container style={style}>
        {/* Left Grid */}
        <Grid container xs={6} sm={6} style={style}>
          <Typography variant="h3" align="center">Left Column</Typography>
          <Grid container xs={12} style={style}>
            <Grid item xs={12} style={style}>
              <Typography variant="h4" align="center">Wheel of Love</Typography>
            </Grid>
            <Grid item xs={6} style={style}>
              <Typography variant="h6" align="center">Profile</Typography>
            </Grid>
            <Grid item xs={6} style={style}>
              <Typography variant="h6" align="center">Matches</Typography>
            </Grid>
            <Grid item xs={6} style={style}>
              <Typography variant="h6" align="center">Ice Breaker</Typography>
            </Grid>
            <Grid item xs={6} style={style}>
              <Typography variant="h6" align="center">Wheel/Chat</Typography>
            </Grid>
          </Grid>
        </Grid>
        {/* Right Grid */}
        <Grid container xs={6} sm={6} style={style}>
          <Typography variant="h3" align="center">Right Column</Typography>
          <Grid container xs={12} style={style}>
            <Typography variant="h4" align="center">Right Insides</Typography>
          </Grid>
        </Grid>

      </Grid>
    </div>
  );
  
};

export default Main;
