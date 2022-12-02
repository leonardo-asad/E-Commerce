import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import CustomAvatar from '../../components/Avatar/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { loginUser } from '../../store/userSlice/userSlice';
import * as Types from '../../types/types';
import { useNavigate } from 'react-router-dom';

import './Login.css'

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    "username": "",
    "password": ""
  })


  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value
    });
  };

  const handleLogin = async (formData: Types.UserCredentials) => {
    try {
      const response = await dispatch(loginUser(formData));
      if (response.type === '/auth/login/fulfilled') {
        navigate('/')
      }
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <Box
    component="form"
    sx={{
      '& .MuiTextField-root': { m: 1, width: '25ch' },
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
          alignContent="center"
          >
            <PrimaryButton text="Login" />
          </Grid>
        </Grid>
        <Grid item xs>
          <Grid
          container
          direction="column"
          alignContent="center"
          >
            <Link to="/auth/signup" className="RouterLink">
              Don't have an account? Sign Up
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
