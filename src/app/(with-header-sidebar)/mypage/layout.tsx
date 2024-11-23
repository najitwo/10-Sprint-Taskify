'use client';

import { ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Button from '@/components/Button';
import Modal from './_components/Modal';
import styles from './layout.module.css';

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
