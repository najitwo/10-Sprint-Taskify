import axiosInstance from '@/lib/axiosInstance';
import useToastStore from '@/store/toastStore';
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
  const addToast = useToastStore.getState().addToast;
  try {
    const response = await axiosInstance.put(`/dashboards/${id}`, {
      title,
      color,
    });
    addToast('변경되었습니다.', 'success');
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      addToast(error.message, 'error');
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
  const addToast = useToastStore.getState().addToast;
  try {
    await axiosInstance.delete(`/dashboards/${dashboardId}`);
    addToast('대시보드가 삭제되었습니다.', 'success');
  } catch (error) {
    if (error instanceof Error) {
      addToast(error.message, 'error');
    }
  }
};
