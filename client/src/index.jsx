import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App.jsx';

import { BrowserRouter } from 'react-router-dom';

const container = document.getElementById('root');
const root = createRoot(container);

//Wrapping App in these divs so that it has security and is known as the router for the client side's react router

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
