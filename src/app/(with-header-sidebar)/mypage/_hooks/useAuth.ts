import useAuthStore from '@/store/authStore';
import axiosInstance from '@/lib/axiosInstance';

const useAuth = () => {
  const { user, accessToken, setUser, setAccessToken } = useAuthStore();
  const isAuthenticated = !!accessToken;

  const getMe = async () => {
    try {
      const response = await axiosInstance.get('/users/me');
      setUser(response.data);
    } catch (error) {
      throw error;
    }
  };

  const login = async () => {
    try {
      const response = await axiosInstance.post('/auth/login', {
        email: 'bono@example.com',
        password: '12341234',
      });
      setAccessToken(response.data.accessToken);
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    setAccessToken(null);
  };

  return {
    user,
    accessToken,
    isAuthenticated,
    getMe,
    login,
    logout,
  };
};

export default useAuth;
