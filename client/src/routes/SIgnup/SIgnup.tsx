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
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  registerUser,
  selectErrorAuth,
  cleanMessages,
  selectSuccessMessage
} from '../../store/userSlice/userSlice';
import * as Types from '../../types/types'
import { AppDispatch } from '../../store/store';

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
      return navigate('/');

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
            <PrimaryButton text="Sign Up"/>
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
      { errorAuth && <Error text={errorAuth} /> }
      { successMessage && <Success text={successMessage} /> }
    </Box>
  );
};
