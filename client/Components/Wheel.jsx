import React, { useState } from 'react';

function Wheel({ onUserSelected }) {
  const [users, setUsers] = useState(['User1', 'User2', 'User3', 'User4']);
  const [selectedUser, setSelectedUser] = useState(null);

  const spinWheel = () => {
    const randomIndex = Math.floor(Math.random() * users.length);
    const user = users[randomIndex];
    setSelectedUser(user);
    onUserSelected(user);
  };

  return (
    <div>
      <h3>Spin the Wheel to Select a User</h3>
      {selectedUser ? (
        <p>Selected User: {selectedUser}</p>
      ) : (
        <button onClick={spinWheel}>Spin</button>
      )}
    </div>
  );
}

export default Wheel;