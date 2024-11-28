import axiosInstance from '@/lib/axiosInstance';
import { COLUMN_URL } from '@/constants/urls';

export const createColumn = async (dashboardId: number, title: string) => {
  try {
    const response = await axiosInstance.post(`${COLUMN_URL}`, {
      title,
      dashboardId,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
