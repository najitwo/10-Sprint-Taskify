import axiosInstance from '@/lib/axiosInstance';
import {
  UpdateDashboardRequestParams,
  CreateDashboardRequestBody,
  Dashboard,
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
}: CreateDashboardRequestBody): Promise<Dashboard> => {
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

export const deleteDashboard = async (dashboardId: string) => {
  try {
    await axiosInstance.delete(`/dashboards/${dashboardId}`);
  } catch (error) {
    throw error;
  }
};

export const getColumns = async (dashboardId: string) => {
  try {
    const { data: response } = await axiosInstance.get(
      `/columns?dashboardId=${dashboardId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
