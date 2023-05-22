import React, { Fragment, useState, useEffect } from 'react';
import { IconButton, FormControl, Container, Divider, TextField, Button, Box, Grid, Typography, List, ListItem, ListItemText, Avatar, AppBar, Toolbar, Paper } from '@mui/material';
import MessageObj from './model/MessageObj.js';
// import Bar from './TestingFilesForChat/bar/Bar.jsx';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

const Chat = () => {
  //states for user and messages
  const [user, setUser] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    //testing
    new MessageObj(user, message)
  ]);

  //listChatMessages will display all the messages in the state array 'messages'
  //and create a listItem from each message obj
  //add styling later
  const listChatMessages = messages.map((messageObj, index) => {
    <ListItem key={index}>
      <ListItemText primary={`${messageObj.user}: ${messageObj.message}`} />
    </ListItem>;
  });

  //display the user's nickname
  const handleUserChange = (e) => {
    setUser(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const sendMessage = () => {
    //check if user and message are not empty
    if (user && message) {
      //create a new message object
      const newMessage = new MessageObj(user, message); //works
      //update the state with the new message
      setMessages([...messages, newMessage]); //don't know yet
      //clear the message input
      setMessage(''); //works
      console.log('message sent'); //works
      console.log(messages); //works
      //emit the message with socket
      socket.emit('chat-message', newMessage); //potentially works
    }
  };

  const handleSendMessage = () => {
    sendMessage(user, message);
  };

  //subscribe to the 'chat-message' event when the component mounts
  useEffect(() => {
    socket.on('chat-message', message);
    //clean up the event listener when the component unmounts
    return () => {
      socket.off('chat-message', message);
    };
  }, [messages]); //re-subscribe when 'messages' state changes


  /*
  The Fragment will allow us to combine multiple elements into one 'div'
  Paper is the styling that makes it look like paper
  Typography is what adds the text. First title of chatbox added. Rest are messages/user info
   and any other text on the chatbox.
  Divider provides a line between sections
  Grid for dividing up the sections: messages/user's name/message/TextField/send button
  xs = size/length
  */
  return (
    <Fragment>
      <Container>
        {/* <Bar /> */}
        <Paper elevation={6}>
          <Box padding={3}>
            <Typography>
              {/* add maybe icebreaker here? */}
              Temp Title for Chatbox
            </Typography>
            <Divider />
            <Grid container spacing={4} alignItems="center">
              <Grid item id='chatBox' xs={11}>
                <List id='chatBoxMessages'>
                  { listChatMessages }
                </List>
              </Grid>
              <Grid item xs={2}>
                <FormControl fullWidth>
                  <TextField
                    onChange={ (e) => handleUserChange(e) }
                    value={ user }
                    label="add a nickname"
                    variant="outlined"/>
                </FormControl>
              </Grid>
              <Grid xs={6} item>
                <FormControl fullWidth>
                  <TextField
                    onChange={ (e) => handleMessageChange(e) }
                    value={ message }
                    label="What would you like to say?"
                    variant="outlined"/>
                </FormControl>
              </Grid>
              <Grid item xs={1}>
                <IconButton
                  onClick={ handleSendMessage }
                  sx={{ 'color': 'pink'[500] }}
                  fontSize='large'>Send
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Fragment>
  );
};

export default Chat;
