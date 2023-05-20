import React, { Fragment, useState } from 'react';
import { Container, Divider, TextField, Button, Box, Grid, Typography, List, ListItem, ListItemText, SendIcon, Avatar, AppBar, Toolbar } from '@mui/material';

export default Chat = () => {

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const listChatMessages = setMessages.map((messageObj, index) => {
    <ListItem key={index}>
      <ListItemText primary={`${messageObj.user}: ${messageObj.message}`} />
    </ListItem>;
  });

  return (
    <Fragment>
      <Container>
        <Paper elevation={5}>
          <Box padding={3}>
            <Typography>
              {/* add maybe icebreaker here? */}
              Temp Title for Chatbox
            </Typography>
            <Divider />
            <Grid container spacing={4} alignItems="center">
              <Grid item>
                <List>
                  {listChatMessages}
                </List>
              </Grid>
              <Grid item></Grid>
              <Grid item></Grid>
              <Grid item></Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Fragment>
  );
};
