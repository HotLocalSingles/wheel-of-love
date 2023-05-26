import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Grid } from '@mui/material';
import UserProfile from '../components/UserProfile.jsx';
import EditSpecific from '../components/EditSpecific.jsx';
import Icebreaker from '../components/Icebreaker.jsx';
import Vibe from '../components/Vibe.jsx';
import MatchSelect from '../Old Components/MatchSelect.jsx';
// import Chat from '../components/Chat.jsx';
import io from 'socket.io-client';
import Matches from '../components/Matches.jsx';
import Navbar from '../components/NavBar.jsx';
// import NewUser from './NewUser.jsx';

import Wheel from '../components/Wheel.jsx';
import Conversations from '../components/Conversations.jsx';


const Home = ({ user, handleLogout, setUser }) => {
  const [socket, setSocket] = useState(null);
  const [editing, setEditing] = useState(false);
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
    const socket = io('http://localhost:3000');
    setSocket(socket);
    return () => {
      //disconnect the socket when the component unmounts
      socket.off('GoodBye');
    };
  }, []);

  return (
    <div>
      <Navbar />
      {/* <NewUser user={ user } setUser={ setUser }/> */}
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <UserProfile user={user} setUser={setUser} editing={ editing } setEditing={ setEditing }/>
          { editing ? null : <Button variant="outlined" color="secondary" size="medium" onClick= { () => setEditing(true) }>Edit Profile</Button>}
          <Icebreaker user={ user } />
        </Grid>
        <Grid item xs={6}>
          <Matches user={user} />
        </Grid>
      </Grid>
      <br />
      <Button variant="outlined" color="secondary" size="medium" onClick= { handleLogout }>See Messages</Button>
      <Conversations user={ user } socket={ socket }/>
      <br />
      <Button variant="outlined" color="error" size="medium" onClick={handleLogout}>Logout</Button>
      <br />
      <Wheel user={ user } socket={socket}/>
    </div>
  );
};

export default Home;
