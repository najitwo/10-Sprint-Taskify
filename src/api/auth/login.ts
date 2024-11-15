import axios from 'axios';
import { AUTH_URL } from '@/constants/urls';

export default function handleLogin(email: string, password: string) {
  return axios
    .post(`${AUTH_URL}/login`, { email, password })
    .then(function (response) {
      const { accessToken } = response.data;

      localStorage.setItem('accessToken', accessToken);

      return true;
    })
    .catch(function (error) {
      console.error('로그인 실패:', error);
      return false;
    });
}
