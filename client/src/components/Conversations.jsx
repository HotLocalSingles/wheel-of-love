import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Container } from '@mui/material';
// import Chat from '../components/Chat.jsx';

/*the conversations component will render a list of all the conversations.
it will allow conversations to be clicked and render the information from the chat
between users/matches as well as relevant information about each user (profile name)
If time permits, I will make the profile name's clickable.
*/
const Conversations = ({ user, socket }) => {
  console.log(user);
  const [conversations, setConversations] = useState([]);

  //create a conversation object
  const conversation = {
    id,
    title: `${user.name} and ${conversation.match}`,
    messages: [],
    user: user.name,
    match,
  };

  //add conversation to conversations state
  const addConvo = (conversation) => {
    setConversations([...conversations, conversation]);
  };

  //renderConversation function which will display the conversation between users
  const renderConversation = (id) => {
    //find the conversation by id
    const thatConvo = conversations.filter((convo) => { convo.id === id; });
    console.log(thatConvo);
    //create div/Box/Container that displays the info
    //this container should basically be a chat box so they can continue the chat
    return (
      <Container>
        <Box padding={3}>
          <Typography>This is a conversation box</Typography>
        </Box>
      </Container>
    );
  };

  //fetch conversations from the server
  // const fetchConversations = async () => {
  //   const res = await fetch('/chats/conversations');
  //   const data = await res.json();
  //   setConversations(data);
  // };

  // useEffect(() => {
  //   fetchConversations();
  // }, []);

  //when a new message comes in, update the conversation
  const handleMessage = (newMessage) => {
    //add to the conversation.messages array
    console.log(newMessage);
  };

  const handleClick = (e) => {
    //open the selected conversation
    console.log(e.value.target);
    // renderConversation(e.target.value.id);
  };

  return (
    <Box>
      <Typography variant="h5">Conversations</Typography>
      <List>
        {conversations.map((conversation, index) => (
          <ListItem key={index} onClick={(e) => handleClick(e) }>
            <ListItemText primary={conversation.match} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Conversations;
