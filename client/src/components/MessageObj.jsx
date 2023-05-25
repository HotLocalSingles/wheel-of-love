import React from 'react';

const MessageObj = (user, message, senderUsername, receiverUsername) => {
  return {
    user,
    message,
    senderUsername,
    receiverUsername
  };
};

export default MessageObj;


