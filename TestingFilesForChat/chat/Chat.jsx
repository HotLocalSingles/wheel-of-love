import React, { Fragment, useState } from 'react';
import { FormControl, Container, Divider, TextField, Button, Box, Grid, Typography, List, ListItem, ListItemText, SendIcon, Avatar, AppBar, Toolbar } from '@mui/material';
import MessageObj from './model/MessageObj.js';
import Bar from './TestingFilesForChat/bar/Bar.jsx';

export default Chat = () => {
  //states for user and messages
  const [user, setUser] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    //testing
    new MessageObj('Cyn', 'Ready to Rest')
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

  const sendMessage = (message) => {
    if (user && message) {
      //add functionality to send the message
      console.log('message send');
    }
  };

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
        <Bar />
        <Paper elevation={2}>
          <Box padding={3}>
            <Typography>
              {/* add maybe icebreaker here? */}
              Temp Title for Chatbox
            </Typography>
            <Divider />
            <Grid container spacing={4} alignItems="center">
              <Grid item id='chatBox' xs={10}>
                <List id='chatBoxMessages'>
                  { listChatMessages }
                </List>
              </Grid>
              <Grid item xs={2}>
                <FormControl fullWidth>
                  <TextField
                    onChange={ handleUserChange }
                    value={ user }
                    label="add a nickname"
                    variant="outlined"/>
                </FormControl>
              </Grid>
              <Grid xs={8} item>
                <FormControl fullWidth>
                  <TextField
                    onChange={ handleMessageChange }
                    value={ message }
                    label="What would you like to say?"
                    variant="outlined"/>
                </FormControl>
              </Grid>
              <Grid item xs={1}>
                <IconButton
                  onClick={ sendMessage }
                  aria-label='send'
                  color='pink'>
                  <SendIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Fragment>
  );
};
