import React, { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText, TextField, Button } from '@mui/material';

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
  const [messages, setMessages] = useState([]);

  //fetch messages from the server
  const fetchMessages = async () => {
    const res = await fetch('/chats/conversations');
    const data = await res.json();
    // console.log(data); //[{ partner: selectedUser.username, messages: [{}, {}] }]
    setConversations(data);
  };

  //get the message from the database constantly
  useEffect(() => {
    fetchMessages();
  }, []);

  //start a private chat session
  useEffect(() => {
    if (socket) {
      socket.on('private-chat-message', (newMessage) => {
        setConversations((prevConversations) => {
          const updatedConversations = prevConversations.map(conversation => {
            if (conversation.partner === newMessage.receiverId) {
              return { ...conversation, messages: [...conversation.messages, newMessage] };
            }
            return conversation;
          });

          if (selectedConversation && selectedConversation.partner === newMessage.receiverId) {
            setMessages(prevMessages => [...prevMessages, newMessage]);
          }

          return updatedConversations;
        });
      });

      return () => {
        socket.disconnect('GoodBye');
      };
    }
  }, [socket, selectedConversation]);

  // function to handle send message
  const sendMessage = () => {
    if (selectedConversation) {
      // console.log(selectedConversation);
      const newMessage = {
        senderId: user.username,
        receiverId: selectedConversation.partner,
        message: message
      };
      // console.log(newMessage);
      socket.emit('private-chat-message', newMessage);
      //messages should render immediately
      // Update the selected conversation's messages immediately
      const updatedConversations = conversations.map(conversation => {
        if (conversation.partner === selectedConversation.partner) {
          return { ...conversation, messages: [...conversation.messages, newMessage] };
        }
        return conversation;
      });

      setConversations(updatedConversations);

      //update the messages state
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  //when a new message comes in update the conversation
  // useEffect(() => {
  //   const handleMessage = (newMessage) => {
  //     if (conversations) {
  //       // console.log(newMessage);
  //       //conversations is an array of objects
  //       //iterate and find the messages array for the current partner
  //       const updatedConversations = conversations.map(message => {
  //         message.partner === newMessage.receiverId
  //         //add message to their message array
  //           ? { ...message, messages: [...message.messages, newMessage] }
  //           : convo;
  //       });
  //       //set the current conversations to their messages
  //       setConversations(updatedConversations);
  //     }
  //     if (socket) {
  //       socket.on('private-chat-message', handleMessage);
  //       return () => {
  //         socket.off('GoodBye');
  //       };
  //     }
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
    //emit a private chat
    //set up private chat between users
    socket.emit('private-chat', {
      senderId: user.username,
      receiverId: partner,
      room: 'Chatting Again'
    });
    let selectedConvo = {};
    for (let i = 0; i < conversations.length; i++) {
      if (conversations[i].partner === partner) {
        selectedConvo = conversations[i];
        break;
      }
    }
    setSelectedConversation(selectedConvo);
    setMessages(selectedConvo.messages);
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
            {messages.map((message, index) => (
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
