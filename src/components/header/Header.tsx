'use client';

import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import Button from '../Button';
import Title from './Title';
import useDashboardStore from '@/store/dashboardStore';
import UserSection from './UserSection';
import useModalStore from '@/store/modalStore';
import InvitationModal from '@/app/(with-header-sidebar)/dashboard/[id]/edit/_components/InvitationModal';
import useInvitation from '@/app/(with-header-sidebar)/dashboard/[id]/edit/_hooks/useInvitation';
import styles from './Header.module.css';

interface HeaderProps {
  component?: React.ComponentType;
}

export default function Header({ component: Component }: HeaderProps) {
  const router = useRouter();
  const dashboard = useDashboardStore((state) => state.dashboard);

  const { openModal } = useModalStore();
  const { handleInvite } = useInvitation(dashboard?.id.toString() || null);

  const handleOpenInvitationModal = () => {
    openModal(<InvitationModal handleInvite={handleInvite} />);
  };

  const handleSettingsClick = () => {
    router.push(`/dashboard/${dashboard?.id}/edit`);
  };

  return (
    <header className={styles.header}>
      <Title pathname={usePathname()} />
      <div className={styles.buttonContainer}>
        {dashboard?.createdByMe && (
          <Button className={styles.button} onClick={handleSettingsClick}>
            <Image
              src="/icons/settings.svg"
              alt="관리"
              width={20}
              height={20}
              className={styles.icon}
            />
            관리
          </Button>
        )}
        <Button className={styles.button} onClick={handleOpenInvitationModal}>
          <Image
            src="/icons/add_box.svg"
            alt="초대하기"
            width={20}
            height={20}
            className={styles.icon}
          />
          초대하기
        </Button>
      </div>
      {Component && (
        <div>
          <Component />
        </div>
      )}
      <UserSection />
    </header>
  );
}
