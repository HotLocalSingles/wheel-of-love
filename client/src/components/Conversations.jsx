import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

//create a conversation template
const Conversation = ({ conversation, onClick }) => (
  <Box onClick={() => onClick(conversation.id)} style={{ cursor: 'pointer' }}>
    <Typography variant="h6">{conversation.title}</Typography>
    <Typography variant="body1">{conversation.latestMessage}</Typography>
  </Box>
);

const Conversations = ({ user, socket }) => {
  const [conversations, setConversations] = useState([]);

  //fetch conversations from the server
  const fetchConversations = async () => {
    const res = await fetch('/chats/conversations');
    const data = await res.json();
    setConversations(data);
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  //when a new message comes in, update the conversation
  useEffect(() => {
    const handleMessage = (newMessage) => {
      
    };

    if (socket) {
      socket.on('private-chat', handleMessage);
    }

    return () => {
      if (socket) {
        socket.off('GoodBye');
      }
    };
  }, [socket, conversations]);

  const handleClick = (conversation) => {
    //open the selected conversation
  };

  return (
    <Box>
      <Typography variant="h5">Conversations</Typography>
      {conversations.map((conversation) => (
        <Conversation conversation={conversation} onClick={handleClick} />
      ))}
    </Box>
  );
};

export default Conversations;
