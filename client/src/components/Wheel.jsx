import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';


const Wheel = ({ user, socket, setIsChatting, getSelectedUser }) => {
  const thatUser = user;
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [chatStarted, setChatStarted] = useState(false);
  const [maleChecked, setMaleChecked] = useState(true);
  const [femaleChecked, setFemaleChecked] = useState(true);
  const [queerChecked, setQueerChecked] = useState(true);

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
      // currently checking if i can filter by ID since users don't yet have properties.
      //this could probably be done on backend, idk if that would mess anyone up, so its here for now.
      setUsers(insertUsers);
    } catch (error) {
      console.error('Error fetching all users on client side wheel:', error);
    }
  };

  // use effect saves us from rerendering loop from fetchUsers
  useEffect(() => {
    fetchUsers();
  }, []);

  // Use effect for filtering users and setting the initial filtered users
  
  useEffect(() => {
    genderFilter();
  }, [users, maleChecked, femaleChecked, queerChecked, selectedUser]);

  // For MUI checkboxes/ filtering
  // * So this also  filters out the self, users who don't share the self's location, and users the wheel has chosen (this session) *
  const genderFilter = () => {
    const genderFilteredUsers = users.filter((dater) => {
      const isGenderMatched =
        (maleChecked && dater.gender === 'Male') ||
        (femaleChecked && dater.gender === 'Female') ||
        (queerChecked && dater.gender === 'Queer');
      const isInUserLocation = dater.location === user.location;
      const isNotCurrentUser = dater.id !== user.id;
      const isNotSelectedUser = !selectedUsers.find(
        (selectedUser) => selectedUser.id === dater.id,
      );
      return (
        isGenderMatched &&
        isInUserLocation &&
        isNotCurrentUser &&
        isNotSelectedUser
      );
    });
    console.log(genderFilteredUsers, 'genderFilteredUsers');
    setFilteredUsers(genderFilteredUsers);
  };
 
  // This keeps the (positional) reference array and users array the same length,
  // In case a user is added or removed in the future.
  useEffect(() => {
    userRefs.current = userRefs.current.slice(0, filteredUsers.length);
  }, [filteredUsers]);

  const spinWheel = () => {
    // Calculate the rotation increment and update the rotation angle
    const rotationIncrement = 360 / filteredUsers.length;
    const randomIndex = Math.floor(Math.random() * filteredUsers.length);

    const targetRotationAngle = rotationIncrement * randomIndex;

    // Calculate the rotation duration (ms)
    const rotationDuration = 1000;

    // Update the rotation angle with a delay to simulate spinning
    setRotationAngle(prevRotationAngle => prevRotationAngle + 360 * 5 + targetRotationAngle);  // extra rotations
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

      //THE WHEEL HAS CHOSEN
      const user = filteredUsers[closestIndex];
      
      //sets the user chosen by the wheel.
      setSelectedUser(user);
      
      //adds the chosen user to array of previously chosen users, to filter them out of next spin.
      setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, user]);
      
      // update matches db with the chosen user(matched w/the logged in)
      
      // Update matches db with the chosen user (matched with the logged-in user)
      const userId = thatUser.id;
      const userId2 = user.id;
      
      axios
        .post(`/matches/${userId}`, { userId2 })
        .then((response) => {
          console.log('Match created:', response.data);
        })
        .catch((error) => {
          console.error('Failed to create a match:', error);
        });

      //Cynthia addition
      const shouldChat = window.confirm(
        `You are now connected to ${user.name}. Do you want to chat with ${user.name}? `,
      );
      if (shouldChat) {
        getSelectedUser(user);
        setIsChatting(true);
        setChatStarted(true);
        socket.emit('private-chat', {
          senderId: thatUser.username,
          receiverId: user.username,
          room: [thatUser.id, user.id].sort().join("-"),
        });
      }
    }, rotationDuration);
  };
  
  return (
<div className="neonBorder" style={{ backgroundColor: 'black' }}>

      <Typography variant='h3' sx={{
                  color: 'white',
                  border: '0.2rem #a8434c',
                  textShadow:
                    '0 0 4px #61151a, 0 0 11px #61151a, 0 0 25px #61151a',
                    fontSize: '40px',
                    paddingBottom: '20px'
                }}>Have Fate Pick your Date</Typography>


      <div
        className='wheelAndCheckboxContainer'
        style={{ display: 'flex', marginLeft: '20px', color: "black" }}
      >
        <div style={{ marginRight: '20px' }}>
          <Box
            display='flex'
            flexDirection='column'
            alignItems='flex-start'
            marginRight='20px'
          >
            <Box display='flex' alignItems='center'>
              <Checkbox
                checked={maleChecked}
                onChange={() => setMaleChecked((prevState) => !prevState)}
                color='default'
                sx={{
                  backgroundColor: 'black',
                  color: '#a8434c',
                  border: '0.1rem #a8434c',
                  boxShadow:
                    '0 0 4px #61151a, 0 0 11px #61151a, 0 0 25px #61151a',
                  '&:hover': {
                    backgroundColor: '#61151a',
                  },
                }}
              />
              <Typography variant='body1' color='white' >Male</Typography>
            </Box>
            <Box display='flex' alignItems='center'>
              <Checkbox
                checked={femaleChecked}
                onChange={() => setFemaleChecked((prevState) => !prevState)}
                label='Female'
                color='default'
                sx={{
                  backgroundColor: 'black',
                  color: '#a8434c',
                  border: '0.1rem #a8434c',
                  boxShadow:
                    '0 0 4px #61151a, 0 0 11px #61151a, 0 0 20px #61151a',
                  '&:hover': {
                    backgroundColor: '#61151a',
                  },
                }}
              />
              <Typography variant='body1' color='white'>Female</Typography>
            </Box>
            <Box display='flex' alignItems='center'>
              <Checkbox
                checked={queerChecked}
                onChange={() => setQueerChecked((prevState) => !prevState)}
                label='Queer'
                color='default'
                sx={{
                  backgroundColor: 'black',
                  color: '#a8434c',
                  border: '0.1rem  #a8434c',
                  boxShadow:
                    '0 0 4px #61151a, 0 0 11px #61151a, 0 0 20px #61151a',
                  '&:hover': {
                    backgroundColor: '#61151a',
                  },
                }}
              />
              <Typography variant='body1' color='white' >Queer</Typography>
            </Box>
          </Box>
        </div>

        <div
          className='wheelContainer'
          id='wheelContainer'
          style={{
            // Wheel Container
            backgroundColor: 'black',
            position: 'relative',
            width: '100%',
            height: '100%',
            paddingBottom: '100%',
            overflow: 'hidden',
          }}
        >
          <div
          style={{color:'white',
          textShadow: '0 0 4px #61151a, 0 0 11px #61151a, 0 0 10px #61151a',}}>↓</div>
          <div
            className='wheel'
            style={{
              // Actual wheel
              border: '0.2rem solid #a8434c',
              boxShadow: '0 0 4px #61151a, 0 0 11px #61151a, 0 0 80px #61151a',
              backgroundColor: 'black',
              borderRadius: '50%',
              position: 'absolute',
              width: '95%',
              height: '80%',
              marginLeft: '12px',
              marginTop: '12px',
              transform: `rotate(${rotationAngle}deg)`,
              transition: 'transform 1s',
            }}
          >
            {filteredUsers.map((user, index) => {
              // Calculate the rotation angle of each user div
              const userRotationAngle = index * (360 / filteredUsers.length);

              // Calculate the translation values to move the user divs vertically.

              const radius =
                document.getElementById('wheelContainer').clientWidth / 3 + 30; // Adjust this value to control the distance of names from the center of wheel.
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
                    display: 'flex',
                    alignItems: 'center',
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
          <Button
            variant='contained'
            onClick={spinWheel}
            sx={{
              backgroundColor: 'black',
              color: 'white',
              border: '0.2rem solid #a8434c',
              boxShadow: '0 0 4px #61151a, 0 0 11px #61151a, 0 0 25px #61151a',
              '&:hover': {
                backgroundColor: '#a8434c',
              },
            }}
          >
            Spin Again
          </Button>
        </div>
      ) : (
        <div>
          <Button
            variant='contained'
            onClick={spinWheel}
            sx={{
              backgroundColor: 'black',
              color: 'white',
              border: '0.2rem solid #a8434c',
              boxShadow: '0 0 4px #a8434c, 0 0 11px #a8434c, 0 0 19px #a8434c',
              '&:hover': {
                backgroundColor: '#a8434c',
              },
            }}
          >
            Spin the Wheel
            
          </Button>
        </div>
      )}
    </div>
  );
};

export default Wheel;
