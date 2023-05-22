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
    <div style={{ width: '50%', margin: 'auto', textAlign: 'center' }}>
      <div
        style={{
          // Wheel Container
          backgroundColor: 'lightblue',
          position: 'relative',
          width: '100%',
          height: '0',
          paddingBottom: '100%',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            // Actual wheel
            backgroundColor: 'lightgreen',
            borderRadius: '50%',
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            transform: `rotate(${rotationAngle}deg)`,
            transition: 'transform 1s',
          }}
        >
          {users.map((user, index) => {
            // Calculate the rotation angle of each user div
            const userRotationAngle = index * (360 / users.length);

            // Calculate the translation values to move the user div up
            const radius = 200; // Adjust this value to control the distance from the center
            const translationY = -radius;

            return (
              <div
                key={index}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) rotate(${userRotationAngle}deg) translateY(${translationY}px)`,
                  transformOrigin: 'center',
                  color: 'white',
                  textShadow: 'black 0px 0px 2px',
                  fontSize: '40px',
                }}
              >
                {user}
              </div>
            );
          })}
        </div>
      </div>
      <h3>Have Fate Pick your Date</h3>
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
