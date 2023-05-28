import React, { Fragment, useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { io } from 'socket.io-client';


const Chat = ({ initialUser, selectedUser }) => {
  //create room using the two user IDs
  const room = [initialUser.id, selectedUser.id].sort().join("-"); //works
  console.log(room);
  //states for user and messages
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [nickname, setNickname] = useState(initialUser.name);

  useEffect(() => {
    //create the socket instance and connect to the server
    const socket = io('http://localhost:3000', {
      query: {
        userId: initialUser.id,
      }
    });
    setSocket(socket);
    //join the chat room
    socket.emit('private-chat', {
      senderId: initialUser.id,
      receiverId: selectedUser.id,
      room: room
    });

    //disconnect the socket when the component unmounts
    return () => {
      socket.disconnect('GoodBye');
    };
  }, []);

  //fetch messages from the server
  const fetchMessages = async () => {
    const res = await fetch('/chats/conversations');
    const data = await res.json();
    // console.log(data); //[ { room: 'blah', messages: [] } ]
    setConversations(data);
  };
  
  //get the message from the database on mount
  useEffect(() => {
    fetchMessages();
  }, []);


  //listChatMessages will display all the messages in the state array 'messages'
  //and create a listItem from each message obj
  const listChatMessages = messages.map((messageObj, index) => {
    return (
      <ListItem
        key={index}
        sx={{
          display: 'flex',
          justifyContent: messageObj.senderId === selectedUser.id ? 'flex-end' : 'flex-start',
        }}
      >
        <ListItemText
          primary={`${messageObj.nickname}: ${messageObj.message}`}
          sx={{
            display: 'inline-block',
            padding: '10px',
            borderRadius: '5px',
            backgroundImage: 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bolder',
            position: 'relative',
            zIndex: '1',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            backgroundColor: 'black',
            border: '2px solid #a738ff',
            zIndex: '0',
          }}
        />
      </ListItem>
    );
  });


  const sendMessage = () => {
    //check if nickname and message are not empty
    if (socket && nickname && message && selectedUser) {
      //create a new message object
      const newMessage = {
        nickname: nickname,
        senderId: initialUser.id,
        receiverId: selectedUser.id,
        message: message,
        room: room
      };
      //check if a conversation already exists for the room
      const conversation = conversations.filter(convo => convo.room === room);

      //if the conversation exists, add the message to it
      //if it doesn't, create a new conversation
      //do it here because listChatMessages re-renders too much
      if (conversation[0] && conversation[0].messages) {
        conversation[0].messages.push(newMessage);
        setSelectedConversation(conversation[0]);
      } else {
        setConversations(prevConversations => [...prevConversations, { room: room, messages: [newMessage] }]);
        setSelectedConversation(conversation[0]);
      }
      //emit the message with socket
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
      <Typography
        sx={{
          display: 'inline-block',
          padding: '10px',
          borderRadius: '5px',
          border: '2px solid #a738ff',
          background: 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: 'bold',
        }}>
              Now Chatting with {selectedUser.name}
      </Typography>
      <Container sx={{
        height: "600px",
        width: "600px",
        backgroundImage: 'url(https://i.gifer.com/Ctsx.gif)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <Paper elevation={6} sx={{
          backgroundColor: 'rgba(0, 0, 255, 0)'
        }}>
          <Box padding={3}>
            <Divider />
            <Grid container spacing={4} alignItems="center"
              sx={{ backgroundColor: 'rgba(0, 0, 255, 0)' }}>
              <Grid item id='chatBox' xs={20}>
                <List id='chatBoxMessages' sx={{
                  height: '300px',
                  width: '300px',
                  backgroundColor: 'rgba(0, 0, 255, 0)'
                }}>
                  { listChatMessages }
                </List>
              </Grid>
              <Grid xs={6} item>
                <FormControl fullWidth>
                  <TextField
                    sx={{
                      border: 1,
                      borderRadius: '5px',
                      backgroundColor: '#c7b4a7'
                    }}
                    onKeyPress={ handleKeyPress }
                    onChange={ (e) => setMessage(e.target.value) }
                    value={ message }
                    label="What would you like to say?"
                    variant="outlined"/>
                </FormControl>
              </Grid>
              <Grid item xs={1}>
                <IconButton
                  sx={{ backgroundColor: '#c7b4a7'}}
                  onClick={ sendMessage }
                  fontSize='large'>Send
                </IconButton>
              </Grid>
            </Grid>
          </Box>
          <Grid item xs={2}>
            <FormControl fullWidth>
              <TextField
                sx={{
                  backgroundColor: '#c7b4a7',
                  color: 'black',
                  fontWeight: '800',
                  width: '200px',
                  borderRadius: '5px'
                }}
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
