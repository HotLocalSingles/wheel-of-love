import React, { Fragment, useState, useEffect } from 'react';
import { IconButton, FormControl, Container, Divider, TextField, Box, Grid, Typography, List, ListItem, ListItemText, Avatar, Paper } from '@mui/material';
import { io } from 'socket.io-client';

const Chat = ({ initialUser, selectedUser }) => {
  //create room using the two user IDs
  const room = [initialUser.id, selectedUser.id].join("-");
  // console.log(room);
  //states for user and messages
  // const [selectUser, setSelectUser] = useState(initialUser ? initialUser.name : '');
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [nickname, setNickname] = useState(initialUser.name);
  const [socket, setSocket] = useState(null);

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


    //listen for chat-message event
    socket.on('private-chat-message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    //disconnect the socket when the component unmounts
    return () => {
      socket.disconnect('GoodBye');
    };
  }, [socket]);

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
  //add styling later
  const listChatMessages = messages.map((messageObj, index) => {
    //find the conversation with the matching room
    const conversation = conversations.find(convo => convo.room === room);
    //if the conversation doesn't exist or doesn't have any messages, return null
    if (!conversation || !conversation.messages) { return null; }
    //map through the messages in the conversation
    return conversation.messages.map((message, messageIndex) => (
      <ListItem key={messageIndex}>
        <ListItemText primary={`${message.nickname}: ${message.content}`} />
      </ListItem>
    ));
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
      //emit the message with socket
      // console.log(newMessage);
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
                    sx={{
                      border: 1,
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
