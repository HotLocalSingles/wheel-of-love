import React, { Fragment, useState, useEffect } from 'react';
import { IconButton, FormControl, Container, Divider, TextField, Box, Grid, Typography, List, ListItem, ListItemText, Avatar, Paper } from '@mui/material';
import MessageObj from './MessageObj.jsx';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3000');

const Chat = ({ initialUser, selectedUser }) => {
  //states for user and messages
  // const [user, setUser] = useState(initialUser ? initialUser.name : '');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [nickname, setNickname] = useState(initialUser.name);


  //listChatMessages will display all the messages in the state array 'messages'
  //and create a listItem from each message obj
  //add styling later
  const listChatMessages = messages.map((messageObj, index) => {
    // console.log(messages);
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
      const newMessage = MessageObj(nickname, message, initialUser.username, selectedUser.username);
      // Emit the message with socket
      console.log(newMessage);
      socket.emit('chat-message', newMessage);
      // console.log(nickname, message, selectedUser.username);
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

  //create the use effect to join two users
  useEffect(() => {
    //on join-chat, connect the usernames
    socket.emit('join-chat', (initialUser.username, selectedUser.username));
  }, [initialUser.username]);

  useEffect(() => {

    socket.on('chat-message', (incomingMessage) => {
      console.log('chat received', incomingMessage);
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
    setNickname(initialUser.name);
  }, [initialUser.name]);
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
              <Grid item id='chatBox' xs={20}>
                <List id='chatBoxMessages'>
                  { listChatMessages }
                </List>
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
          <Grid item xs={2}>
            <FormControl fullWidth>
              <TextField
                onChange={ (e) => handleNicknameChange(e) }
                value={ nickname }
                label="add a nickname"
                variant="outlined"/>
            </FormControl>
          </Grid>
        </Paper>
      </Container>
    </Fragment>
  );
};

export default Chat;
