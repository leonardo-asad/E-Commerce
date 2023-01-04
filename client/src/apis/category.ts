import API from './client';

export const getCategories = async () => {
  try {
    const response = await API.get('/category');
    return response;
  } catch (err: any) {
    throw err;
  }
};
