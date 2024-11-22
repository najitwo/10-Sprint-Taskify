export interface Invitee {
  id: number;
  email: string;
  nickname: string;
}

export interface Inviter {
  id: number;
  email: string;
  nickname: string;
}

export interface Dashboard {
  id: number;
  title: string;
}

export interface Invitation {
  id: number;
  inviter: Inviter;
  invitee: Invitee;
  dashboard: Dashboard;
  inviteAccepted: boolean | null;
}

export interface GetInvitationsResponse {
  invitations: Invitation[];
  totalCount: number;
}

export interface GetMyInvitationsRequestParam {
  size: number;
  cursorId?: number;
  title?: string;
}

export interface GetMyInvitationsResponse {
  invitations: Invitation[];
  cursorId: number | null;
}

export interface AcceptMyInvitationRequestBody {
  inviteAccepted: boolean;
}
