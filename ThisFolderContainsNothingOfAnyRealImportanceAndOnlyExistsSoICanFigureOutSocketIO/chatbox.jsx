import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Grid, Typography, List, ListItem, SendIcon, Avatar } from '@mui/material';
import io from 'socket.io-client';
import { makeStyles } from '@material-ui/core/styles';

//get socket instance to connect to server
//set autoConnect to false so we can call socket.connect() later when the user agrees to chat
const socket = io('localhost:3000', { autoConnect: false });

//chat message is the name of the event in the server side logic to catch the messages
socket.on('chat-message', data => {
  console.log(data);
});

//create the chatbox
export default ChatBoxReceiver = () => {
  //create the state  for the individual message and all messages
  //this way they can all be displayed
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  //useEffect to initiate the socket connection
  // useEffect(() => {
  //   socket;
  //   console.log(`Connecting socket...`);
  // }, []);

  //the return should use the Box from materialUI to make the actual container/chat box
  //the TextField as the input and the Button as the button
  return (
    <Box
      className="chatbox"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        height: '600px',
        width: '400px',
        border: '1px solid #4D050E',
        borderRadius: '4px',
        padding: '10px',
        backgroundColor: '#FFF0F5',
        marginBottom: '10px',
        textAlign: 'right'
      }}>
      <TextField>
        {/* variant="text"
        // onKeyDown={ (e) => e.key === 'Enter' ? : null }
        // value={  }
        // onChange={ (e) =>  }> */}
      </TextField>
      <Button variant='text' onClick={ () => {} }>SEND</Button>
    </Box>
  );
};
