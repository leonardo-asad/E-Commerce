import API from './client';

export const createPaymentIntent = async () => {
  try {
    const response = await API.post("cart/mine/create-payment-intent");
    return response.data;
  } catch (err: any) {
    throw err;
  }
};
