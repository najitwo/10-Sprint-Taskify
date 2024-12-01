import axiosInstance from '@/lib/axiosInstance';

export const createColumn = async (dashboardId: number, title: string) => {
  try {
    const response = await axiosInstance.post(
      `/columns?dashboardId=${dashboardId}`,
      {
        title,
        dashboardId,
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteColumn = async (id: string) => {
  try {
    const response = await axiosInstance.delete(`/columns/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateColumn = async (id: string, title: string) => {
  try {
    const response = await axiosInstance.put(`/columns/${id}`, {
      title,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
