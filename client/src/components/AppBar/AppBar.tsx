import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { Link } from 'react-router-dom';

import './AppBar.css';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className="AppBar">
        <Toolbar>
          <StorefrontIcon sx={{ mr: 1 }} />
          <Typography
          className="WebsiteName"
          variant="h5"
          component={Link}
          to="/"
          >
            E-Commerce
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
