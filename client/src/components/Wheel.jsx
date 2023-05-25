import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Chat from '../components/Chat.jsx';
import { Slider, Button, Box } from '@mui/material';

const Wheel = ({ user }) => {
  // State for the list of users, selected user, rotation angle
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [chatStarted, setChatStarted] = useState(false);
  const [sliderValue, setSliderValue] = useState([0, 1]);

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
      // currently checking if i can filter by ID since users dont yet have properties.
      //this could proabably be done on backend, idk if that would mess anyone up, so its here for now.
      // something like: const usersInLocation = users.filter(dater => dater.loc === selectedUser.loc);
      const usersThatArentMe = insertUsers.filter((e) => e.id !== user.id && e.location === user.location);
      // const usersInMyLoc = usersThatArentMe.filter((e) => e.location === user.location);
      setUsers(usersThatArentMe);
      //  setUsers(insertUsers);
    } catch (error) {
      console.error('Error fetching all users on client side wheel:', error);
    }
  };

  //use effect saves us from rerendering loop from fetchUsers.
  useEffect(() => {
    fetchUsers();
  }, []);

  //For MUI slider
  const handleSliderChange = (event, newValues) => {
    setSliderValue(newValues);
  };

  // const ageFilter = (min, max) => {
  //   //.filter creates shallow copy
  //   const usersInAgeRange = users.filter(
  //     (dater) => dater.age > min && dater.age < max,
  //   );
  //   setUsers(usersInAgeRange);
  // };

  const genderFilter = (min, max) => {
    // this doesnt make sense unless genders a number.
    const usersInGenderRange = users.filter(
      (dater) => dater.gender > min && dater.gender < max,
    );
    setUsers(usersInGenderRange);
  };

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
    <div
      className='wheelContainerContainer'
      style={{
        width: '50%',
        margin: 'auto',
        textAlign: 'center',
        color: 'lightpink',
      }}
    >
      <h3 style={{ marginBottom: '20px' }}>Have Fate Pick your Date</h3>

      <div style={{ display: 'flex' }}>
        <div style={{ marginRight: '20px' }}>
          <Slider 
          orientation="vertical"
          min={0}
          max={1}
          step={0.1}
          value={sliderValue}
          onChange={handleSliderChange}
           />
           
        </div>

        <div
         className="wheelContainer"
          style={{
            // Wheel Container
            backgroundColor: 'lightblue',
            position: 'relative',
            width: '100%',
            height: '100%',
            paddingBottom: '100%',
            overflow: 'hidden',
          }}
        >
          <div
            className="wheel"
            style={{
              // Actual wheel
              backgroundColor: 'lightgreen',
              borderRadius: '50%',
              position: 'absolute',
              width: '95%',
              height: '87%',
              marginLeft: '12px',
              marginTop: '12px',
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
        </div>
      </div>

      {selectedUser ? (
        <div>
          <Button variant='contained' onClick={spinWheel}>
            Spin Again
          </Button>
          <p>Selected User: {selectedUser.name}</p>
          {chatStarted && (
            <Chat initialUser={user} selectedUser={selectedUser} />
          )}
        </div>
      ) : (
        <div>
          <Button variant='contained' onClick={spinWheel}>
            Spin the Wheel
          </Button>
        </div>
      )}
    </div>
  );
};

export default Wheel;
