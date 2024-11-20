import { useCallback, useEffect, useState } from 'react';
import { getInvitations } from '../_lib/invitationService';
import useApi from './useApi';
import { GetInvitationsResponse, Invitation } from '@/types/invitation';

export interface InvitationState {
  page: number;
  totalPages: number;
  invitations: Invitation[];
}

const DEFAULT_INVITATION_STATE: InvitationState = {
  page: 1,
  totalPages: 0,
  invitations: [],
};

const useInvitation = (id: string, pageSize = 5) => {
  const [invitationState, setInvitationState] = useState<InvitationState>(
    DEFAULT_INVITATION_STATE
  );
  const [isLoading, error, getInvitationsAsync] = useApi(getInvitations);

  const handleLoad = useCallback(
    async (page: number) => {
      if (!id) return;
      try {
        const response: GetInvitationsResponse | undefined =
          await getInvitationsAsync(id, page);

        const invitations = response?.invitations ?? [];
        const totalCount = response?.totalCount ?? 0;
        const totalPages = Math.ceil(totalCount / pageSize);

        setInvitationState((prevState) => ({
          ...prevState,
          invitations,
          totalPages,
        }));
      } catch (error) {
        throw error;
      }
    },
    [getInvitationsAsync, id, pageSize]
  );

  const handlePageChange = (direction: 'next' | 'prev') => {
    setInvitationState((prevState) => {
      if (direction === 'next' && prevState.page < prevState.totalPages) {
        return { ...prevState, page: prevState.page + 1 };
      }
      if (direction === 'prev' && prevState.page > 1) {
        return { ...prevState, page: prevState.page - 1 };
      }
      return prevState;
    });
  };

  useEffect(() => {
    handleLoad(invitationState.page);
  }, [handleLoad, invitationState.page]);

  return {
    page: invitationState.page,
    invitations: invitationState.invitations,
    totalPages: invitationState.totalPages,
    isLoading,
    error,
    handlePageChange,
  };
};

export default useInvitation;
