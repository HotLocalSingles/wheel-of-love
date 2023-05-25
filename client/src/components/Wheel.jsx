import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Chat from '../components/Chat.jsx';
import { FormControlLabel, Checkbox, Button } from '@mui/material';

const Wheel = ({ user }) => {
  // State for the list of users, selected user, rotation angle
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [chatStarted, setChatStarted] = useState(false);

  //useRef hook to get the positional data of user divs after the wheel spins, in order to determine who was selected.
  const userRefs = useRef([]);

  //fetches user data from backend
  const fetchUsers = async () => {
    try {
      const returnedResponse = await axios.get('/users');
      const insertUsers = returnedResponse.data;

      if (!insertUsers) {
        throw new Error(insertUsers);
      }
      console.log('Backend call for all users:', insertUsers);
      //adding filtering (by location) directly, because I want it done automagically.
      const usersInMyLoc = insertUsers.filter(x => x.id !== user.id);
      setUsers(usersInMyLoc);
    } catch (error) {
      console.error('Error fetching all users on client side wheel:', error);
    }
  };

  //use effect or nah?
  useEffect(() => {
    fetchUsers();
  }, []);


  // const filterUsers = () => {
  //   //fetchUsers() to reset?
  //   //.filter creates shallow copy
  //   // currently checking if i can filter by ID since users dont yet have properties.
  //   // something like: const usersInLocation = users.filter(user => user.loc === selectedUser.loc);
  //   const usersInMyLoc = users.filter(user => user.id === selectedUser.id);
  //   users.setUsers(usersInMyLoc);
  // }




  // This keeps the (positional) reference array and users array the same length,
  // In case a user is added or removed in the future.
  useEffect(() => {
    userRefs.current = userRefs.current.slice(0, users.length);
  }, [users.length]);

  const spinWheel = () => {
    // Calculate the rotation increment and update the rotation angle
    const rotationIncrement = 360 / users.length;
    const randomIndex = Math.floor(Math.random() * users.length);

    const targetRotationAngle = rotationIncrement * randomIndex;

    // Calculate the rotation duration (ms)
    const rotationDuration = 1000;

    // Update the rotation angle with a delay to simulate spinning
    setRotationAngle(rotationAngle + 360 * 5 + targetRotationAngle); // extra rotations

    // After the rotation duration, set the selected user and invoke the callback
    setTimeout(() => {
      // Get the y-coordinate of each user div. rect is for rectangle
      const userYCoordinates = userRefs.current.map((ref) => {
        const rect = ref.getBoundingClientRect();
        return rect.top;
      });
      // Find the index of the user div closest to the top border, thats the user we select
      const closestIndex = userYCoordinates.indexOf(
        Math.min(...userYCoordinates),
      );
      const user = users[closestIndex];

      setSelectedUser(user);

      //Cynthia addition
      const shouldChat = window.confirm(
        `Do you want to chat with ${user.name}?`,
      );
      if (shouldChat) {
        setChatStarted(true);
      }
    }, rotationDuration);
  };

  return (
    <div style={{ width: '50%', margin: 'auto', textAlign: 'center' }}>
      <h3>Have Fate Pick your Date</h3>
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

            // Calculate the translation values to move the user divs vertically.
            const radius = 200; // Adjust this value to control the distance of names from the center of wheel.
            const translationY = -radius;

            return (
              <div
                ref={(ref) => (userRefs.current[index] = ref)}
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
                {user.name}
              </div>
            );
          })}
        </div>
        <div
          style={{
            // Checkboxes container
            position: 'absolute',
            bottom: '0',
            left: '5px',
            padding: '0px',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            color: 'white',
            textShadow: 'black 0px 0px 2px',
            fontSize: '10px',
          }}
        >
          <FormControlLabel control={<Checkbox />} label='girls' />
          <FormControlLabel control={<Checkbox />} label='boys' />
        </div>
      </div>

      {selectedUser ? (
        <div>
          <Button variant="contained" onClick={spinWheel}>Spin Again</Button>
          <p>Selected User: {selectedUser.name}</p>
          {chatStarted && <Chat initialUser={user} selectedUser={selectedUser} />}
        </div>
      ) : (
        <div>
          <Button variant="contained" onClick={spinWheel}>Spin the Wheel</Button>
        </div>
      )}
    </div>
  );
};

export default Wheel;
