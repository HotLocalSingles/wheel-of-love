import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ChatsPage = () => {
  const navigate = useNavigate();
  navigate('/chats/conversations');

  return (
    <div>
    See Your Messages Here
    </div>
  );

};

export default ChatsPage;
