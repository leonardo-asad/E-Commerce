import API from './client';

export const getAllOrders = async () => {
  try {
    const response = await API.get('/order/mine');
    return response;
  } catch (err: any) {
    throw err;
  }
};
