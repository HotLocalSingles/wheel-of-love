import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="static" style={{ backgroundColor: '#6a7ea6', marginBottom: '20px' }}>
      <Toolbar disableGutters>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
