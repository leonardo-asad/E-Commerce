import API from './client';

export const createPaymentIntent = async (amount: number) => {
  try {
    const response = await API.post("cart/mine/create-payment-intent", { amount: amount });
    return response.data;
  } catch (err: any) {
    throw err;
  }
}
