import axiosInstance from '@/lib/axiosInstance';
import { GetInvitationsResponse } from '@/types/invitation';

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
    throw error;
  }
};
