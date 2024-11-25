'use client';

import useIdStore from '@/store/idStore';
import { getMembers } from '@/app/(with-header-sidebar)/dashboard/[id]/edit/_lib/memberService';
import { useEffect, useState } from 'react';
import { Member } from '@/types/member';
import { useParams } from 'next/navigation';
import useDashboardStore from '@/store/dashboardStore';
import styles from './DashboardMembers.module.css';

export default function DashboardMembers() {
  // const dashboard = useDashboardStore((state) => state.dashboard);
  // const [members, setMembers] = useState<Member[]>([]);
  // const [totalPages, setTotalPages] = useState(0);

  // useEffect(() => {
  //   if (!dashboard) return;

  //   async function fetchMembers() {
  //     try {
  //       const response = await getMembers(dashboard!.id.toString());
  //       setMembers(response.members);
  //       setTotalPages(response.totalCount);
  //     } catch (error) {
  //       console.error('Error fetching members:', error);
  //     }
  //   }

  //   fetchMembers();
  //   console.log({ members });
  // }, [dashboard]);

  return (
    <>
      {/* <div>토탈</div>
      {members.map((member) => (
        <div key={member.id}>{member.nickname}</div>
      ))}
      <div></div> */}
    </>
  );
}
