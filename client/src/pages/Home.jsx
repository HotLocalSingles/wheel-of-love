import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import UserProfile from '../components/UserProfile.jsx';
import Icebreaker from '../components/Icebreaker.jsx';
import Vibe from '../components/Vibe.jsx';
import Chat from '../components/Chat.jsx';
import io from 'socket.io-client';
import Matches from '../components/Matches.jsx';
import Navbar from '../components/NavBar.jsx';
// import NewUser from './NewUser.jsx';
import Photos from '../components/Photos.jsx';
import OptionsList from '../components/HomePieces/OptionsList.jsx';

import Wheel from '../components/Wheel.jsx';

//Material UI
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// import '../../../styles/login.css';



const classes = {
  root: {
    flexGrow: 1
  },
  paper: {
    padding: 20,
    textAlign: "center",
  }
};


const Home = ({ user }) => {
  const [socket, setSocket] = useState(null);
  const [selectedUser, getSelectedUser] = useState(null);


  const [isChatting, setIsChatting] = useState(false);
  //The handleLogout is referring to the function in App.jsx and is changing the state in there
  //Button is from the material ui
  const navigate = useNavigate();

  useEffect(() => {
    if (user.username === null) {
      navigate('/newUser');
    }
  }, []);

  useEffect(() => {
    //create the socket instance
    const socket = io('http://localhost:3000', {
      query: {
        userId: user.id,
      }
    });
    setSocket(socket);
    return () => {
      //disconnect the socket when the component unmounts
      socket.disconnect('GoodBye');
    };
  }, []);

  return (
    <div>
      <div style={classes.root}>
        <Grid container spacing={3}>

          {/* Wheel Box */}
          {isChatting ? (
            <Grid container item xs={12} spacing={3} alignItems="center">
              <Grid item xs={12} sm={2}>
                <Button type='outlined' align="center" onClick={ () => navigate('/') }>Back to Main</Button>
              </Grid>
              <Grid item xs={12} sm={10}>
                <Paper style={classes.paper}>
                  <Typography variant="h6" align="center">Chat</Typography>
                  <Chat initialUser={user} selectedUser={selectedUser} />
                </Paper>
              </Grid>
            </Grid>
          ) : (
            <Grid item xs={12} sm={6}>
              <Button type='outlined' align="center" onClick={ () => navigate('/') }>Back to Main</Button>
              <Wheel user={user} socket={socket} setIsChatting={setIsChatting} getSelectedUser={getSelectedUser} />
            </Grid>
          )}
        </Grid>
      </div>
    </div>
  );
};

export default Home;
