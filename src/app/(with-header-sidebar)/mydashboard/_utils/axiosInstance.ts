import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { BASE_URL } from '@/constants/urls';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDgwNCwidGVhbUlkIjoiMTAtMSIsImlhdCI6MTczMTcyMzkwNywiaXNzIjoic3AtdGFza2lmeSJ9.k8FqEAl7DbhwxhJNAkkMq8lYrgStN-9I3xrsR0cYm2c'; // TODO: Add token
    // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NDgwNywidGVhbUlkIjoiMTAtMSIsImlhdCI6MTczMTc2OTIwNywiaXNzIjoic3AtdGFza2lmeSJ9.yhISPAxnBlD28SkCY0mUxcIM5YuwAAib2k7j15fmlvA'; // TODO: Add token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const apiCall = async <T>(
  config: AxiosRequestConfig
): Promise<AxiosResponse<T>> => {
  return axiosInstance.request<T>(config);
};

export default axiosInstance;
