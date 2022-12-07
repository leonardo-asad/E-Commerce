import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { checkUserStatus, login, logout, signup } from "../../apis/auth";
import * as Types from '../../types/types'
import { RootState } from "../store";

interface User {
  id: number,
  username: string
}

interface UserInitialState {
  isLoadingUser: boolean,
  isLoggedIn: boolean,
  user: undefined | User,
  error: undefined | string
}

const initialState: UserInitialState = {
  isLoadingUser: true,
  isLoggedIn: false,
  user: undefined,
  error: undefined
};

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
      }
      const data = await response.data;
      return rejectWithValue(data);

    } catch (err: any) {
      throw err;
    }
  }
)

export const logOutUser = createAsyncThunk(
  '/auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await logout();
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

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(checkLoggedin.pending, (state, action) => {
        state.isLoggedIn = false;
        state.isLoadingUser = true;
      })
      .addCase(checkLoggedin.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.isLoadingUser = false;
      })
      .addCase(checkLoggedin.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.isLoadingUser = false;
        state.user = action.payload;
      })
      .addCase(loginUser.pending, (state, action) => {
        state.isLoggedIn = false;
        state.error = undefined;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.error = "Unauthorized";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.user = action.payload;
        state.error = undefined;
      })
      .addCase(logOutUser.fulfilled, (state, action) => {
        state.isLoggedIn = false;
        state.user = undefined;
      })
  }
});

export const selectIsLoggedIn = (state: RootState) => state.user.isLoggedIn;
export const selectIsLoadingUser = (state: RootState) => state.user.isLoadingUser;
export const selectUser = (state: RootState) => state.user.user;
export const selectErrorAuth = (state: RootState) => state.user.error;

export default userSlice.reducer;
