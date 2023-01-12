// Import React
import React, { useState, useEffect } from 'react';

// Import Components
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import CustomAvatar from '../../components/Avatar/Avatar';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import CustomButton from '../../components/Buttons/CustomButton';
import CustomAlert from '../../components/Messages/CustomAlert';

// React Router imports
import { Link, useNavigate } from 'react-router-dom';

// Redux Imports
import { useDispatch, useSelector } from 'react-redux';
import {
  registerUser,
  selectErrorAuth,
  cleanMessages,
  selectSuccessMessage
} from '../../store/userSlice/userSlice';
import { AppDispatch } from '../../store/store';

// Import Types
import * as Types from '../../types/types'

export default function Signup() {
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

  const handleSignUp = async (formData: Types.UserCredentials) => {
    try {
      await dispatch(registerUser(formData)).unwrap();
      return navigate('/', {
        state: {
          message: 'User Registered Successfully'
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
      await handleSignUp(formData);
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
            Sign Up
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
            <CustomButton
            className="primary-button"
            variant='contained'
            type="submit"
            >
              Sign Up
            </CustomButton>
          </Grid>
        </Grid>
        <Grid item xs>
          <Grid
          container
          direction="column"
          alignContent="center"
          >
            <Link to="/auth/login" className="link">
              Do you have an account? Log In
            </Link>
          </Grid>
        </Grid>
      </Grid>
      { errorAuth && <CustomAlert severity='error'>{errorAuth}</CustomAlert> }
      { successMessage && <CustomAlert severity='success'>{successMessage}</CustomAlert> }
    </Box>
  );
};
