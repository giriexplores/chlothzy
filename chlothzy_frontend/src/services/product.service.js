import axiosInstance from './axios';

export const getAllProducts = async () => {
  const response = await axiosInstance.get('/products');
  return response.data;
};

export const getProductById = async (productId) => {
  const response = await axiosInstance.get(`/products/${productId}`);
  return response.data;
};