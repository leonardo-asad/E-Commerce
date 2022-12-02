import React, { useEffect } from 'react';
import {
  Routes,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import Box from '@mui/material/Box';
import ButtonAppBar from './AppBar/AppBar';
import Home from '../routes/Home/Home';
import ProductDetails from '../routes/ProductDetails/ProductDetails';
import Login from '../routes/Login/Login';
import Signup from '../routes/SIgnup/SIgnup';
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
    <>
      <Router>
        <ButtonAppBar />
        <Box sx={{ m: 2 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:productId" element={<ProductDetails />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />
          </Routes>
        </Box>
      </Router>
    </>
  );
}

export default App;
