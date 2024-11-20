'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Button from '@/components/Button';
import Modal from '@/app/(with-header-sidebar)/mypage/_components/Modal';
import styles from './layout.module.css';
import useIdStore from './_store/idStore';

export default function Layout({
  id,
  children,
}: {
  id: string;
  children: ReactNode;
}) {
  const router = useRouter();
  const handleBack = () => {
    router.push(`/dashboard/${id}`);
  };

  const setId = useIdStore.getState().setId;
  setId(id);

  return (
    <section className={styles.layout}>
      <Button className={styles.button} onClick={handleBack}>
        <Image
          src="/icons/arrow_left.svg"
          width={18}
          height={18}
          alt="돌아가기"
        />
        돌아가기
      </Button>
      {children}
      <Modal />
    </section>
  );
}
