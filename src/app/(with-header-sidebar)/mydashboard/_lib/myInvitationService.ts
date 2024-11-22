import axiosInstance from '@/lib/axiosInstance';
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

export const acceptMyInvitation = async (
  invitationId: number
): Promise<Invitation> => {
  try {
    const requestBody: AcceptMyInvitationRequestBody = { inviteAccepted: true };

    const response = await axiosInstance.put(
      `/invitations/${invitationId}`,
      requestBody
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
