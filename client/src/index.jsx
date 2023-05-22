import React from 'react';
import { createRoot } from 'react-dom/client';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './components/App.jsx';

const container = document.getElementById('root');
const root = createRoot(container); 

//The client id from .env is being used here, make sure your variable name is the same as this one
//Components are from react google auth, so far the only one we've created is <App>

//<GoogleOAuthProvider> handles the flow of authentication, that's why a separate window prompting you to login to google pops up
//<React.StrictMode> gives checks and security
root.render(
  <GoogleOAuthProvider clientId={ process.env.GOOGLE_CLIENT_ID }>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GoogleOAuthProvider>
);
