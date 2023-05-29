import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Routes, Navigate } from 'react-router-dom';
import { CircularProgress, Typography } from '@mui/material';
import '../../../styles/mainLoading.css';


import Navbar from './NavBar.jsx';


//Page Imports
import Home from '../pages/Home.jsx';
import Login from '../pages/Login.jsx';
import MatchPage from '../pages/MatchPage.jsx';
import NewUser from '../pages/NewUser.jsx';
import Main from '../pages/Main.jsx';
import ChatsPage from '../pages/ChatsPage.jsx';

const App = () => {

  //FAKE USER DATA FOR NOW, COMMENT THESE OUT AND UNCOMMENT THE REAL CODE BELOW WHEN NEEDED //
  // const fakeUser = {
  //   id: 1,
  //   name: "Me",
  //   username: 'myusername',
  //   gender: 'Queer',
  //   location: 'New Orleans',
  //   age: 30,
  //   vibe: 'cool',
  //   bio: 'i love turtles',
  //   picture: "data:image/jpeg;base64,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",
  // };

  // const [user, setUser] = useState(fakeUser);
  // const [isLoading, setIsLoading] = useState(false); //<-- Bypassing the login screen and loading screen
  //////////////////////////////////////////////////////////

  //The states, storing the logged in user information and if the page is loading information
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  //Redirects the user to the google login page
  const login = async function () {
    window.location.href = 'http://localhost:3000/auth/login/google';
  };


  //Getting the user that is logging in from the database by calling a GET request to our backend server
  //Then it's setting the user received as the user in the state
  //Note: This is being called in the checkAuth function
  const getUserById = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3000/users/${userId}`);
      const user = response.data;
      setUser(user);

    } catch (error) {
      console.error('Error retrieving user:', error);
    } finally {
      setIsLoading(false);
    }
  };

  //This is checking if the user has been authorized by google. Doing this by calling a GET request
  //to the server where I defined this route to send the user as res.send(user)
  //It checks every time the page is loaded, so don't worry if there's an error in the console browser upon loading the login page
  const checkAuth = async () => {
    try {
      const response = await axios.get('http://localhost:3000/auth/login/success', {
        withCredentials: true,
      });

      // console.log(response.data.id)
      const userId = response.data.id;

      if (userId) {
        await getUserById(userId);
      } else {
        setIsLoading(false);
      }

    } catch (error) {
      console.log('Authentication check failed:', error);
      setIsLoading(false);
    }
  };

  // Calling the checkAuth function every time the component mounts
  useEffect(() => {
    checkAuth();
  }, []);


  //Calling a GET request to the backend, I defined this to remove the user from the session and redirect them back to the login
  //Sets the user back to null because the page is conditionally rendering paths based on if the user state is set. Check out the
  //return divs below to see this in action
  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:3000/auth/logout', {
        withCredentials: true,
      });
      setUser(null);
    } catch (error) {
      console.log('Logout Failed:', error);
    }
  };


  //If isLoading is true, show only this div. I had to add this so that the render didn't try and render based on the user state
  //while the server requests are sending to update the state
  if (isLoading) {
    return (
      <div className="main-loading-container">
        <CircularProgress disableShrink className="main-loading-progress" color="success" />
        <Typography
          variant="subtitle1"
          component="p"
          className="main-loading-text"
          color="#c7b4a7"
        >
        Your matches are almost ready for you
        </Typography>
      </div> );
  }

  //Routes div is telling us that all the defined routes are in between it.
  //The routes are telling the client side which page to load
  //The root path '/' is checking to see if user state is not null. If null, redirect the client to the /login endpoint
  //The /login endpoint will show the user the login page
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={user ? <Main user={user} handleLogout={ handleLogout } setUser={ setUser }/> : <Navigate to="/login" />}
        />
        <Route path="/matchPage/:matchName" element={<MatchPage setUser={ setUser }/>} />
        <Route path="/login" element={ <Login login={ login }/>} />
        <Route path="/newUser" element={<NewUser user={ user } setUser={ setUser }/>} />
        <Route path="/wheel" element={ <Home user={ user } setUser={ setUser }/> } />
      </Routes>
    </div>
  );

};

// The user object looks like this:
/*
createdAt: "2023-05-23T19:16:16.000Z",
googleId: "111257409594314222098",
icebreaker: null,
id: 1,
name: "Logan",
picture: "https://lh3.googleusercontent.com/a/AGNmyxaoXKwitEWSM_q4nhGdHM1coSwDjON490cnthRx8A=s96-c",
updatedAt: "2023-05-23T19:16:16.000Z",
username: "111257409594314222098"
*/


export default App;
