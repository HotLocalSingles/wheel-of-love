import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, TextField, Button } from '@mui/material';
import { io } from "socket.io-client";

/*the conversations component will render a list of all the conversations.
it will allow conversations to be clicked and render the information from the chat
between users/matches as well as relevant information about each user (profile name)
If time permits, I will make the profile name's clickable.
*/
const Conversations = ({ user }) => {
  // console.log(user); //obj
  const [conversations, setConversations] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [socket, setSocket] = useState(null);

  //fetch messages from the server
  // const fetchMessages = async () => {
  //   const res = await fetch('/chats/conversations');
  //   const data = await res.json();
  //   // console.log(data); //[{ partner: selectedUser.username, messages: [{}, {}] }]
  //   setConversations(data);
  // };

  // //get the message from the database constantly
  // useEffect(() => {
  //   fetchMessages();

  // }, []);

  //start a private chat session
  useEffect(() => {
    const socket = io('http://localhost:3000', {
      query: {
        userId: user.username,
      }
    });
    setSocket(socket);
    // console.log(conversations);
  
    socket.emit('private-chat', {
      senderId: user.username,
      receiverId: 'chris',
      room: 'Chatting Again'
    });

    //listen for private-chat-message event
    socket.on('private-chat-message', (message) => {
      setConversations((prevConversations) => {
        const updatedConversations = { ...prevConversations };
        const conversation = updatedConversations[message.receiverId];
        if (conversation) {
          conversation.messages.push(message);
        } else {
          updatedConversations[message.receiverId] = {
            partner: message.receiverId,
            messages: [message]
          };
        }
        return updatedConversations;
      });
    });
    return () => {
      socket.disconnect('GoodBye');
    };

  }, [user, selectedConversation, socket]);

  // function to handle send message
  const sendMessage = () => {
    if (selectedConversation) {
      console.log(selectedConversation);
      const receiverId = selectedConversation.partner;
      const newMessage = { senderId: user.username, receiverId: selectedConversation.partner, message: message };
      // console.log(newMessage);
      socket.emit('private-chat-message', newMessage);
      //messages should render immediately
      // Update the selected conversation's messages immediately
      const updatedConversation = {
        ...selectedConversation,
        messages: [...selectedConversation.messages, newMessage]
      };

      // Update the conversations state by merging the updated conversation
      setConversations(prevConversations => ({
        ...prevConversations,
        [receiverId]: updatedConversation
      }));
      setMessage("");
    }
  };

  //when a new message comes in update the conversation
  // useEffect(() => {
  //   //on a message, 
  //   const handleMessage = (newMessage) => {
  //     if (conversations) {
  //       // console.log(newMessage);
  //       //conversations is an array of objects
  //       //iterate and find the messages array for the curren partner
  //       const updatedConversations = conversations.map(message => {
  //         message.partner === newMessage.receiverId
  //         //add message to their message array
  //           ? { ...message, messages: [...message.messages, newMessage] }
  //           : convo;
  //       });
  //       //set the current conversations to their messages
  //       setConversations(updatedConversations);
  //     }
  //     return () => {
  //       socket.off('GoodBye');
  //     };
  //   };
  // }, [conversations, socket]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  //click event should find the partner in the conversations
  //array and set the current conversation to that data/partner
  const handleClick = (partner) => {
    let selectedConvo = {};
    for (let i = 0; i < conversations.length; i++) {
      if (conversations[i].partner === partner) {
        selectedConvo = conversations[i];
        console.log(selectedConvo);
        break;
      }
    }
    setSelectedConversation(selectedConvo);
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ color: '#901403' }}>Conversations</Typography>
      <List key={ 'list' }>
        {Object.values(conversations).map((convo, index) => (
          <ListItem key={ index } onClick={() => handleClick(convo.partner) }>
            { convo.partner }
          </ListItem>
        ))}
      </List>
      {selectedConversation && (
        <Box>
          <Typography variant="h5" sx={{ color: '#be3455' }}>Conversation with { selectedConversation.partner }</Typography>
          <List>
            {selectedConversation.messages.map((message, index) => (
              <ListItem key={ index }>
                <ListItemText primary={ message.message } />
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
