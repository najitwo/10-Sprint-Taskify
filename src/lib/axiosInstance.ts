import axios from 'axios';
import useAuthStore from '@/store/authStore';
import { BASE_URL } from '@/constants/urls';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    // const accessToken = useAuthStore.getState().accessToken;
    const accessToken =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDgwNCwidGVhbUlkIjoiMTAtMSIsImlhdCI6MTczMTcyMzkwNywiaXNzIjoic3AtdGFza2lmeSJ9.k8FqEAl7DbhwxhJNAkkMq8lYrgStN-9I3xrsR0cYm2c'; // TODO: Add token
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
