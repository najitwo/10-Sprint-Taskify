import axiosInstance from '@/lib/axiosInstance';
import { GetMembersResponse } from '@/types/member';

export const getMembers = async (
  dashboardId: string,
  page: number = 1,
  pageSize: number = 4
): Promise<GetMembersResponse> => {
  try {
    const response = await axiosInstance.get(
      `members?page=${page}&size=${pageSize}&dashboardId=${dashboardId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteMember = async (memberId: number) => {
  try {
    await axiosInstance.delete(`members/${memberId}`);
  } catch (error) {
    throw error;
  }
};
