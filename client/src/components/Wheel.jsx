import React, { useState } from 'react';

const Wheel = ({ onUserSelected }) => {
  // State for the list of users, selected user, rotation angle
  const [users, setUsers] = useState(['User1', 'User2', 'User3', 'User4', 'User5', 'User6', 'User7']);
  const [selectedUser, setSelectedUser] = useState(null);
  const [rotationAngle, setRotationAngle] = useState(0);


  const spinWheel = () => {
    // Generate a random index to select a user from the list
    const randomIndex = Math.floor(Math.random() * users.length);
    const user = users[randomIndex];
    setSelectedUser(user);
    onUserSelected(user);

    // Calculate the rotation increment and update the rotation angle
    const rotationIncrement = 360 / users.length;
    const newRotationAngle = rotationAngle + (randomIndex * rotationIncrement);
    setRotationAngle(newRotationAngle);
  };

  return (
    
    <div style={{width: "50%", margin: "auto", textAlign: 'center'}}>
       {/* This is the actual wheel div */}
      <div style={{backgroundColor: "lightblue", borderRadius: "50%",  aspectRatio : "1 / 1", transform: `rotate(${rotationAngle}deg)`, transition: 'transform 1s',}}>
      {users.map((user) => (
        <div style={{color: "lightyellow"}}>{user}</div>      
      ))}
      </div>
      <h3>Have Fate Pick your Date</h3>
       {/* Display the spin button and the selected user */}
      {selectedUser ? (
        <div>
          <button onClick={spinWheel}>Spin Again</button>
          <p>Selected User: {selectedUser}</p>
        </div>
      ) : (
        <div>
          <button onClick={spinWheel}>Spin the Wheel</button>
        </div>
        
      )}
    </div>
  );
};

export default Wheel;
