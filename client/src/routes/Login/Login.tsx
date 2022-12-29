import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import CustomAvatar from '../../components/Avatar/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import Error from '../../components/Messages/Error';
import Success from '../../components/Messages/Success';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { loginUser, selectErrorAuth, cleanMessages, selectSuccessMessage } from '../../store/userSlice/userSlice';
import * as Types from '../../types/types';
import { useNavigate } from 'react-router-dom';
import GoogleLoginButton from '../../components/Buttons/GoogleLogin';

import './Login.css'

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const errorAuth = useSelector(selectErrorAuth);
  const successMessage = useSelector(selectSuccessMessage);

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
            <PrimaryButton text="Login" />
            <Divider sx={{width: '100%'}}>or</Divider>
            <GoogleLoginButton />
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
      { errorAuth && <Error text={errorAuth} /> }
      { successMessage && <Success text={successMessage} /> }
    </Box>
  );
};
