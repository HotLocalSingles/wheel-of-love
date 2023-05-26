const MessageObj = (nickname, senderId, receiverId, message, room) => {
  return {
    nickname,
    senderId,
    receiverId,
    message,
    room
  };
};

export default MessageObj;


