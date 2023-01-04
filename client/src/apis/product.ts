import API from './client';

export const getAllProducts = async (page: number = 1, category?: string) => {
  try {
    let params = category ? {active: true, page, category} : {active: true, page};
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
