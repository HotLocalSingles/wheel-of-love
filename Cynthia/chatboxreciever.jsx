import React, { useState, useEffect } from 'react';
import { TextField, Button, Box } from '@mui/material';
import io from 'socket.io-client';
const socket = io('localhost:3000');

export default ChatBoxReceiver = () => {
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
        textAlign: 'right'
      }}>
      <TextField>
        {/* variant="text"
        // onKeyDown={ (e) => e.key === 'Enter' ? : null }
        // value={  }
        // onChange={ (e) =>  }> */}
      </TextField>
      <Button variant='text' onClick={ () => {} }>SEND</Button>
    </Box>
  );
};
