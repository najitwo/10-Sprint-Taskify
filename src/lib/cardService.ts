import axiosInstance from '@/lib/axiosInstance';

export const deleteDashboard = async (cardId: number) => {
  try {
    await axiosInstance.delete(`/cards/${cardId}`);
  } catch (error) {
    throw error;
  }
};
