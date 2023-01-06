import API from './client';

export const getAllProducts = async (page?: number, category?: string) => {
  try {
    let params = {active: true, page, category};
    const response = await API.get('/product', { params });
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
