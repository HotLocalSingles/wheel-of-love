import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';

const App = () => {
  const [user, setUser] = useState(null);


  const login = async function () {
    window.location.href = 'http://localhost:3000/auth/login/google';
  };



  const checkAuth = async () => {
    //GRAB THE USER DATA FROM THE DATABASE USING THE RESPONSE INFO
    try {
      const response = await axios.get('http://localhost:3000/auth/login/success', {
        withCredentials: true,
      });
      // const { user } = response.data;
      console.log(response.data)
      setUser(user);
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
          <p>Welcome, {user.username}!</p>
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
