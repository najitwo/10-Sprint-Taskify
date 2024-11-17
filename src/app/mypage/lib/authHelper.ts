import axios from './axios';
import { UseFormSetError } from 'react-hook-form';
import useAuthStore from '../store/authStore';
import { ERROR_MESSAGES } from '../constants/message';
import { ProfileFormValues } from '../components/ProfileForm';
import { PasswordFormValues } from '../components/PasswordForm';

export const updateProfile = async (data: ProfileFormValues) => {
  const { image, nickname } = data;
  const setUser = useAuthStore.getState().setUser;

  let url = null;
  try {
    if (image) {
      const formData = new FormData();
      formData.append('image', image);
      const response = await axios.post('/users/me/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      url = response.data.profileImageUrl;
    }
    const response = await axios.put('/users/me', {
      nickname,
      ...(url && { profileImageUrl: url }),
    });
    setUser(response.data);
  } catch (error) {
    if (error instanceof Error) {
    }
  }
};

export const updatePassword = async (
  data: PasswordFormValues,
  reset: () => void,
  setError: UseFormSetError<PasswordFormValues>
) => {
  try {
    await axios.put('/auth/password', {
      password: data.currentPassword,
      newPassword: data.newPassword,
    });
    reset();
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === ERROR_MESSAGES.CURRENT_PASSWORD_INCORRECT) {
        setError('currentPassword', {
          type: 'manual',
          message: error.message,
        });
      }
      if (error.message === ERROR_MESSAGES.SAME_AS_OLD_PASSWORD) {
        setError('newPassword', {
          type: 'manual',
          message: error.message,
        });
      }
    }
  }
};
