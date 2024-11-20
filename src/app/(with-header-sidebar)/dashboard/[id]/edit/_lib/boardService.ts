import axiosInstance from '@/lib/axiosInstance';
import { UpdateDashboardRequestParams } from '@/types/dashboards';
import { GetInvitationsResponse } from '@/types/invitation';

export const getBoard = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/dashboards/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getInvitations = async (
  id: string,
  page: number = 1
): Promise<GetInvitationsResponse> => {
  try {
    const response = await axiosInstance.get(
      `/dashboards/${id}/invitations?page=${page}&size=5`
    );
    return response.data;
  } catch (error) {
    console.log('야 에러났어');
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
