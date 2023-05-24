import React, { Fragment, useState, useEffect } from 'react';
import { IconButton, FormControl, Container, Divider, TextField, Box, Grid, Typography, List, ListItem, ListItemText, Avatar, Paper } from '@mui/material';
import MessageObj from './model/MessageObj.js';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

const Chat = ({ initialUser }) => {
  //states for user and messages
  // const [user, setUser] = useState(initialUser ? initialUser : '');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [nickname, setNickname] = useState(initialUser);


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
    // Check if nickname and message are not empty
    if (nickname && message) {
      // Create a new message object
      const newMessage = new MessageObj(nickname, message);
      // Emit the message with socket
      socket.emit('chat-message', newMessage);
      console.log(message, nickname);
      // Update the state with the new message
      setMessages([...messages, newMessage]);
      // Clear the message input
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  useEffect(() => {

    socket.on('chat-message', (incomingMessage) => {
      console.log('chat received');
      setMessages((prevMessages) => [...prevMessages, incomingMessage]);
    });
    return () => {
      socket.off('GoodBye');
    };
  }, []);

  const handleNicknameChange = (event) => {
    setNickname(event.target.value);
  };

  // Use useEffect to initialize tempNickname with initialUser when the component mounts
  useEffect(() => {
    setNickname(initialUser);
  }, [initialUser]);
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
                    onChange={ (e) => handleNicknameChange(e) }
                    value={ nickname }
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
