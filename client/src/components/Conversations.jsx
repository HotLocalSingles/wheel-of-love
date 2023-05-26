import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, TextField, Button } from '@mui/material';
// import Chat from '../components/Chat.jsx';
import Conversation from '../components/ConvoObj.jsx';

/*the conversations component will render a list of all the conversations.
it will allow conversations to be clicked and render the information from the chat
between users/matches as well as relevant information about each user (profile name)
If time permits, I will make the profile name's clickable.
*/
const Conversations = ({ user, socket }) => {
  // console.log(user); //obj
  const [conversations, setConversations] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedConversation, setSelectedConversation] = useState(null);

  //fetch messages from the server
  const fetchMessages = async () => {
    const res = await fetch('/chats/conversations');
    const data = await res.json();
    console.log(data); //[{ partner: selectedUser.username, messages: [{}, {}] }]
    setConversations(data);
  };

  //start a private chat session
  useEffect(() => {
    fetchMessages();
    console.log(conversations);
    if (socket) {
      socket.emit('private-chat', {
        senderId: user.username,
        receiverId: selectedConversation.receiverId,
        room: 'Chatting Again'
      });
    }
  }, [user, selectedConversation]);

  //renderConversation function which will display the conversation between users
  const renderConversation = (match) => {
    //find the conversation by id
    const thatConvo = conversations.find(convo => convo.id === convoId);
    console.log(thatConvo);
    //create div/Box/Container that displays the info
    //this container should basically be a chat box so they can continue the chat
    return (
      <Box>
        <Typography variant="h5">Conversation with {match}</Typography>
        <List key={ 'list' }>
          {thatConvo.map(message => (
            <ListItem>
              <ListItemText primary={ message }/>
            </ListItem>
          ))}
        </List>
        <TextField
          id="outlined-multiline-static"
          label="Message"
          multiline
          rows={4}
          variant="outlined"
          onChange={ handleMessage }
          value={ message }
        />
        <Button onClick={ sendMessage }>Send</Button>
      </Box>
    );
  };

  // function to handle send message
  const sendMessage = () => {
    if (selectedConversation) {
      const newMessage = { senderId: user.username, receiverId: selectedConversation.partner, message: message };
      console.log(newMessage);
      socket.emit('private-chat-message', newMessage);
      const updatedConvo = [...selectedConversation.messages, newMessage];
      const updatedConversations = conversations.map(convo => convo.partner === selectedConversation.partner ? { ...convo, messages: updatedConvo } : convo);
      setConversations(updatedConversations);
      setMessage("");
    }
  };

  //when a new message comes in update the conversation
  useEffect(() => {
    const handleMessage = (newMessage) => {
      //add to the message on state
      console.log(newMessage);
      const updatedConversations = conversations.map(convo => convo.partner === newMessage.receiverId ? { ...convo, messages: [...convo.messages, newMessage] } : convo);
      setConversations(updatedConversations);
    };
    if (socket) {
      socket.on('private-chat-message', handleMessage);
      return () => {
        socket.off('GoodBye');
      };
    }
  }, [conversations, socket]);

  //when a new message comes in update the conversation
  const handleMessage = (newMessage) => {
    //add to the message on state
    console.log(newMessage);
    setMessage(newMessage);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleClick = (partner) => {
    console.log(partner);
    const selectedConvo = conversations.find(convo => convo.partner === partner);
    setSelectedConversation(selectedConvo);
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ color: '#901403' }}>Conversations</Typography>
      <List key={ 'list' }>
        {conversations.map((convo) => (
          <ListItem onClick={() => handleClick(convo.partner) }>
            {convo.partner}
          </ListItem>
        ))}
      </List>
      {selectedConversation && (
        <Box>
          <Typography variant="h5" sx={{ color: '#be3455' }}>Conversation with {selectedConversation.partner}</Typography>
          <List>
            {selectedConversation.messages.map(message => (
              <ListItem key={ 'list' }>
                <ListItemText primary={message.message} />
              </ListItem>
            ))}
          </List>
          <TextField
            onKeyPress={ handleKeyPress }
            id="outlined-multiline-static"
            label="Message"
            multiline
            rows={4}
            variant="outlined"
            onChange={ e => setMessage(e.target.value) }
            value={ message }
          />
          <Button onClick={ sendMessage }>Send</Button>
        </Box>
      )}
    </Box>
  );
};

export default Conversations;
