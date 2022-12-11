import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import StorefrontIcon from '@mui/icons-material/Storefront';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Stack from '@mui/material/Stack';
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
        <Stack
        direction={"row"}
        spacing={1}
        >
          <Button
          className='menu-item'
          color="inherit"
          component={Link}
          to="/orders/mine"
          >
            My Orders
          </Button>
          <IconButton
          sx={{color: 'white'}}
          aria-label="Cart"
          component={Link}
          to="/cart/mine"
          >
            <ShoppingCartIcon
            sx={{color: "white"}}
            />
          </IconButton>
          <Button
          className='menu-item'
          color="inherit"
          onClick={async (event: React.MouseEvent) => {
            event.preventDefault();
            await handleLogout();
          }}
          >
            Log Out
          </Button>
        </Stack>
        :

        <Button
        className="menu-item"
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
      <AppBar position="static">
        <Toolbar>
          <StorefrontIcon sx={{ mr: 1, color: "white" }} />
          <Typography
          className="app-name"
          variant="h6"
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
