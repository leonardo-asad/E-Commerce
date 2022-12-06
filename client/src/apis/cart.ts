import API from './client';
import * as Types from '../types/types';

export const getCartProducts = async () => {
  try {
    const response = await API.get('/cart/mine');
    return response;
  } catch (err: any) {
    throw err.response.data;
  }
};

export const addCartItem = async (requestBody: Types.RequestBodyAddToCart) => {
  try {
    const response = await API.post('/cart/mine', requestBody);
    return response;
  } catch (err: any) {
    throw err.response.data;
  }
};

export const updateCartItem = async (itemId: number, requestBody: Types.RequestBodyUpdateCartItem) => {
  try {
    const response = await API.put(`/cart/mine/${itemId}`, requestBody);
    return response;
  } catch (err: any) {
    throw err.response.data;
  }
};

export const deleteCartItem = async (itemId: number) => {
  try {
    const response = await API.delete(`/cart/mine/${itemId}`);
    return response;
  } catch (err: any) {
    throw err.response.data;
  }
};

export const checkout = async () => {
  try {
    const response = await API.post('/cart/mine/checkout');
    return response;
  } catch (err: any) {
    throw err.response.data;
  }
};
