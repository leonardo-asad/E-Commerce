import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { checkUserStatus, login, signup } from "../../apis/auth";
import * as Types from '../../types/types'
import { RootState } from "../store";

export const checkLoggedin = createAsyncThunk(
  '/auth/checkUserStatus',
  async (param, { rejectWithValue }) => {
    try {
      const response = await checkUserStatus();

      if (response.status === 200) {
        const data = await response.data;
        return data;
      } else {
        const data = await response.data;
        rejectWithValue(data);
      }
    } catch (err: any) {
      throw err;
    }
  }
)

export const loginUser = createAsyncThunk(
  '/auth/login',
  async (credentials: Types.UserCredentials, { rejectWithValue }) => {
    try {
      const response = await login(credentials)
      if (response.status === 200) {
        const data = await response.data;
        return data;
      } else {
        const data = await response.data;
        rejectWithValue(data);
      }
    } catch (err: any) {
      throw err;
    }
  }
)

export const registerUser = createAsyncThunk(
  '/auth/register',
  async (newUserForm: Types.NewUserForm, { rejectWithValue }) => {
    try {
      const response = await signup(newUserForm)
      if (response.status === 201) {
        const data = await response.data;
        return data;
      } else {
        const data = await response.data;
        rejectWithValue(data);
      }
    } catch (err: any) {
      throw err;
    }
  }
)

const initialState = {
  isLoggedIn: false,
  user: {},
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(checkLoggedin.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
      })
  }
})

export const selectIsLoggedIn = (state: RootState) => state.user.isLoggedIn;
export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;
