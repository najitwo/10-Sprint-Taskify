export interface Invitee {
  id: number;
  email: string;
  nickname: string;
}

export interface Invitation {
  id: number;
  invitee: Invitee;
}

export interface GetInvitationsResponse {
  invitations: Invitation[];
  totalCount: number;
}
