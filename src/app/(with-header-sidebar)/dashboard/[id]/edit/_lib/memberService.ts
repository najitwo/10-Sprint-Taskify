import axiosInstance from '@/lib/axiosInstance';
import { GetMembersResponse } from '@/types/member';

const PAGE_SIZE = 4;

export const getMembers = async (
  dashboardId: string,
  page: number = 1
): Promise<GetMembersResponse> => {
  try {
    const response = await axiosInstance.get(
      `members?page=${page}&size=${PAGE_SIZE}&dashboardId=${dashboardId}`
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
