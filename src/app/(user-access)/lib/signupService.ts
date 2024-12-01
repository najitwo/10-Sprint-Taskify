import axios from 'axios';
import { AUTH_URL } from '@/constants/urls';

interface SignupData {
  email: string;
  password: string;
  nickname: string;
}

export default async function handleSignup({
  email,
  password,
  nickname,
}: SignupData) {
  return await axios.post(`${AUTH_URL}/users`, { email, password, nickname });
}
