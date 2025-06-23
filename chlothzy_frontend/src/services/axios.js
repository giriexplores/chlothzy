import axios from 'axios';
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 60000, // 1 minute timeout
  withCredentials: true
});

export default axiosInstance;
