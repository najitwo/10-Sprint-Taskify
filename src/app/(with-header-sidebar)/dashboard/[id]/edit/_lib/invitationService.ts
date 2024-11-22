import axiosInstance from '@/lib/axiosInstance';
import { GetInvitationsResponse } from '@/types/invitation';

export const getInvitations = async (
  dashboardId: string,
  page: number = 1
): Promise<GetInvitationsResponse> => {
  try {
    const response = await axiosInstance.get(
      `/dashboards/${dashboardId}/invitations?page=${page}&size=5`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createInvitation = async (dashboardId: string, email: string) => {
  try {
    await axiosInstance.post(`/dashboards/${dashboardId}/invitations`, {
      email,
    });
  } catch (error) {
    throw error;
  }
};

export const deleteInvitation = async (
  dashboardId: string,
  invitationId: number
) => {
  try {
    await axiosInstance.delete(
      `/dashboards/${dashboardId}/invitations/${invitationId}`
    );
  } catch (error) {
    throw error;
  }
};
