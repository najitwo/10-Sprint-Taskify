import axiosInstance from '@/lib/axiosInstance';
import { toast } from '@/store/toastStore';
import {
  GetMyInvitationsRequestParam,
  GetMyInvitationsResponse,
  Invitation,
  AcceptMyInvitationRequestBody,
} from '@/types/invitation';

export const getMyInvitations = async ({
  size,
  cursorId,
  title,
}: GetMyInvitationsRequestParam): Promise<GetMyInvitationsResponse> => {
  try {
    const params = new URLSearchParams({ size: size.toString() });

    if (cursorId) {
      params.append('cursorId', cursorId.toString());
    }

    if (title) {
      params.append('title', title);
    }

    const response = await axiosInstance.get(
      `/invitations?${params.toString()}`
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateMyInvitation = async ({
  invitationId,
  requestBody,
}: {
  invitationId: number;
  requestBody: AcceptMyInvitationRequestBody;
}): Promise<Invitation> => {
  try {
    const response = await axiosInstance.put(
      `/invitations/${invitationId}`,
      requestBody
    );

    toast.success({
      message: `${requestBody.inviteAccepted ? '수락' : '거절'} 완료!`,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
