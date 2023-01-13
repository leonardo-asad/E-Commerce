// React imports
import React, { useEffect } from 'react';

// Import Elements and Components
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import StorefrontIcon from '@mui/icons-material/Storefront';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';

// Redux Imports
import {
  useSelector,
  useDispatch
} from 'react-redux';

// Import State selectors and Async Thunk Functions
import {
  selectIsLoggedIn,
  selectIsLoadingUser,
  logOutUser
} from '../../store/userSlice/userSlice';

import {
  selectCartProducts,
  emptyCart,
  loadCartProducts
} from '../../store/cartSlice/cartSlice';

// Import Dispatch Type
import { AppDispatch } from '../../store/store';

// Import React Router
import { useNavigate, Link } from 'react-router-dom';

// Import Style sheet
import './AppBar.css';

export default function CustomAppBar() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isLoadingUser = useSelector(selectIsLoadingUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const cartProducts = useSelector(selectCartProducts).length;

  useEffect(() => {
    // Load Cart products to show amount in badge element
    async function getCartProducts() {
      await dispatch(loadCartProducts());
    }

    if (isLoggedIn) {
      getCartProducts();
    }
  }, [dispatch, isLoggedIn]);

  const handleLogout = async () => {
    await dispatch(logOutUser());
    dispatch(emptyCart());
    navigate('/');
  };

  // App Bar buttons change depending if user is logged in or not
  const buttons = (
    <div className='menu'>
      {
        isLoggedIn ?
        <Stack
        direction={"row"}
        spacing={1}
        >
          <Button
          className='menu-item'
          component={Link}
          to="/orders/mine"
          >
            My Orders
          </Button>
          <IconButton
          aria-label="Cart"
          component={Link}
          to="/cart/mine"
          >
            <Badge badgeContent={cartProducts} color="secondary">
              <ShoppingCartIcon
              className='menu-icon'
              />
            </Badge>
          </IconButton>
          <Button
          className='menu-item'
          onClick={async (event: React.MouseEvent) => {
            await handleLogout();
          }}
          >
            Log Out
          </Button>
        </Stack>
        :
        <Button
        className="menu-item"
        component={Link}
        to="/auth/login"
        >
          Login / Sign up
        </Button>
      }
    </div>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <StorefrontIcon sx={{ mr: 1, color: "white" }} />
          <Typography
          component={Link}
          to="/"
          id='app-name'
          >
            Online Market
          </Typography>
          { !isLoadingUser && buttons}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
