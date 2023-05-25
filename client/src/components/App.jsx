import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Route, Routes, Navigate } from 'react-router-dom';

//Page Imports
import Home from '../pages/Home.jsx';
import Login from '../pages/Login.jsx';
import MatchPage from '../pages/MatchPage.jsx';
import NewUser from '../pages/NewUser.jsx';

const App = () => {

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

  //Calling the checkAuth function every time the component mounts
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
    return <div>Loading...</div>;
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
          element={user ? <Home user={ user } handleLogout={ handleLogout } setUser={ setUser }/> : <Navigate to="/login" />}
        />
        <Route path="/matchPage/:matchName" element={<MatchPage />} />
        <Route path="/login" element={<Login login={ login } />} />
        <Route path="/newUser" element={<NewUser user={ user }/>} />

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
