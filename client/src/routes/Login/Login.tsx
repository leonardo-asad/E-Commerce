import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import CustomAvatar from '../../components/Avatar/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import PrimaryButton from '../../components/Buttons/PrimaryButton';
import { Link } from 'react-router-dom';

import './Login.css'

export default function Login() {
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

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formData)
  }


  return (
    <Box
    component="form"
    sx={{
      '& .MuiTextField-root': { m: 1, width: '25ch' },
    }}
    noValidate
    autoComplete="off"
    onSubmit={handleLogin}
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
