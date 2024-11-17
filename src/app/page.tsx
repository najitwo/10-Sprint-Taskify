'use client';

import Link from 'next/link';
import EmailIcon from '/public/icons/email.svg';
import FacebookIcon from '/public/icons/facebook.svg';
import InstagramIcon from '/public/icons/instagram.svg';
import CustomLogo from '@/components/root/CustomLogo';
import ImageWrapper from '@/components/root/ImageWrapper';
import styles from './page.module.css';
import MainCard from '@/components/root/MainCard';
import MiniCard from '@/components/root/MiniCard';

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link href="/" aria-label="홈으로 이동">
          <CustomLogo className={styles.logo} />
        </Link>
        <nav className={styles.nav}>
          <Link href="/login" className={styles.navLink}>
            로그인
          </Link>
          <Link href="/signup" className={styles.navLink}>
            회원가입
          </Link>
        </nav>
      </header>
      <main className={styles.main}>
        <section className={styles.section}>
          <ImageWrapper
            src="/images/home.png"
            alt="일정 관리 웹 어플리케이션"
            className={styles.homeImg}
            priority={true}
          />
          <div className={styles.homeTitleWrapper}>
            <div className={styles.homeTitle}>새로운 일정관리</div>
            <div className={styles.homeBrand}>Taskify</div>
          </div>
          <Link href="/login" className={styles.homeLoginBtn}>
            로그인하기
          </Link>
        </section>
        <section className={styles.section}>
          <MainCard
            title="일의 우선순위를 관리하세요"
            subTitle="Point 1"
            src="/images/landing_lg_1.png"
            alt="우선순위 설정 기능 소개"
            className={styles.cardLg1}
          />
          <MainCard
            title="해야 할 일을 등록하세요"
            subTitle="Point 2"
            src="/images/landing_lg_2.png"
            alt="할 일 카드 생성 기능 소개"
            className={styles.cardLg2}
            imgFirst={true}
          />
        </section>
        <section>
          <div className={styles.supplementTitle}>
            생산성을 높이는 다양한 설정 ⚡
          </div>
          <div className={styles.cardSmalls}>
            <MiniCard
              src="/images/landing_sm_1.png"
              alt="대시보드 설정 기능 소개"
              title="대시보드 설정"
              desc="대시보드 사진과 이름을 변경할 수 있어요."
              className={styles.cardSm1}
            />
            <MiniCard
              src="/images/landing_sm_2.png"
              alt="초대하기 기능 소개"
              title="초대"
              desc="새로운 팀원을 초대할 수 있어요."
              className={styles.cardSm2}
            />
            <MiniCard
              src="/images/landing_sm_3.png"
              alt="구성원 기능 소개"
              title="구성원"
              desc="구성원을 초대하고 내보낼 수 있어요."
              className={styles.cardSm3}
            />
          </div>
        </section>
      </main>
      <footer className={styles.footer}>
        <div>©codeit - 2023</div>
        <div className={styles.legalLinks}>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/faq">FAQ</Link>
        </div>
        <div className={styles.socialLinks}>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="이메일 바로가기"
          >
            <EmailIcon aria-hidden="true" />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="페이스북 바로가기"
          >
            <FacebookIcon aria-hidden="true" />
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="인스타그램 바로가기"
          >
            <InstagramIcon aria-hidden="true" />
          </a>
        </div>
      </footer>
    </div>
  );
}
