// Import React
import React, { useState, useEffect } from 'react';

// Import Components
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import CustomAvatar from '../../components/Avatar/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import GoogleIcon from '@mui/icons-material/Google';
import CustomAlert from '../../components/Messages/CustomAlert';
import Divider from '@mui/material/Divider';
import CustomButton from '../../components/Buttons/CustomButton';

// React Router Imports
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

// Redux Imports
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import {
  loginUser,
  selectErrorAuth,
  cleanMessages,
  selectSuccessMessage
} from '../../store/userSlice/userSlice';

// Import Types and Style sheet
import * as Types from '../../types/types';
import './Login.css'

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const errorAuth = useSelector(selectErrorAuth);
  const successMessage = useSelector(selectSuccessMessage);
  const route = process.env.NODE_ENV === 'development' ? `http://localhost:3000/api/users/login/google` : `${process.env.REACT_APP_API_URL}/users/login/google`

  const [formData, setFormData] = useState({
    "username": "",
    "password": ""
  });

  useEffect(() => {
    dispatch(cleanMessages());
  }, [dispatch]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value
    });
  };

  const handleLogin = async (formData: Types.UserCredentials) => {
    try {
      await dispatch(loginUser(formData)).unwrap();
        return navigate('/', {
          state: {
            message: 'User Logged In Successfully'
          }
        });
    } catch (rejectedValueOrSerializedError) {
      console.log(rejectedValueOrSerializedError);
      setFormData({
        "username": "",
        "password": ""
      });
    }
  };

  return (
    <Box
    component="form"
    sx={{
      '& .MuiTextField-root': { m: 1, width: '25ch' },
      padding: 2
    }}
    noValidate
    autoComplete="off"
    onSubmit={async (event: React.FormEvent) => {
      event.preventDefault();
      await handleLogin(formData);
    }}
    >
      <Grid
      container
      direction="column"
      alignContent="center"
      alignItems="center"
      >
        <Grid item xs>
          <Grid
          container
          direction="column"
          alignContent="center"
          >
            <CustomAvatar>
              <LockOutlinedIcon />
            </CustomAvatar>
          </Grid>
        </Grid>
        <Grid item xs>
          <Typography sx={{ textAlign: "center", margin: "10px" }} variant="h5">
            Login
          </Typography>
        </Grid>
        <Grid item xs>
          <TextField
          required
          id="username"
          label="Username"
          value={formData.username}
          onChange={handleChange}
          />
        </Grid>
        <Grid item xs>
          <TextField
          required
          id="password"
          label="Password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          />
        </Grid>
        <Grid item xs>
          <Grid
          container
          direction="column"
          justifyContent={"center"}
          alignItems="center"
          >
            <CustomButton
            className="button primary-button"
            type="submit"
            variant='contained'
            >
              Login
            </CustomButton>
            <Divider sx={{width: '100%'}}>or</Divider>
            <CustomButton
            className="button primary-button"
            variant='contained'
            startIcon={<GoogleIcon />}
            href={route}
            >
              Login with Google
            </CustomButton>
          </Grid>
        </Grid>
        <Grid item xs>
          <Grid
          container
          direction="column"
          alignContent="center"
          >
            <Link to="/auth/signup" className="link">
              Don't have an account? Sign Up
            </Link>
          </Grid>
        </Grid>
      </Grid>
      { errorAuth && <CustomAlert severity='error'>{errorAuth}</CustomAlert> }
      { successMessage && <CustomAlert severity='success'>{successMessage}</CustomAlert> }
    </Box>
  );
};
