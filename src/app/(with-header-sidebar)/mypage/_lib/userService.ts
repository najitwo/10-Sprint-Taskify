import { UseFormSetError } from 'react-hook-form';
import useAuthStore from '@/store/authStore';
import { ERROR_MESSAGES } from '@/constants/message';
import { ProfileFormValues } from '../_components/ProfileForm';
import { PasswordFormValues } from '../_components/PasswordForm';
import axiosInstance from '@/lib/axiosInstance';
import useToastStore from '@/store/toastStore';

export const updateProfile = async (data: ProfileFormValues) => {
  const { image, nickname } = data;
  const setUser = useAuthStore.getState().setUser;
  const addToast = useToastStore.getState().addToast;

  let url = null;
  try {
    if (image) {
      const formData = new FormData();
      formData.append('image', image);
      const response = await axiosInstance.post('/users/me/image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      url = response.data.profileImageUrl;
    }
    const response = await axiosInstance.put('/users/me', {
      nickname,
      ...(url && { profileImageUrl: url }),
    });
    setUser(response.data);
    addToast('수정되었습니다', 'success');
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
    await axiosInstance.put('/auth/password', {
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
