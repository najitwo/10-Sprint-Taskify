import axios from 'axios';
import { AUTH_URL } from '@/constants/urls';

export default async function handleLogin(email: string, password: string) {
  try {
    const response = await axios.post(`${AUTH_URL}/login`, { email, password });
    const { accessToken } = response.data;

    localStorage.setItem('accessToken', accessToken);
    return true;
  } catch (error) {
    console.error('로그인 실패:', error);
    return false;
  }
}
