import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@mui/material';
import UserProfile from '../components/UserProfile.jsx';
import Icebreaker from '../components/Icebreaker.jsx';
import Vibe from '../components/Vibe.jsx';
import MatchSelect from '../components/MatchSelect.jsx';
// import Chat from '../components/Chat.jsx';
import io from 'socket.io-client';
import Wheel from '../components/Wheel.jsx';
import Conversations from '../components/Conversations.jsx';


const Home = ({ user, handleLogout, setUser }) => {
  const [socket, setSocket] = useState(null);
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
      <h1>Home</h1>
      <UserProfile user={ user } setUser={ setUser }/>
      <Vibe />
      <Icebreaker user={ user } />
      <MatchSelect />
      <br />
      <Button variant="outlined" color="secondary" size="medium" onClick= { handleLogout }>See Messages</Button>
      <Conversations user={ user } socket={ socket }/>
      <br />
      <Button variant="outlined" color="error" size="medium" onClick={ handleLogout }>Logout</Button>
      <br/>
      <br />
      <Wheel user={ user } socket={socket}/>
    </div>
  );
};

export default Home;
