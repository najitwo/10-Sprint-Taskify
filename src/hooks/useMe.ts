import { useEffect } from 'react';
import useAuthStore from '@/store/authStore';
import axiosInstance from '@/lib/axiosInstance';
import Cookies from 'js-cookie';
import type { User } from '@/types/user';
import { TOKEN_KEY } from '@/constants/cookies';

const useMe = () => {
  const { user, setUser, setAccessToken } = useAuthStore();

  const getMe = async (): Promise<User> => {
    try {
      const response = await axiosInstance.get<User>('/users/me');
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    if (!user) {
      const fetchUser = async () => {
        try {
          const me = await getMe();
          setUser(me);
        } catch (error) {
          console.error('Failed to fetch user:', error);
        }
      };

      fetchUser();
    }
  }, [user]);

  const clearUser = () => {
    setUser(null);
    setAccessToken(null);
    Cookies.remove(TOKEN_KEY);
  };

  return {
    user,
    setUser,
    clearUser,
  };
};

export default useMe;
