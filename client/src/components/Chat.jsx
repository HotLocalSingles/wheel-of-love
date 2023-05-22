import React, { Fragment, useState } from 'react';
import { IconButton, FormControl, Container, Divider, TextField, Box, Grid, Typography, List, ListItem, ListItemText, Avatar, Paper } from '@mui/material';
import MessageObj from './model/MessageObj.js';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

const Chat = () => {
  //states for user and messages
  const [user, setUser] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  //listChatMessages will display all the messages in the state array 'messages'
  //and create a listItem from each message obj
  //add styling later
  const listChatMessages = messages.map((messageObj, index) => {
    return (
      <ListItem key={index}>
        <ListItemText primary={`${messageObj.user}: ${messageObj.message}`} />
      </ListItem>
    );
  });

  const sendMessage = () => {
    //check if user and message are not empty
    if (user && message) {
      //create a new message object
      const newMessage = new MessageObj(user, message);
      //update the current message on state
      setMessage(newMessage);
      //update the state with the new message
      setMessages([...messages, newMessage]);
      //clear the message input
      setMessage('');
      //emit the message with socket
      socket.emit('chat-message', newMessage);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  //establish a useEffect function to connect the user to the chat
  //when they agree to chat with selected user
  /* useEffect(() => {
    socket.emit('connect', { user, message }, (error) => {
      if (error) {
        console.error('Failed to connect to chat', error);
      }
    })
    return () => {
     socket.emit('disconnect');
      socket.off();
    }
  }, [user]);
*/

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
                    onChange={ (e) => setUser(e.target.value) }
                    value={ user }
                    label="add a nickname"
                    variant="outlined"/>
                </FormControl>
              </Grid>
              <Grid xs={6} item>
                <FormControl fullWidth>
                  <TextField
                    onKeyPress={ handleKeyPress }
                    onChange={ (e) => setMessage(e.target.value) }
                    value={ message }
                    label="What would you like to say?"
                    variant="outlined"/>
                </FormControl>
              </Grid>
              <Grid item xs={1}>
                <IconButton
                  onClick={ sendMessage }
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
