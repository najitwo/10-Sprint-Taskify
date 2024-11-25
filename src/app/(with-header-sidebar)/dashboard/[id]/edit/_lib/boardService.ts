import axiosInstance from '@/lib/axiosInstance';
import {
  UpdateDashboardRequestParams,
  CreateDashboardRequestBody,
} from '@/types/dashboards';

export const getBoard = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/dashboards/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateBoard = async (
  id: string,
  { title, color }: UpdateDashboardRequestParams
) => {
  try {
    const response = await axiosInstance.put(`/dashboards/${id}`, {
      title,
      color,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createDashboard = async ({
  title,
  color,
}: CreateDashboardRequestBody) => {
  try {
    const response = await axiosInstance.post(`/dashboards`, {
      title,
      color,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};