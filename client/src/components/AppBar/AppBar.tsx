import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import StorefrontIcon from '@mui/icons-material/Storefront';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../store/userSlice/userSlice';
import { useDispatch } from 'react-redux';
import { logOutUser } from '../../store/userSlice/userSlice';
import { AppDispatch } from '../../store/store';
import { useNavigate } from 'react-router-dom';

import './AppBar.css';

export default function ButtonAppBar() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const handleLogout = async () => {
    await dispatch(logOutUser());
    navigate('/');
  };

  const button = (
    <>
      {
        isLoggedIn ?

        <Button
        color="inherit"
        onClick={async (event: React.MouseEvent) => {
          console.log("event")
          //event.preventDefault();
          await handleLogout();
        }}
        >
          Log Out
        </Button>

        :

        <Button
        color="inherit"
        component={Link}
        to="/auth/login"
        >
          Login
        </Button>
      }
    </>
  );

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
          {button}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
