import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

export default ChatBoxSender = () => {
  return (
    <Box
      className="chatbox"
      sx={{
        display: 'flex',
        flexDirection: 'row',
        height: '600px',
        width: '400px',
        border: '1px solid #4D050E',
        borderRadius: '4px',
        padding: '10px',
        backgroundColor: '#FFF0F5',
        marginBottom: '10px',
        textAlign: 'left'
      }}>
      <input
        type="text"
        // onKeyDown={ (e) => e.key === 'Enter' ? : null }
        // value={  }
        // onChange={ (e) =>  }
      />
      <button type='submit'>SEND</button>
    </Box>
  );
};


