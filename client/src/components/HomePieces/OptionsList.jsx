import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import Avatar from '@mui/material/Avatar';

export default function NestedList({ user, handleLogout, setEditing, setIsEditingBio }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleEdit = () => {
    setEditing(true);
    handleOpen();
  };

  const handleEditBio = () => {
    setIsEditingBio(true);
    handleOpen();
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-username"
    >
      <ListItemButton onClick={handleOpen}>
        <ListItemIcon>
          <Avatar src={ user.picture }/>
        </ListItemIcon>
        <ListItemText primary={user.username} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton onClick={ handleEdit } sx={{ pl: 4 }}>
            <ListItemIcon>
              <EditOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Edit Profile" />
          </ListItemButton>
          <ListItemButton onClick={ handleEditBio } sx={{ pl: 4 }}>
            <ListItemIcon>
              <EditOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Edit Bio" />
          </ListItemButton>
          <ListItemButton onClick={ handleLogout } sx={{ pl: 4 }}>
            <ListItemIcon>
              <LogoutOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}
