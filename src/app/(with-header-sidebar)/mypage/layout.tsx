'use client';

import { ReactNode } from 'react';
import Image from 'next/image';
import Button from '@/components/Button';
import styles from './layout.module.css';
import { useRouter } from 'next/navigation';
import Modal from './_components/modal';

export default function Layout({ children }: { children: ReactNode }) {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

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
