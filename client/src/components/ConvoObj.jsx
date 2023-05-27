
const Conversation = (messages = [], partner) => {
  return {
    messages,
    partner,
  };
};

export default Conversation;
