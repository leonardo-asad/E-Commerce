import API from './client';

export const getAllProducts = async () => {
  try {
    const response = await API.get('/product', { params: { active: true } });
    return response;
  } catch (err: any) {
    throw err;
  }
};

export const getProductById = async (id: number) => {
  try {
    const response = await API.get(`/product/${id}`);
    return response;
  } catch (err: any) {
    throw err;
  }
};
