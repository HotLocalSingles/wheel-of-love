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

import Wheel from '../components/Wheel.jsx';
import Conversations from '../components/Conversations.jsx';

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


const Home = ({ user, handleLogout, setUser }) => {
  const [socket, setSocket] = useState(null);
  const [editing, setEditing] = useState(false);
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
        userId: user.username,
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

          {/* Top Bar */}
          <Grid container item xs={12} spacing={3} alignItems="center">
            <Grid item xs={4}>
              <div className="neonText">
                <Typography variant="h4" align="left" fontFamily="Sacramento">Wheel of Love</Typography>
              </div>
            </Grid>
            <Grid item xs={4}>
              {/* <Conversations user={user} socket={socket} /> */}
            </Grid>

            <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button variant="outlined" color="error" size="medium" onClick={handleLogout}>Logout</Button>
            </Grid>
          </Grid>

          {/* Profile Box */}
          <Grid item xs={12} sm={8} alignItems="center">
            <div className="neonBorder">
              <Grid item xs={12}>
                <Paper style={classes.paper}>
                  <UserProfile user={user} setUser={setUser} editing={editing} setEditing={setEditing} />
                  {editing ? null : (
                    <Button variant="outlined" color="secondary" size="medium" onClick={() => setEditing(true)}>Edit Profile</Button>
                  )}
                </Paper>
              </Grid>
            </div>
          </Grid>

          {/* Matches Box */}

          <Grid item xs={12} sm={4} alignItems="center" style={{ backgroundColor: 'white' }}>
            <div className="neonBorder">
              <Grid item xs={12} alignItems="center" >
                <Typography variant="h6" align="center">Matches</Typography>
                <Matches user={user} />
              </Grid>
              <Grid item xs={12} alignItems="center">
                <Typography variant="h6" align="center">Icebreaker</Typography>
                <Icebreaker user={user} />
              </Grid>
            </div>
          </Grid>


          {/* Wheel Box */}
          {isChatting ? (
            <Grid container item xs={12} spacing={3} alignItems="center">
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" align="center">Wheel</Typography>
                <Wheel user={user} socket={socket} setIsChatting={setIsChatting} getSelectedUser={getSelectedUser} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Paper style={classes.paper}>
                  <Typography variant="h6" align="center">Chat</Typography>
                  <Chat initialUser={user} selectedUser={selectedUser} />
                </Paper>
              </Grid>
            </Grid>
          ) : (
            <Grid item xs={12} sm={6}>
              <Wheel user={user} socket={socket} setIsChatting={setIsChatting} getSelectedUser={getSelectedUser} />
            </Grid>
          )}
        </Grid>
      </div>
    </div>
  );
};

export default Home;
