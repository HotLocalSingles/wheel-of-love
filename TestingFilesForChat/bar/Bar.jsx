import React, { Fragment } from 'react';
import { TextField, Button, Box, Grid, Typography, List, ListItem, SendIcon, Avatar, AppBar, Toolbar } from '@mui/material';

export default Bar = () => {
  //using Fragment to group elements without affecting
  //layout or styles
  return (
    <Fragment>
      <Box marginBottom={3}>
        <AppBar position="static">
          <Toolbar>
            <Box>
              {/* add icon here */}
            </Box>
            <Typography variant="text">
              Meet Your Match!
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </Fragment>
  );
};
