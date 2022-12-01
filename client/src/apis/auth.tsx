import API from './client';
import * as Types from '../types/types'

// API interface for logging a user in
export const login = async (credentials: Types.userCredentials) => {
  try {
    const response = await API.post('/login', credentials);

    return response.data;

  } catch (err: any) {
    throw err.response.data;
  }
}
