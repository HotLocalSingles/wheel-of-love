import React from 'react';
import ReactDOM from 'react-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './components/App.jsx';
import Chat from './components/Chat.jsx';

//The client id from .env is being used here, make sure your variable name is the same as this one
//Components are from react google auth, so far the only one we've created is <App>

//<GoogleOAuthProvider> handles the flow of authentication, that's why a separate window prompting you to login to google pops up
//<React.StrictMode> gives checks and security
ReactDOM.render(
  <GoogleOAuthProvider clientId={ process.env.GOOGLE_CLIENT_ID }>
    <React.StrictMode>
      <App />
      <Chat />
    </React.StrictMode>
  </GoogleOAuthProvider>,
  document.getElementById('root')
);
