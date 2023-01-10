import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  HashRouter
} from "react-router-dom";
import Box from '@mui/material/Box';
import CustomAppBar from './AppBar/AppBar';
import Home from '../routes/Home/Home';
import ProductDetails from '../routes/ProductDetails/ProductDetails';
import Login from '../routes/Login/Login';
import Signup from '../routes/SIgnup/SIgnup';
import ProtectedLayout from '../layouts/ProtectedLayout';
import Cart from '../routes/Cart/Cart';
import Orders from '../routes/Orders/Orders';
import Checkout from '../routes/Checkout/Checkout';
import { useDispatch } from 'react-redux';
import { checkLoggedin } from '../store/userSlice/userSlice';
import { AppDispatch } from '../store/store';

import './App.css';

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    async function checkUserStatus() {
      await dispatch(checkLoggedin());
    }

    checkUserStatus();
  }, [dispatch])

  return (
      <HashRouter>
        <CustomAppBar />
        <Box>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />

            <Route element={<ProtectedLayout />}>
              <Route path="/cart/mine" element={<Cart />} />
              <Route path="/cart/mine/checkout" element={<Checkout />} />
              <Route path="/orders/mine" element={<Orders />} />
            </Route>
          </Routes>
        </Box>
      </HashRouter>
  );
}

export default App;
