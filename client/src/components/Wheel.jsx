import React, { useState } from 'react';

const Wheel = ({ onUserSelected }) => {
  const [users, setUsers] = useState(['User1', 'User2', 'User3', 'User4', 'User5', 'User6', 'User7']);
  const [selectedUser, setSelectedUser] = useState(null);

  const spinWheel = () => {
    const randomIndex = Math.floor(Math.random() * users.length);
    const user = users[randomIndex];
    setSelectedUser(user);
    onUserSelected(user);
  };

  return (
    <div>
      {users.map((user) => {
        <div>{user}</div>      
      })}
      <h3>Spin the Wheel to Pick a Date</h3>
      {selectedUser ? (
        <div>
          <button onClick={spinWheel}>Spin Again</button>
        <p>Selected User: {selectedUser}</p>
        </div>
      ) : (
        <button onClick={spinWheel}>Spin</button>
      )}
    </div>
  );
};

export default Wheel;
