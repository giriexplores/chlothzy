import axiosInstance from './axios';

export const getCart = async () => {
  const response = await axiosInstance.get(`/cart/`);
  return response.data;
};

export const addToCart = async (productId, quantity, size) => {
  const response = await axiosInstance.post(`/cart/`, {
    productId,
    quantity,
    size,
  });
  return response.data;
};

export const removeFromCart = async (productId) => {
  const response = await axiosInstance.delete(`/cart/${productId}`);
  return response.data;
};
