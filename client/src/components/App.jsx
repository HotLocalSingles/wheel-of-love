import { useState } from 'react';
import axios from 'axios';
import Wheel from './Wheel.jsx';
import Bar from './bar/Bar.jsx';
import Chat from './chat/Chat.jsx';

const App = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  const handleUserSelected = (user) => {
    setSelectedUser(user);
  };
  
  return (
    <div>
      <h1>Gettin' Around</h1>
      <h2>A Dating Site</h2>
      <Wheel onUserSelected={handleUserSelected} />
      {selectedUser && (
        <div>
          <h3>Chat with {selectedUser}</h3>
          {/* Render chat component here */}
          <Bar />
          <Chat />
        </div>
      )}
    </div>
  );
};

export default App;
