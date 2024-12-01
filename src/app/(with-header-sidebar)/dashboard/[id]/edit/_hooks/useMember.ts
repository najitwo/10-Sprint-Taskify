import { useCallback, useEffect, useState } from 'react';
import { getMembers, deleteMember } from '../_lib/memberService';
import useApi from './useApi';
import { GetMembersResponse, Member } from '@/types/member';
import { toast } from '@/store/toastStore';

interface MemberState {
  page: number;
  totalPages: number;
  totalCount: number;
  members: Member[];
}

const DEFAULT_MEMBERS_STATE: MemberState = {
  page: 1,
  totalPages: 0,
  totalCount: 0,
  members: [],
};

const useMember = (dashboardId: string | null, pageSize = 4) => {
  const [memberState, setMemberState] = useState<MemberState>(
    DEFAULT_MEMBERS_STATE
  );
  const {
    isLoading,
    error,
    wrappedFunction: getMembersAsync,
  } = useApi(getMembers);

  const handleLoad = useCallback(
    async (page: number) => {
      if (!dashboardId) return;
      try {
        const response: GetMembersResponse | undefined = await getMembersAsync(
          dashboardId,
          page,
          pageSize
        );

        const members = response?.members ?? [];
        const totalCount = response?.totalCount ?? 0;
        const totalPages = Math.ceil(totalCount / pageSize);

        setMemberState((prevState) => ({
          ...prevState,
          members,
          totalPages,
          totalCount,
        }));
      } catch (error) {
        throw error;
      }
    },
    [getMembersAsync, dashboardId, pageSize]
  );

  const handlePageChange = (direction: 'next' | 'prev') => {
    setMemberState((prevState) => {
      if (direction === 'next' && prevState.page < prevState.totalPages) {
        return { ...prevState, page: prevState.page + 1 };
      }
      if (direction === 'prev' && prevState.page > 1) {
        return { ...prevState, page: prevState.page - 1 };
      }
      return prevState;
    });
  };

  const handleDelete = async (memberId: number) => {
    try {
      await deleteMember(memberId);
      toast.success({ message: '삭제되었습니다' });
      handleLoad(memberState.page);
    } catch (error) {
      if (error instanceof Error) {
        toast.error({ message: error.message });
      }
    }
  };

  useEffect(() => {
    handleLoad(memberState.page);
  }, [handleLoad, memberState.page]);

  return {
    page: memberState.page,
    members: memberState.members,
    totalPages: memberState.totalPages,
    totalCount: memberState.totalCount,
    isLoading,
    error,
    handlePageChange,
    handleDelete,
  };
};

export default useMember;
