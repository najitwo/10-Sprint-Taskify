import axios from 'axios';
import useAuthStore from '@/store/authStore';
import { BASE_URL } from '@/constants/urls';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      throw new Error(error.response.data.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
