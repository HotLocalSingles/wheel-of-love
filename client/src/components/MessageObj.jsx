const MessageObj = (senderId, receiverId, message, room) => {
  return {
    senderId,
    receiverId,
    message,
    room
  };
};

export default MessageObj;


