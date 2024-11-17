'use client';

import styles from './page.module.css';
import Link from 'next/link';
import Logo from '/public/images/logo.svg';
import LogoTypo from '/public/images/logo_typo.svg';
import EmailIcon from '/public/icons/email.svg';
import FacebookIcon from '/public/icons/facebook.svg';
import InstagramIcon from '/public/icons/instagram.svg';
import ImageWrapper from '@/components/root/ImageWrapper';

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link href="/" aria-label="홈으로 이동">
          <Logo className={styles.logo} alt="로고" />
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
            <LogoTypo
              className={styles.logoTypo}
              alt="로고"
              width={327}
              height={65}
            />
          </div>

          <Link href="/login" className={styles.loginBtn}>
            로그인하기
          </Link>
        </section>
        <section className={styles.section}>
          <div className={styles.sectionCard}>
            <div className={styles.sectionContent}>
              <div className={styles.titleLandingWrapper}>
                <div className={styles.titleSub}>Point 1</div>
                <div className={styles.titleLanding}>
                  일의 <span className={styles.titleAccent}>우선순위</span>를
                  관리하세요
                </div>
              </div>
              <ImageWrapper
                src={'/images/landing1.png'}
                alt="우선순위 설정 기능"
                className={styles.img}
              />
            </div>
          </div>
          <div className={styles.sectionCard}>
            <div className={styles.sectionContent}>
              <div className={styles.titleLandingWrapper}>
                <div className={styles.titleSub}>Point 2</div>
                <div className={styles.titleLanding}>
                  해야 할 일을 등록하세요
                </div>
              </div>
              <ImageWrapper
                src={'/images/landing2.png'}
                alt="할 일 카드 생성 기능"
                className={styles.img}
              />
            </div>
          </div>
        </section>
        <section></section>
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
