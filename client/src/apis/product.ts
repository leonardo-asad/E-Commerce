import API from './client';

export const getAllProducts = async (page: number = 1) => {
  try {
    const response = await API.get('/product', { params: { active: true, page } });
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
