import axiosInstance from '@/lib/axiosInstance';
import { GetCommentsRequestParams } from '@/types/comment';

export const getComments = async ({
  cardId,
  size,
  cursorId,
}: GetCommentsRequestParams) => {
  try {
    const params = new URLSearchParams({
      cardId: cardId.toString(),
      size: size.toString(),
    });

    if (cursorId) {
      params.append('cursorId', cursorId.toString());
    }

    const response = await axiosInstance.get(`/comments?${params.toString()}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
