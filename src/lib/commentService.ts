import axiosInstance from '@/lib/axiosInstance';
import type {
  CreateCommentRequestBody,
  Comment,
  GetCommentsRequestParams,
  UpdateCommentRequestBody,
} from '@/types/comment';

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

export const updateComment = async ({
  commentId,
  data,
}: {
  commentId: number;
  data: UpdateCommentRequestBody;
}): Promise<Comment> => {
  try {
    const response = await axiosInstance.put(`/comments/${commentId}`, {
      ...data,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
