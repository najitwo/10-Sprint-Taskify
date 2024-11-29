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

export const deleteColumn = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`${COLUMN_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateColumn = async (id: string, title: string) => {
  try {
    const response = await axiosInstance.put(`${COLUMN_URL}/${id}`, {
      title,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
