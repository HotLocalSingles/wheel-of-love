import React, { Fragment, useState, useEffect } from 'react';
import { IconButton, FormControl, Container, Divider, TextField, Box, Grid, Typography, List, ListItem, ListItemText, Avatar, Paper } from '@mui/material';
import { io } from 'socket.io-client';

const Chat = ({ initialUser, selectedUser }) => {
  //room
  const room = 'randomRoomForNow';
  //states for user and messages
  // const [selectUser, setSelectUser] = useState(initialUser ? initialUser.name : '');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [nickname, setNickname] = useState(initialUser.name);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    //create the socket instance and connect to the server
    const socket = io('http://localhost:3000');
    setSocket(socket);
    //join the chat room
    socket.emit('private-chat', {
      senderId: initialUser.username,
      receiverId: selectedUser.username,
      room: room
    });


    //listen for chat-message event
    socket.on('private-chat-message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    //disconnect the socket when the component unmounts
    return () => {
      socket.disconnect('GoodBye');
    };
  }, []);


  //listChatMessages will display all the messages in the state array 'messages'
  //and create a listItem from each message obj
  //add styling later
  const listChatMessages = messages.map((messageObj, index) => {
    return (
      <ListItem key={index}>
        <ListItemText primary={`${messageObj.nickname}: ${messageObj.message}`} />
      </ListItem>
    );
  });


  const sendMessage = () => {
    //check if nickname and message are not empty
    if (socket && nickname && message && selectedUser) {
      //create a new message object
      const newMessage = {
        nickname: nickname,
        senderId: initialUser.username,
        receiverId: selectedUser.username,
        message: message,
        room: room
      };
      //emit the message with socket
      console.log(newMessage);
      socket.emit('private-chat-message', newMessage);
      //update the state with the new message
      setMessages([...messages, newMessage]);
      //clear the message input
      setMessage('');
    }
  };


  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

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
