import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [user, setUser] = useState(null);

  const onSuccess = async (response) => {
    try {
      // Send the response to your server for further authentication
      const serverResponse = await axios.get('http://localhost:3000/auth/login/google', {
        withCredentials: true,
        params: {
          codeResponse: response.code,
        },
      });

      // Assuming your server returns the authenticated user data
      const { user } = serverResponse.data;
      setUser(user);
    } catch (error) {
      console.log('Login Failed:', error);
    }
  };

  useEffect(() => {
    // Check if the user is already authenticated
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:3000/auth/login/success', {
          withCredentials: true,
        });
        const { user } = response.data;
        setUser(user);
      } catch (error) {
        console.log('Authentication check failed:', error);
      }
    };

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
          <p>Welcome, {user.name}!</p>
          <button onClick={handleLogout}>Logout</button>
          {/* Render your authenticated user components */}
        </div>
      ) : (
        <button onClick={onSuccess}>Login with Google</button>
      )}
    </div>
  );
};

export default App;
