import axiosInstance from '@/lib/axiosInstance';
import type { CreateCommentRequestBody, Comment } from '@/types/comment';

export const deleteCard = async (cardId: number) => {
  try {
    await axiosInstance.delete(`/cards/${cardId}`);
  } catch (error) {
    throw error;
  }
};

export const createComment = async (
  data: CreateCommentRequestBody
): Promise<Comment> => {
  try {
    const response = await axiosInstance.post(`/comments`, { ...data });
    return response.data;
  } catch (error) {
    throw error;
  }
};
