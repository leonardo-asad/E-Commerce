import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { checkUserStatus, login, logout, signup } from "../../apis/auth";
import * as Types from '../../types/types'
import { RootState } from "../store";
import { isAxiosError } from 'axios';

export interface InitialState {
  isLoadingUser: boolean,
  isLoggedIn: boolean,
  user: undefined | Types.User,
  error: undefined | string,
  successMessage: undefined | string
};

const initialState: InitialState = {
  isLoadingUser: true,
  isLoggedIn: false,
  user: undefined,
  error: undefined,
  successMessage: undefined
};

export const checkLoggedin = createAsyncThunk(
  '/auth/checkUserStatus',
  async () => {
    try {
      const response = await checkUserStatus();

      if (response.status === 200) {
        const data = await response.data;
        return data;
      }

    } catch (err) {
      throw err;
    }
  }
);

export const loginUser = createAsyncThunk<
  Types.User,
  Types.UserCredentials,
  {
    rejectValue: string
  }
  >(
  '/auth/login',
  async (credentials: Types.UserCredentials, { rejectWithValue }) => {
    try {
      const response = await login(credentials);

      if (response.status === 200) {
        const data = await response.data;
        return data;
      }

    } catch (err) {
      if (isAxiosError(err)) {
        return rejectWithValue(err.response?.data);
      } else {
        throw err;
      }
    }
  }
);

export const logOutUser = createAsyncThunk(
  '/auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await logout();

      if (response.status === 200) {
        const data = await response.data;
        return data;
      }
      const data = await response.data;
      rejectWithValue(data);

    } catch (err) {
      throw err;
    }
  }
);

export const registerUser = createAsyncThunk<
  Types.User,
  Types.UserCredentials,
  {
    rejectValue: string
  }
  >(
  '/auth/register',
  async (newUserForm: Types.UserCredentials, { rejectWithValue }) => {
    try {
      const response = await signup(newUserForm);

      if (response.status === 201) {
        const data = await response.data;
        return data;
      }

    } catch (err) {
      if (isAxiosError(err)) {
        return rejectWithValue(err.response?.data);
      }
      throw err;
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    cleanMessages(state) {
      state.error = undefined;
      state.successMessage = undefined;
    }
  },
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
        state.error = action.payload;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.error = undefined;
        state.user = action.payload;
      })
      .addCase(registerUser.pending, (state, action) => {
        state.isLoggedIn = false;
        state.error = undefined;
        state.successMessage = undefined;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.error = action.payload;
        state.successMessage = undefined;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoggedIn = true;
        state.error = undefined;
        state.successMessage = "User registered Successfully";
        state.user = action.payload;
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
export const selectSuccessMessage = (state: RootState) => state.user.successMessage;

export const { cleanMessages } = userSlice.actions;
export default userSlice.reducer;
