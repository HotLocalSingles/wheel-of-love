import React, { Fragment, useState, useEffect } from 'react';

//importing from the specific endpoint takes less toll on computer
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

/*
The chat component is designed to take in the logged in user
and the user selected from the wheel or from clicking one of the matches.
Then allow those users to communicate in a private chat room in real time.
Messages are saved to mysql database so they can be rendered later
This component will also render any previous messages between the users
*/
const Chat = ({ initialUser, selectedUser }) => {
  //create room using the two user IDs so it will always be unique
  //sort so the room number for both people is consistent in database
  const room = [initialUser.id, selectedUser.id].sort().join("-"); //works
  console.log(room);
  //states for user and messages
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [nickname, setNickname] = useState(initialUser.name);
  const [socket, setSocket] = useState(null);

  //useEffect so 
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
      console.log('messages set from p-c-m');
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

  const fetchPreviousMessages = async (conversation) => {
    if (conversation && conversation.messages) {
      setMessages(conversation.messages);
    } else {
      setMessages([]);
    }
  };
  
  useEffect(() => {
    //fetch previous messages when the selectedConversation changes
    fetchPreviousMessages(selectedConversation);
  }, [selectedConversation]);


  //listChatMessages will display all the messages in the state array 'messages'
  //and create a listItem from each message obj
  //add styling later
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
    // console.log('sendMessage works before conditional'); //works
    //check if nickname and message are not empty
    if (socket && nickname && message && selectedUser) {
      // console.log('sendMessage working after conditional'); //works
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
                <List id='chatBoxMessages'
                  sx={{
                    height: '300px',
                    width: '300px',
                    backgroundColor: 'rgba(0, 0, 255, 0)',
                    height: '600px',
                    width: '400px',
                    backgroundColor: 'rgba(0, 0, 255, 0)',
                    overflowY: 'auto',
                    maxHeight: '400px',
                    overflow: 'auto'
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
