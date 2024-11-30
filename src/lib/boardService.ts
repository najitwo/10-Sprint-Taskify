import axiosInstance from '@/lib/axiosInstance';
import { toast } from '@/store/toastStore';
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
    toast.success({ message: '변경되었습니다.' });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      toast.error({ message: error.message });
    }
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
    toast.success({ message: '대시보드가 삭제되었습니다.' });
  } catch (error) {
    if (error instanceof Error) {
      toast.error({ message: 'error.message' });
    }
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
