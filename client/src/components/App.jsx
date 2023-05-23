import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Home from '../pages/Home.jsx';
import Login from '../pages/Login.jsx';

import { Route, Routes, Navigate } from 'react-router-dom';


const App = () => {

  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

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
    } finally {
      setIsLoading(false);
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
      setIsLoading(false);
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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={user ? <Home user={ user } handleLogout={ handleLogout }/> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login login={login} />} />
      </Routes>
    </div>
  );

};




export default App;
