import API from './client';
import * as Types from '../types/types'
import { AxiosResponse } from 'axios';

export const login = async (credentials: Types.UserCredentials) => {
  try {
    const response = await API.post('/users/login', credentials);
    return response;

  } catch (err: any) {
    throw err;
  };
};

export const logout = async () => {
  try {
    const response = await API.post('/users/logout');
    return response;

  } catch (err: any) {
    throw err;
  };
};

export const signup = async (formData: Types.UserCredentials) => {
  try {
    const response = await API.post('/users/register', formData);
    return response;

  } catch (err: any) {
    throw err;
  };
};

export const checkUserStatus: () => Promise<AxiosResponse> = async () => {
  try {
    const response = await API.get('users/checkUserStatus');
    return response;

  } catch (err: any) {
    throw err;
  };
};
