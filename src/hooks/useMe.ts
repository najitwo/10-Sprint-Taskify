import { useEffect } from 'react';
import useAuthStore from '@/store/authStore';
import axiosInstance from '@/lib/axiosInstance';
import type { User } from '@/types/user';

const useMe = () => {
  const { user, setUser } = useAuthStore();

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

  return {
    user,
  };
};

export default useMe;
