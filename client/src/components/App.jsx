import React, { useEffect, useState } from 'react';
import axios from 'axios';

import UserProfile from './UserProfile.jsx';

const App = () => {

  const [user, setUser] = useState(null);

  const login = async function () {
    window.location.href = 'http://localhost:3000/auth/login/google';
  };

  const getUserById = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3000/users/${userId}`);

      const user = response.data;
      setUser(user);
      

    } catch (error) {
      console.error('Error retrieving user:', error);
    }
  };


  const checkAuth = async () => {
    //GRAB THE USER DATA FROM THE DATABASE USING THE RESPONSE INFO
    try {
      const response = await axios.get('http://localhost:3000/auth/login/success', {
        withCredentials: true,
      });
      console.log(response.data.id)
      const userId = response.data.id;

      getUserById(userId);
    } catch (error) {
      console.log('Authentication check failed:', error);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);


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

  return (
    <div>
      {user ? (
        <div>
          <UserProfile user={ user } />
          <button onClick={handleLogout}>Logout</button>
          {/* Render your authenticated user components */}
        </div>
      ) : (
        <button onClick={login}>Login with Google</button>
      )}
    </div>
  );
};

export default App;
