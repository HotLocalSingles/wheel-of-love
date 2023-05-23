import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';

const App = () => {
  const [user, setUser] = useState(null);

  const onSuccess = async (response) => {
    try {
      const serverResponse = await axios.get('http://localhost:3000/auth/login/google', {
        withCredentials: true,
        params: {
          codeResponse: response.code,
        },
      });

      const { user } = serverResponse.data;
      setUser(user);
    } catch (error) {
      console.log('Login Failed:', error);
    }
  };

  const login = useGoogleLogin({
    onSuccess: onSuccess,
    onError: (error) => console.log('Login Failed:', error)
  });

  useEffect(() => {
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
        <button onClick={login}>Login with Google</button>
      )}
    </div>
  );
};

export default App;
