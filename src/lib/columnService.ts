import axiosInstance from '@/lib/axiosInstance';

export const getColumns = async (dashboardId: number) => {
  try {
    const response = await axiosInstance.get(
      `/columns?dashboardId=${dashboardId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
